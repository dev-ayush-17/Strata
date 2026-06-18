import { NFTItem, ProceedsData } from "@/types";

export const MOCK_NFTS: NFTItem[] = [
  {
    id: "1",
    tokenId: 1,
    name: "Vanguard Pulse #01",
    collection: "Vanguard Series",
    creator: "@Aether_Design",
    owner: "0x7a...9f2b",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDa6OU2COwg_h02wIe1HoMiisrIrQj_2uLg3OZA6M0RZVIKSgV55to6f6EXumh5yWnrkY6IFbp5cnypUt6ZNIX-BnmiVp2qloqs49pWmHvoFxDwJa9B9ObNx7HmegsVThh0QnpIYqz2tJkcLgGYPs_qnAGrn_4Pxak6vZmcDqjyduTfEhWaaKvUrrzVkwGavIVQ6alA3FCUasNFQIkvfwpkDcCmJnjPiNe8Q3BiBXGDxSJD-kNeCMat--Pix7F74nGwxPzXC_PwKw",
    description:
      "Vanguard Pulse #01 is the genesis piece of the highly anticipated Vanguard Series. This artwork captures the raw, pulsating energy of digital sentience awakening within the metaverse.",
    price: "2.45",
    priceUsd: "$4,531.25",
    status: "auction",
    attributes: [
      { trait_type: "Core", value: "Neon Heart", rarity: "12%" },
      { trait_type: "Vibe", value: "Cybernetic", rarity: "8%" },
      { trait_type: "Rarity", value: "Epic", rarity: "2%" },
    ],
    views: 1200,
    favorites: 342,
  },
  {
    id: "2",
    tokenId: 2,
    name: "Nebula Horizon",
    collection: "Cosmic Realms",
    creator: "@GlassRealms",
    owner: "0x3c...8d1a",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgDQRa7p3Rhuhlp5sBP-Nv2WKU76sF0957ZRcDJ2RsN2UXbqb0Wj_VM52NmGuqh4IWoyf4Ysv0a_Gb9NIituBVMmnWcufG1Or5ie9isHGu-cor5IrtXFpsY7CEMomp6Re2iC0qRZLza4yf9GvVm3FeE-2O10j4LYsCmuIBlIZ3nB4mMSUFbnPXKAlTmFjkU2Ny-ILzfN1HaEqvRxKHn9OvVBm6R3AxbbHQncIRmaSDOFhMIPXBSrEDm9KxD7GAFdTKZrvB_9ZH6g",
    description:
      "An ethereal digital landscape featuring floating islands made of iridescent glass.",
    price: "1.89",
    priceUsd: "$3,496.50",
    status: "listed",
    attributes: [
      { trait_type: "Biome", value: "Nebula", rarity: "5%" },
      { trait_type: "Mood", value: "Ethereal", rarity: "15%" },
    ],
    views: 890,
    favorites: 215,
  },
  {
    id: "3",
    tokenId: 3,
    name: "Cyber Synthesis",
    collection: "Digital Identity",
    creator: "@Neo_Tek",
    owner: "0x9e...4f1c",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBi25tVbcIjV-RAT51cMFPodwx8Wx3m-RLO5_VsH0fGzuwGUJZtkUdwHlr4hv5kqHiJ5m7u8lRYTmyG7tLHi3Dao_Mx8MTC_3z5ZRy_mY2AsLSFDvifQCCyt7lfa7q9v_anMqfs1-JrgirZ9Sc4LfqdWUNZn2pIu7c2hZ2qxgyoWY5u1l7Oi2JzE7HHZsL1LtNRRmsAJHNSxsjgxBHEffJPMoYmVmdT2fDgGFWyCHpios_V9v1lt4WGa50ESBoh8tvi41vUhezurw",
    description:
      "A portrait of a cyberpunk android with glowing fiber-optic hair.",
    price: "3.12",
    priceUsd: "$5,772.00",
    status: "listed",
    attributes: [
      { trait_type: "Species", value: "Android", rarity: "10%" },
      { trait_type: "Hair", value: "Fiber Optic", rarity: "3%" },
    ],
    views: 2100,
    favorites: 567,
  },
  {
    id: "4",
    tokenId: 4,
    name: "Monolith Flow",
    collection: "Abstract Constructs",
    creator: "@Architect_NFT",
    owner: "0x1b...7e3d",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAim3yaQllN9alvWS0p4i8gQSQ4D0BX80m8KNP8mGjZd8aCtJ_KBTufh3NllYjkw9aMZjBVb4KZoxnPSPTw4sflT-hfgqc_kKtAuRRtFTGCCUWMVD7ADPJYg2NIV-_nWU1a8sKKgbujqEwAHBVXuSmq4-uuiOy4nsRm7HO0fcFDdp-h9wT-YKmo9Cq0I_bhEKkVvKMOaqXHyfvTUc-Lb6KwOpDnEwmG_tZiM3UzPObt--h-eX8NFeNIQ4XMCNmpwLoXgvVJMf8YKA",
    description:
      "Minimalist abstract art with liquid gold ribbons weaving through floating black monoliths.",
    price: "0.95",
    priceUsd: "$1,757.50",
    status: "listed",
    attributes: [
      { trait_type: "Style", value: "Minimalist", rarity: "20%" },
      { trait_type: "Material", value: "Gold & Obsidian", rarity: "7%" },
    ],
    views: 450,
    favorites: 128,
  },
  {
    id: "5",
    tokenId: 5,
    name: "Crystal Resurgence",
    collection: "Prism Studio",
    creator: "@PrismStudio",
    owner: "0x5d...2a8f",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUA_P1s0esmZBDt8iZo-WCSap-FU25_EYjL2UHZUA8IcAf_GK1Iw6WW58hDwoh28qiUgmoip9tdpp_aIFF31ZeRqpwGGq7yQRtZd6Ao34rOnYlwU_qXfDtqU2RQWmY9hk5bsHeev3v2jrPDTaj5KapJQlL1L3O3-ZOwS7V7eoFNEGtPBiaXgqz2R9hqsGPWG2HbuK-kpiclhyrGs57VcFLUwaRrY9i395mHU0BKio8CD0YMoPUpxOqp1HzyPleLR6etfq9aymUPg",
    description:
      "A crystalline phoenix rising from embers that look like glowing violet data nodes.",
    price: "4.20",
    priceUsd: "$7,770.00",
    status: "listed",
    attributes: [
      { trait_type: "Element", value: "Crystal", rarity: "4%" },
      { trait_type: "Stage", value: "Resurgence", rarity: "6%" },
    ],
    views: 1800,
    favorites: 493,
  },
  {
    id: "6",
    tokenId: 6,
    name: "Zen Equilibrium",
    collection: "Void Art",
    creator: "@VoidArt",
    owner: "0x8f...3a1b",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiNKnRUlWMfoyyI2elq9UamjKKEnywpyPWTPMx8HraBsW-OC1Sr0dGwofPIvdlsRLrdkaE2QoERPff0gzqBdJpw64nRIwZG5MtB-ZH7s1RxH74yiOtF457U4Ke7Q32SHZMEUAU2kzQcQCuECBMQGpqPlUKAi27NEGt1nDKRl697mEEMcqGjD4WnWJnVlUVsmZFwaX4A1nR7Ld9mkLbxWCXWdhGWut0SX5x0YIbJg2fyxezEgmx9N-3Ublz_bV-_arIqCC6IgNKgw",
    description:
      "A serene, minimalist animation still showing floating obsidian spheres in a Zen-like garden.",
    price: "1.50",
    priceUsd: "$2,775.00",
    status: "listed",
    attributes: [
      { trait_type: "Mood", value: "Meditative", rarity: "18%" },
      { trait_type: "Setting", value: "Zen Garden", rarity: "11%" },
    ],
    views: 670,
    favorites: 189,
  },
];

