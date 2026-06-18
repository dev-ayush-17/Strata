import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.getOrCreate()

describe("Marketplace End-to-End Flow", function () {
    let nft: any;
    let marketplace: any;

    const TOKEN_ID = 0;
    const PRICE = ethers.parseEther("0.1");
    const METADATA_URI = "ipfs://bafkreidiaa5pzv53jqh6nqneurppoorjky3i3r7b7q7y6kxbj664o7il54";

    beforeEach(async function () {
        const nftFactory = await ethers.getContractFactory("NFT");
        nft = await nftFactory.deploy();
        await nft.waitForDeployment();

        const marketplaceFactory = await ethers.getContractFactory(
            "NFTMarketplace"
        );
        marketplace = await marketplaceFactory.deploy();
        await marketplace.waitForDeployment();
    });

    it("full lifecycle: mint → approve → list → buy → ownership → proceeds → withdraw", async function () {
        const [seller, buyer] = await ethers.getSigners();
        const nftAddress = await nft.getAddress();
        const marketplaceAddress = await marketplace.getAddress();

        // 1. Mint NFT
        await nft.connect(seller).mintNft(METADATA_URI);
        expect(await nft.ownerOf(TOKEN_ID)).to.equal(seller.address);
        expect(await nft.tokenURI(TOKEN_ID)).to.equal(METADATA_URI);

        // 2. Approve marketplace
        await nft
            .connect(seller)
            .approve(marketplaceAddress, TOKEN_ID);

        // 3. List NFT
        await marketplace
            .connect(seller)
            .listItem(nftAddress, TOKEN_ID, PRICE);

        const listing = await marketplace.getListing(
            nftAddress, TOKEN_ID
        );
        expect(listing.price).to.equal(PRICE);
        expect(listing.seller).to.equal(seller.address);

        // 4. Buy NFT
        await marketplace
            .connect(buyer)
            .buyItem(nftAddress, TOKEN_ID, {
                value: PRICE,
            });

        // 5. Verify ownership transferred
        expect(
            await nft.ownerOf(TOKEN_ID)
        ).to.equal(buyer.address);

        // 6. Verify listing is cleared after purchase
        const listingAfter = await marketplace.getListing(
            nftAddress, TOKEN_ID
        );
        expect(listingAfter.price).to.equal(0);
        expect(listingAfter.seller).to.equal(
            ethers.ZeroAddress
        );

        // 7. Verify proceeds recorded
        expect(
            await marketplace.getProceeds(seller.address)
        ).to.equal(PRICE);

        // 8. Withdraw proceeds and verify balance change
        const balanceBefore =
            await ethers.provider.getBalance(
                seller.address
            );

        const withdrawTx = await marketplace
            .connect(seller)
            .withdrawProceeds();
        const receipt = await withdrawTx.wait();

        const gasUsed =
            receipt!.gasUsed * receipt!.gasPrice;

        const balanceAfter =
            await ethers.provider.getBalance(
                seller.address
            );

        // 9. Verify proceeds reset to 0
        expect(
            await marketplace.getProceeds(seller.address)
        ).to.equal(0);

        // 10. Verify seller received ETH (balance increased by PRICE minus gas)
        expect(balanceAfter).to.equal(
            balanceBefore + PRICE - gasUsed
        );
    });

    it("prevents buying an already-sold item", async function () {
        const [seller, buyer, thirdParty] =
            await ethers.getSigners();
        const nftAddress = await nft.getAddress();
        const marketplaceAddress =
            await marketplace.getAddress();

        await nft.connect(seller).mintNft(METADATA_URI);
        await nft
            .connect(seller)
            .approve(marketplaceAddress, TOKEN_ID);
        await marketplace
            .connect(seller)
            .listItem(nftAddress, TOKEN_ID, PRICE);

        // First purchase succeeds
        await marketplace
            .connect(buyer)
            .buyItem(nftAddress, TOKEN_ID, {
                value: PRICE,
            });

        // Second purchase attempt fails (listing cleared)
        await expect(
            marketplace
                .connect(thirdParty)
                .buyItem(nftAddress, TOKEN_ID, {
                    value: PRICE,
                })
        ).to.be.revertedWithCustomError(
            marketplace,
            "ItemNotListed"
        );
    });
});