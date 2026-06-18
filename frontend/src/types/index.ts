export interface NFTItem {
  id: string;
  tokenId: number;
  name: string;
  collection: string;
  creator: string;
  owner: string;
  image: string;
  description: string;
  price: string;
  priceUsd: string;
  status: "listed" | "unlisted" | "auction";
  attributes: { trait_type: string; value: string; rarity: string }[];
  lastSale?: string;
  views: number;
  favorites: number;
}

export interface ProceedsData {
  available: string;
  availableUsd: string;
  totalEarned: string;
  pendingEscrow: string;
  withdrawals: {
    date: string;
    amount: string;
    status: "completed" | "pending" | "failed";
    txId: string;
  }[];
}

export type TransactionState =
  | "idle"
  | "awaiting-signature"
  | "pending"
  | "success"
  | "failed";

export interface TransactionInfo {
  state: TransactionState;
  nftName?: string;
  nftImage?: string;
  nftCollection?: string;
  price?: string;
  priceUsd?: string;
  txHash?: string;
  networkFee?: string;
}