export const MOCK_OWNED_NFTS: NFTItem[] = [
  {
    id: "o1",
    tokenId: 10,
    name: "Crystalline Entity #042",
    collection: "Ethereal Fluids",
    creator: "@vault_master",
    owner: "0x8F...3a1B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyniu42sB1cQwxoTrPflNfhawmulRQ83ToKkiJvLmSYIx0T_tzNgB_tVhQbbksDENSppne4LVmPRI3t-uZkqpxN1nl7roLiVx0YA7G5cQN26-tWHnxxIqSqFuYyp-aIZhb98XCk5eI4YPdHQbuTSN6V3V3LB8R2x26lKCkavcWNC_CIQE-oBZzdigo0nbI877MhQhaeSUQvCUcKAXpL7LR1toaW5GOUxtiz8wVKGDOFSmG7VLfpOJlXhrdTTD_TVF_yzk_pBVXwg",
    description: "Mesmerizing abstract digital painting featuring fluid dynamics.",
    price: "4.5",
    priceUsd: "$8,325.00",
    status: "listed",
    attributes: [],
    views: 320,
    favorites: 88,
  },
  {
    id: "o2",
    tokenId: 11,
    name: "Obsidian Visor",
    collection: "Neo Ronin",
    creator: "@vault_master",
    owner: "0x8F...3a1B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6JvR-9Ci36bP8g9L3L-6QoGbR5KXQmhy1vt8TxE8zo0AneegDfxous3rV-sQ1pVEiewO_2Q6fDOTX8NzdPvIJwEAK77WKaIti5QFfGtt-yZgggXlhDtqx3JosI9WNmTJBaIQyPrLd-8dDz4zQoEIGIs1pdGRBx0ZerP0C882XC9TbbA_yoW9dK5YlH5Fr6TQHXD4e65p5zZqw06lUckXv5dUMxr3Wmg197fgCwA1kkCdqgxUdircCtX6ts_tWTXU7Ov1fIy0wpA",
    description: "Futuristic samurai helmet from polished obsidian and titanium.",
    price: "2.1",
    priceUsd: "$3,885.00",
    status: "unlisted",
    lastSale: "2.1",
    attributes: [],
    views: 180,
    favorites: 45,
  },
  {
    id: "o3",
    tokenId: 12,
    name: "Structure #99",
    collection: "Void Architecture",
    creator: "@vault_master",
    owner: "0x8F...3a1B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDA1GTF45JzeFHg7KwGFa7gvz0vNACZMRZ22EjJvsa-xFN3Rc3dwt_mF6kcGVv5DS3vNh2IqjChlmDowvglkLAjH4vzCAQMREO3R9xLr25GjJG9rVjYLcBF79Pec7ZZNP1rX-370xg1dh5626i03pS4rYfbsSMRojbSDk6Sk8Ax1HqwFvBsVu6BPRdVvzGjFhxrDC5cYs1rVKkARWoXLyU5vJqsPIEpkvp509xt1TLShrnwvd4XWDStGXY3xob9s0Kg6VGFRloQ",
    description: "Generative architectural landscape with floating brutalist structures.",
    price: "1.2",
    priceUsd: "$2,220.00",
    status: "listed",
    attributes: [],
    views: 560,
    favorites: 134,
  },
  {
    id: "o4",
    tokenId: 13,
    name: "Ocular Implant v2",
    collection: "Synthetic Biology",
    creator: "@vault_master",
    owner: "0x8F...3a1B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBabSZ5FYfd4bFtmf3hmMiZOstBgl4nd9krU68sYj8zvo1vm9hCO3As9ISaYYrDj7Dxa2gN4DCNvaXZR7advxh0sNCZzCIV4l7W3awhb4BCPaGf4nzOfnAde7KKaFJRVJRWAtzYTIzNj49d8NMZ6CJ6XhGDoL-eNqLkQ5h859F5nb4Yn9CF-v5wZOD1od5InWdlJNAiSUrMBKzTdcXWaUgs7KqpxmciGhu8SIja4HcB7mEEBHc-c0WczCB7zESDo0K1MjEI_lxicQ",
    description: "A macro photography shot of a synthetic cybernetic eye.",
    price: "0.8",
    priceUsd: "$1,480.00",
    status: "unlisted",
    lastSale: "0.8",
    attributes: [],
    views: 290,
    favorites: 67,
  },
];

