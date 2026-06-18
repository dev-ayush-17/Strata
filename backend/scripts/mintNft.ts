import { network } from "hardhat"
import { uploadImage } from "./utils/uploadImage.js"
import { createMetadata } from "./utils/metadataTemplate.js"
import { uploadMetadata } from "./utils/uploadMetadata.js"
const { ethers } = await network.getOrCreate()

async function main() {
    // Pass the deployed NFT contract address as an env var or CLI arg
    const NFT_ADDRESS = process.env.NFT_ADDRESS

    if (!NFT_ADDRESS) {
        throw new Error(
            "NFT_ADDRESS env variable is required. " +
            "Deploy contracts first, then set NFT_ADDRESS=0x..."
        )
    }

    const nft =
        await ethers.getContractAt(
            "NFT",
            NFT_ADDRESS
        )

    const imageCid =
        await uploadImage(
            "./images/dogie.webp"
        )

    const metadata =
        createMetadata(imageCid)

    const metadataCid =
        await uploadMetadata(
            metadata
        )

    const metadataUri =
        `ipfs://${metadataCid}`

    console.log(
        `Minting NFT with URI: ${metadataUri}`
    )

    const tx =
        await nft.mintNft(
            metadataUri
        )

    const receipt =
        await tx.wait()

    console.log(
        `Minted in tx: ${receipt?.hash}`
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})