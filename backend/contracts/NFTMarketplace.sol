// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error PriceMustBeAboveZero();
error NotApprovedForMarketplace();
error AlreadyListed(address nftAddress, uint256 tokenId);
error NotOwner();
error ItemNotListed(
    address nftAddress,
    uint256 tokenId
);
error PriceNotMet(
    address nftAddress,
    uint256 tokenId,
    uint256 price
);
error NoProceeds();
error TransferFailed();

contract NFTMarketplace {

    //Declaring State Variables
    struct Listing {
        uint256 price;
        address seller;
    }
    mapping(address => mapping(uint256 => Listing)) private s_listings;
    mapping(address => uint256) private s_proceeds;


    //Events
    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCancelled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );


    // Modifiers
    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);

        if (spender != nft.ownerOf(tokenId)) {
            revert NotOwner();
        }

        _;
    }
    
    modifier notListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        
        if (listing.price > 0) {
            revert AlreadyListed(
                nftAddress, tokenId
            );
        }
        _;
    }

    modifier isListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Listing memory listing = s_listings[nftAddress][tokenId];

        if (listing.price <= 0) {
            revert ItemNotListed(
                nftAddress, tokenId
            );
        }
        _;
    }


    // Functioms
    function listItem(
        address nftAddress, 
        uint256 tokenId,
        uint256 price
    ) external 
        notListed(
            nftAddress, tokenId
        ) 
        isOwner(
            nftAddress, tokenId, msg.sender
        )

    {

        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }

        IERC721 nft = IERC721(nftAddress);

        if (
            nft.getApproved(tokenId) != address(this)
        ) {
            revert NotApprovedForMarketplace();
        }

        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(
            msg.sender, nftAddress, tokenId, price
        );
    }

    function buyItem(
        address nftAddress,
        uint256 tokenId
    )
        public payable
        isListed(
            nftAddress, tokenId
        )
    {
        Listing memory listedItem = s_listings[nftAddress][tokenId];

        if (msg.value < listedItem.price) {
            revert PriceNotMet(
                nftAddress, tokenId, listedItem.price
            );
        }

        s_proceeds[listedItem.seller] += msg.value;

        delete s_listings[nftAddress][tokenId];
        IERC721(nftAddress).safeTransferFrom(
            listedItem.seller,
            msg.sender,
            tokenId
        );

        emit ItemBought(
            msg.sender,
            nftAddress,
            tokenId,
            listedItem.price
        );
    }

    function withdrawProceeds() public {
        uint256 proceeds = s_proceeds[msg.sender];
        if (proceeds <= 0){
            revert NoProceeds();
        }
        s_proceeds[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{
            value: proceeds
        }("");
        if (!success) {
            revert TransferFailed();
        }
    }

    function cancelListing(
        address nftAddress, uint256 tokenId
    ) external
        isListed(
            nftAddress, tokenId
        )
        isOwner(
            nftAddress, tokenId, msg.sender
        )
    {

        delete s_listings[nftAddress][tokenId];
        emit ItemCancelled(
            msg.sender, nftAddress, tokenId
        );
    }

    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    ) public 
        isListed(
            nftAddress, tokenId
        )
        isOwner(
            nftAddress, tokenId, msg.sender
        )
    {
        if (newPrice <= 0) {
            revert PriceMustBeAboveZero();
        }

        s_listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(
            msg.sender, nftAddress, tokenId, newPrice 
        );
    }


    // Getter functions
    function getListing(
        address nftAddress, uint256 tokenId
    ) 
        public view returns (Listing memory) 
    {
        return s_listings[nftAddress][tokenId];
    }

    function getProceeds(address seller) public view returns(uint256) {
        return s_proceeds[seller];
    }
}