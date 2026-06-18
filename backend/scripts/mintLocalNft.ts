import { network } from "hardhat"

const { ethers } = await network.getOrCreate()

async function main() {
    console.log("=== Local NFT Mint & Marketplace Flow ===\n")

    // Deploy contracts
    const nftFactory =
        await ethers.getContractFactory("NFT")
    const nft = await nftFactory.deploy()
    await nft.waitForDeployment()
    const nftAddress = await nft.getAddress()
    console.log(`NFT deployed to: ${nftAddress}`)

    const marketplaceFactory =
        await ethers.getContractFactory("NFTMarketplace")
    const marketplace =
        await marketplaceFactory.deploy()
    await marketplace.waitForDeployment()
    const marketplaceAddress =
        await marketplace.getAddress()
    console.log(
        `Marketplace deployed to: ${marketplaceAddress}`
    )

    const [seller, buyer] =
        await ethers.getSigners()

    // 1. Mint NFT with a metadata URI
    const metadataUri =
        "ipfs://bafkreidiaa5pzv53jqh6nqneurppoorjky3i3r7b7q7y6kxbj664o7il54"

    console.log(
        `\n1. Minting NFT with URI: ${metadataUri}`
    )

    const mintTx =
        await nft.connect(seller).mintNft(metadataUri)
    await mintTx.wait()

    const tokenId = 0
    console.log(`   Token ID: ${tokenId}`)
    console.log(
        `   Owner: ${await nft.ownerOf(tokenId)}`
    )
    console.log(
        `   Token URI: ${await nft.tokenURI(tokenId)}`
    )

    // 2. Approve marketplace
    console.log("\n2. Approving marketplace...")
    const approveTx =
        await nft
            .connect(seller)
            .approve(marketplaceAddress, tokenId)
    await approveTx.wait()
    console.log("   Approved")

    // 3. List NFT
    const price = ethers.parseEther("1")
    console.log(
        `\n3. Listing NFT for ${ethers.formatEther(price)} ETH`
    )

    const listTx =
        await marketplace
            .connect(seller)
            .listItem(nftAddress, tokenId, price)
    await listTx.wait()

    const listing =
        await marketplace.getListing(
            nftAddress, tokenId
        )
    console.log(
        `   Listed — Price: ${ethers.formatEther(listing.price)} ETH, Seller: ${listing.seller}`
    )

    // 4. Buy NFT
    console.log(
        `\n4. Buyer purchasing NFT...`
    )

    const buyTx =
        await marketplace
            .connect(buyer)
            .buyItem(nftAddress, tokenId, {
                value: price,
            })
    await buyTx.wait()

    console.log(
        `   New owner: ${await nft.ownerOf(tokenId)}`
    )

    // 5. Verify listing is cleared
    const listingAfter =
        await marketplace.getListing(
            nftAddress, tokenId
        )
    console.log(
        `\n5. Listing after purchase — Price: ${listingAfter.price} (should be 0)`
    )

    // 6. Check & withdraw proceeds
    const proceeds =
        await marketplace.getProceeds(
            seller.address
        )
    console.log(
        `\n6. Seller proceeds: ${ethers.formatEther(proceeds)} ETH`
    )

    console.log("   Withdrawing proceeds...")
    const withdrawTx =
        await marketplace
            .connect(seller)
            .withdrawProceeds()
    await withdrawTx.wait()

    const proceedsAfter =
        await marketplace.getProceeds(
            seller.address
        )
    console.log(
        `   Proceeds after withdrawal: ${ethers.formatEther(proceedsAfter)} ETH (should be 0)`
    )

    console.log(
        "\n=== Full local lifecycle complete! ==="
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
