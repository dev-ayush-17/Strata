import fs from "fs/promises"
import path from "path"

import { pinata } from "./pinata.js"

export async function uploadImage(
    imagePath: string
): Promise<string> {
    console.log(`Uploading image: ${imagePath}`)

    const fileBuffer = await fs.readFile(imagePath)

    const file = new File(
        [fileBuffer],
        path.basename(imagePath),
        {
            type: "image/png",
        }
    )

    const upload = await pinata.upload.public.file(file)

    console.log("Upload successful")
    console.log(`CID: ${upload.cid}`)

    return upload.cid
}