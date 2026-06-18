import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MarketPlaceModule = buildModule(
    "MarketplaceModule",
    (m) => {
        const nft = m.contract("NFT");

        const marketplace = m.contract(
            "NFTMarketplace"
        );

        return {
            nft, marketplace
        };
    }
);

export default MarketPlaceModule;