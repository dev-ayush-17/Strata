// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    // State Variables
    uint256 private s_tokenCounter;

    mapping(uint256 => string) private s_tokenUris;

    // Events
    event NftMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenUri
    );

    // Constructor
    constructor() ERC721("Dogie", "DOG") {}

    // Mint NFT
    function mintNft(
        string memory tokenUri
    ) public {
        uint256 tokenId = s_tokenCounter;

        s_tokenUris[tokenId] = tokenUri;

        _safeMint(msg.sender, tokenId);

        emit NftMinted(
            tokenId,
            msg.sender,
            tokenUri
        );

        s_tokenCounter++;
    }

    // Return metadata URI for a token
    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override
        returns (string memory)
    {
        _requireOwned(tokenId);

        return s_tokenUris[tokenId];
    }

    // Getter Functions
    function getTokenCounter()
        public
        view
        returns (uint256)
    {
        return s_tokenCounter;
    }
}