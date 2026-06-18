import { pinata } from "./pinata.js"
import type { NftMetadata } from "./metadataTemplate.js"

export async function uploadMetadata(
    metadata: NftMetadata
): Promise<string> {
    console.log("Uploading metadata...")

    const metadataFile = new File(
        [
            JSON.stringify(
                metadata,
                null,
                2
            ),
        ],
        "metadata.json",
        {
            type: "application/json",
        }
    )

    const upload =
        await pinata.upload.public.file(
            metadataFile
        )

    console.log("Metadata uploaded")
    console.log(`CID: ${upload.cid}`)

    return upload.cid
}