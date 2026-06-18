import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.getOrCreate()

describe("NFT IPFS Integration", function () {
    let nft: any;

    beforeEach(async function () {
        const nftFactory = await ethers.getContractFactory("NFT");

        nft = await nftFactory.deploy();

        await nft.waitForDeployment();
    });

    it("stores and returns the correct metadata URI", async function () {
        const [deployer] = await ethers.getSigners();

        const metadataUri =
            "ipfs://bafkreidiaa5pzv53jqh6nqneurppoorjky3i3r7b7q7y6kxbj664o7il54";

        await nft.mintNft(metadataUri);

        expect(
            await nft.ownerOf(0)
        ).to.equal(deployer.address);

        expect(
            await nft.tokenURI(0)
        ).to.equal(metadataUri);
    });
});