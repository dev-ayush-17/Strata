import { uploadImage } from "./utils/uploadImage.js"
import { createMetadata } from "./utils/metadataTemplate.js"
import { uploadMetadata } from "./utils/uploadMetadata.js"

async function main() {
    console.log("Starting upload pipeline...\n")

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

    console.log("\nPipeline Complete")

    console.log(
        `Image URI: ipfs://${imageCid}`
    )

    console.log(
        `Metadata URI: ipfs://${metadataCid}`
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})