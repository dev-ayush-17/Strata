import { network } from "hardhat"
import { expect } from "chai"

const connection = await network.getOrCreate()
const { ethers } = connection

const TOKEN_URI = "ipfs://QmTestUri"

describe("NFT", function () {
    it("Initializes the NFT correctly", async function () {
        const nftFactory =
            await ethers.getContractFactory("NFT")

        const nft =
            await nftFactory.deploy()

        await nft.waitForDeployment()

        expect(await nft.name())
            .to.equal("Dogie")

        expect(await nft.symbol())
            .to.equal("DOG")
    })
})

describe("mintNft", function () {
    it("Mints an NFT and assigns ownership", async function () {
        const nftFactory =
            await ethers.getContractFactory("NFT")

        const nft =
            await nftFactory.deploy()

        await nft.waitForDeployment()

        expect(
            await nft.getTokenCounter()
        ).to.equal(0)

        await nft.mintNft(TOKEN_URI)

        const owner =
            await nft.ownerOf(0)

        const signer =
            await ethers.provider.getSigner()

        expect(owner)
            .to.equal(
                await signer.getAddress()
            )

        expect(
            await nft.getTokenCounter()
        ).to.equal(1)
    })
})

describe("tokenURI", function () {
    it("Returns the correct token URI", async function () {
        const nftFactory =
            await ethers.getContractFactory("NFT")

        const nft =
            await nftFactory.deploy()

        await nft.waitForDeployment()

        await nft.mintNft(TOKEN_URI)

        const uri =
            await nft.tokenURI(0)

        expect(uri)
            .to.equal(TOKEN_URI)
    })
})

describe("Events", function () {
    it("Emits an event when NFT is minted", async function () {
        const nftFactory =
            await ethers.getContractFactory("NFT")

        const nft =
            await nftFactory.deploy()

        await nft.waitForDeployment()

        const signer =
            await ethers.provider.getSigner()

        await expect(
            nft.mintNft(TOKEN_URI)
        )
            .to.emit(
                nft,
                "NftMinted"
            )
            .withArgs(
                0,
                await signer.getAddress(),
                TOKEN_URI
            )
    })
})