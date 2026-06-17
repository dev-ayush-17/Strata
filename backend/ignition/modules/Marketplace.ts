import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_URI = "ipfs://QmTest"

const MarketPlaceModule = buildModule(
    "MarketplaceModule",
    (m) => {

        const nft = m.contract(
            "NFT", [TOKEN_URI]
        );

        const marketplace = 
            m.contract(
                "NFTMarketplace"
            );

        return {
            nft, marketplace
        };
    }
);

export default MarketPlaceModule;