export const FEATURED_NFT = {
  name: "Ethereal Symmetry #04",
  creator: "@AetherStudio",
  creatorAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDV8NTETSxqWggLhQJ38CaIYiDHi7o_YYiG61aRqCeq6Umni9ll9lLhXbqO7ZqUn3E0Qznp7Cr98BFbkxCOJ1ADA2amYA5uZV-Jtv0YCaSkJwYIk-9pKt-1l85mZldMShresUx9Ft7nju7yaQWxXf8PAZxUPL0G0xjmP_b1Nc2W2VsEo-FpnTv86cL2ST_FZ7D08yqXCizCJo_W4Qox3Q3Mh2H-v7Cf5j19ALQOfdxZGPa5NdzaGI1jo1PfyzbkuV-VlQY-xZVgPg",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ChZpFCxylvGHh91pj0yu5uoRuRvkdGXNZQuoaCwqU6cST-xlNKS9a7_pGIjKIJ1yNS3I_utLoaMJ4b27EtNJPgk_gzsaWvQWH2gj07_AlIiQEJBTg0Hw8X0MXtQ_9S6nhv8qivi69pdUJqbewvpadbf34RlrPkKLu2hpDRKsy6_8wh8Desb5V09wwU_meIVo8Pfiz2pvM9aoK5wlaVNdMOy6l7ppJfz2uizA1r-QtVr6c7QV2dE7Kd81bnAyHl2UggKZ7E25rg",
  bid: "12.45",
  countdown: "08h : 42m : 12s",
};

export const MOCK_PROCEEDS: ProceedsData = {
  available: "42.85",
  availableUsd: "$145,230.50",
  totalEarned: "156.20",
  pendingEscrow: "5.00",
  withdrawals: [
    { date: "Oct 24, 2024", amount: "12.50", status: "completed", txId: "0x8f2...4b1c" },
    { date: "Oct 18, 2024", amount: "5.00", status: "completed", txId: "0x3a1...9d2e" },
    { date: "Sep 02, 2024", amount: "28.40", status: "completed", txId: "0x7c9...1f4a" },
    { date: "Aug 15, 2024", amount: "8.25", status: "completed", txId: "0x1d5...8b3c" },
    { date: "Jul 22, 2024", amount: "45.00", status: "completed", txId: "0x9e2...5a7b" },
  ],
};

export const STATS = [
  { label: "Total Volume", value: "420K+" },
  { label: "Unique Owners", value: "1.2M" },
  { label: "Floor Price", value: "8.5 ETH" },
  { label: "Top Artists", value: "150+" },
];
