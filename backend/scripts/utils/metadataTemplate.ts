export interface Attribute {
    trait_type: string
    value: string
}

export interface NftMetadata {
    name: string
    description: string
    image: string
    attributes: Attribute[]
}

export function createMetadata(
    imageCid: string
): NftMetadata {
    return {
        name: "Dogie #1",
        description: "NFT Marketplace Learning Project",
        image: `ipfs://${imageCid}`,
        attributes: [
            {
                trait_type: "Mood",
                value: "Happy",
            },
        ],
    }
}