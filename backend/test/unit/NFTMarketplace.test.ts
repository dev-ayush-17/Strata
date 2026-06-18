import { expect } from "chai"
import { network } from "hardhat"

const connection = await network.getOrCreate()
const { ethers } = connection

describe("NFTMarketplace", function () {
    let marketplace: any
    let nft: any
    let seller: any
    let buyer: any

    let marketplaceAddress: string
    let nftAddress: string

    const TOKEN_ID = 0
    const PRICE = ethers.parseEther("1")
    const TOKEN_URI = "ipfs://QmTestUri"

    beforeEach(async function () {
        const marketplaceFactory =
            await ethers.getContractFactory(
                "NFTMarketplace"
            )

        const nftFactory =
            await ethers.getContractFactory(
                "NFT"
            )

        marketplace =
            await marketplaceFactory.deploy()

        nft =
            await nftFactory.deploy()

        await marketplace.waitForDeployment()
        await nft.waitForDeployment()

        marketplaceAddress =
            await marketplace.getAddress()

        nftAddress =
            await nft.getAddress()

        ;[seller, buyer] =
            await ethers.getSigners()
    })

    async function mintAndApprove() {
        await nft.mintNft(
            TOKEN_URI
        )

        await nft.approve(
            marketplaceAddress,
            TOKEN_ID
        )
    }

    async function mintApproveAndList(
        price: bigint = PRICE
    ) {
        await mintAndApprove()

        await marketplace.listItem(
            nftAddress,
            TOKEN_ID,
            price
        )
    }

    describe("listItem", function () {
        it("Reverts if price is zero", async function () {
            await mintAndApprove()

            await expect(
                marketplace.listItem(
                    nftAddress,
                    TOKEN_ID,
                    0
                )
            ).to.be.revertedWithCustomError(
                marketplace,
                "PriceMustBeAboveZero"
            )
        })

        it("Reverts if not Owner", async function () {
            await mintAndApprove()

            await expect(
                marketplace
                    .connect(buyer)
                    .listItem(
                        nftAddress,
                        TOKEN_ID,
                        PRICE
                    )
            ).to.be.revertedWithCustomError(
                marketplace,
                "NotOwner"
            )
        })

        it(
            "Reverts if NFT is not approved for marketplace",
            async function () {
                await nft.mintNft(TOKEN_URI)

                await expect(
                    marketplace.listItem(
                        nftAddress,
                        TOKEN_ID,
                        PRICE
                    )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "NotApprovedForMarketplace"
                )
            }
        )

        it(
            "Reverts if item is already listed",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace.listItem(
                        nftAddress,
                        TOKEN_ID,
                        PRICE
                    )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "AlreadyListed"
                )
            }
        )

        it(
            "Lists NFT and stores listing information",
            async function () {
                await mintAndApprove()

                await expect(
                    marketplace.listItem(
                        nftAddress,
                        TOKEN_ID,
                        PRICE
                    )
                )
                    .to.emit(
                        marketplace,
                        "ItemListed"
                    )
                    .withArgs(
                        await seller.getAddress(),
                        nftAddress,
                        TOKEN_ID,
                        PRICE
                    )

                const listing =
                    await marketplace.getListing(
                        nftAddress,
                        TOKEN_ID
                    )

                expect(listing.price)
                    .to.equal(PRICE)

                expect(listing.seller)
                    .to.equal(
                        await seller.getAddress()
                    )
            }
        )
    })

    describe("buyItem", function () {
        it(
            "Reverts if item is not listed",
            async function () {
                await nft.mintNft(TOKEN_URI)

                await expect(
                    marketplace
                        .connect(buyer)
                        .buyItem(
                            nftAddress,
                            TOKEN_ID,
                            {
                                value: PRICE,
                            }
                        )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "ItemNotListed"
                )
            }
        )

        it(
            "Reverts if price is not met",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace
                        .connect(buyer)
                        .buyItem(
                            nftAddress,
                            TOKEN_ID,
                            {
                                value: ethers.parseEther(
                                    "0.5"
                                ),
                            }
                        )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "PriceNotMet"
                )
            }
        )

        it(
            "Transfers ownership and credits proceeds",
            async function () {
                await mintApproveAndList()

                await marketplace
                    .connect(buyer)
                    .buyItem(
                        nftAddress,
                        TOKEN_ID,
                        {
                            value: PRICE,
                        }
                    )

                expect(
                    await nft.ownerOf(
                        TOKEN_ID
                    )
                ).to.equal(
                    await buyer.getAddress()
                )

                expect(
                    await marketplace.getProceeds(
                        await seller.getAddress()
                    )
                ).to.equal(PRICE)
            }
        )

        it(
            "Emits ItemBought event",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace
                        .connect(buyer)
                        .buyItem(
                            nftAddress,
                            TOKEN_ID,
                            {
                                value: PRICE,
                            }
                        )
                )
                    .to.emit(
                        marketplace,
                        "ItemBought"
                    )
                    .withArgs(
                        await buyer.getAddress(),
                        nftAddress,
                        TOKEN_ID,
                        PRICE
                    )
            }
        )

        it(
            "Deletes listing after purchase",
            async function () {
                await mintApproveAndList()

                await marketplace
                    .connect(buyer)
                    .buyItem(
                        nftAddress,
                        TOKEN_ID,
                        {
                            value: PRICE,
                        }
                    )

                const listing =
                    await marketplace.getListing(
                        nftAddress,
                        TOKEN_ID
                    )

                expect(listing.price)
                    .to.equal(0)

                expect(listing.seller)
                    .to.equal(
                        ethers.ZeroAddress
                    )
            }
        )
    })

    describe("withdrawProceeds", function () {
        it(
            "Reverts if there are no proceeds",
            async function () {
                await expect(
                    marketplace.withdrawProceeds()
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "NoProceeds"
                )
            }
        )

        it(
            "Withdraws proceeds successfully",
            async function () {
                await mintApproveAndList()

                await marketplace
                    .connect(buyer)
                    .buyItem(
                        nftAddress,
                        TOKEN_ID,
                        {
                            value: PRICE,
                        }
                    )

                expect(
                    await marketplace.getProceeds(
                        await seller.getAddress()
                    )
                ).to.equal(PRICE)

                await marketplace.withdrawProceeds()

                expect(
                    await marketplace.getProceeds(
                        await seller.getAddress()
                    )
                ).to.equal(0)
            }
        )
    })

    describe("cancelListing", function () {
        it(
            "Reverts if NFT is not listed",
            async function () {
                await nft.mintNft(
                    TOKEN_URI
                )

                await expect(
                    marketplace.cancelListing(
                        nftAddress,
                        TOKEN_ID
                    )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "ItemNotListed"
                )
            }
        )

        it(
            "Reverts if caller is not owner",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace
                        .connect(buyer)
                        .cancelListing(
                            nftAddress,
                            TOKEN_ID
                        )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "NotOwner"
                )
            }
        )

        it(
            "Cancels listing successfully",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace.cancelListing(
                        nftAddress,
                        TOKEN_ID
                    )
                )
                    .to.emit(
                        marketplace,
                        "ItemCancelled"
                    )
                    .withArgs(
                        await seller.getAddress(),
                        nftAddress,
                        TOKEN_ID
                    )

                const listing =
                    await marketplace.getListing(
                        nftAddress,
                        TOKEN_ID
                    )

                expect(listing.price)
                    .to.equal(0)

                expect(listing.seller)
                    .to.equal(
                        ethers.ZeroAddress
                    )
            }
        )
    })

    describe("updateListing", function () {
        it(
            "Reverts if new price is zero",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace.updateListing(
                        nftAddress,
                        TOKEN_ID,
                        0
                    )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "PriceMustBeAboveZero"
                )
            }
        )

        it(
            "Reverts if caller is not owner",
            async function () {
                await mintApproveAndList()

                await expect(
                    marketplace
                        .connect(buyer)
                        .updateListing(
                            nftAddress,
                            TOKEN_ID,
                            ethers.parseEther("2")
                        )
                ).to.be.revertedWithCustomError(
                    marketplace,
                    "NotOwner"
                )
            }
        )

        it(
            "Updates listing price successfully",
            async function () {
                const newPrice =
                    ethers.parseEther("2")

                await mintApproveAndList()

                await expect(
                    marketplace.updateListing(
                        nftAddress,
                        TOKEN_ID,
                        newPrice
                    )
                )
                    .to.emit(
                        marketplace,
                        "ItemListed"
                    )
                    .withArgs(
                        await seller.getAddress(),
                        nftAddress,
                        TOKEN_ID,
                        newPrice
                    )

                const listing =
                    await marketplace.getListing(
                        nftAddress,
                        TOKEN_ID
                    )

                expect(listing.price)
                    .to.equal(newPrice)

                expect(listing.seller)
                    .to.equal(
                        await seller.getAddress()
                    )
            }
        )
    })
})