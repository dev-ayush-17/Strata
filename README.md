# NFT Marketplace

A decentralized NFT Marketplace built with Solidity, Hardhat, TypeScript, and Ethers.js.

This project is being developed following professional smart contract engineering practices, including automated testing, deployment scripts, security considerations, and production-ready repository standards.

## Overview

The NFT Marketplace allows NFT owners to:

- List NFTs for sale
- Purchase listed NFTs
- Update listing prices
- Cancel listings
- Receive proceeds from sales

The project focuses on secure smart contract development and real-world Web3 engineering workflows.

---

## Tech Stack

### Smart Contracts
- Solidity
- OpenZeppelin Contracts

### Development Environment
- Hardhat
- TypeScript
- Hardhat Deploy

### Testing
- Mocha
- Chai
- Hardhat Network

### Web3 Tools
- Ethers.js

### Future Integrations
- IPFS
- Next.js Frontend
- Sepolia Deployment
- Contract Verification

---

## Project Structure

```text
contracts/
deploy/
scripts/
test/
├── unit/
└── staging/

helper-hardhat-config.ts
hardhat.config.ts
```

---

## Features

### NFT Listing

Owners can list approved NFTs on the marketplace.

### NFT Purchase

Users can purchase listed NFTs using ETH.

### Listing Management

Sellers can:

- Update listing prices
- Cancel listings

### Withdrawal System

Sellers can withdraw accumulated proceeds securely.

---

## Security Considerations

This project is being developed with security-first principles:

- Checks-Effects-Interactions Pattern
- Access Control Validation
- Input Validation
- Reentrancy Awareness
- Event-Based State Tracking
- Comprehensive Unit Testing

---

## Development Workflow

Clone the repository:

```bash
git clone <repository-url>
cd nft-marketplace
```

Install dependencies:

```bash
npm install
```

Compile contracts:

```bash
npx hardhat compile
```

Run tests:

```bash
npx hardhat test
```

Run coverage:

```bash
npx hardhat coverage
```

---

## Environment Variables

Create a `.env` file:

```env
SEPOLIA_RPC_URL=
PRIVATE_KEY=
ETHERSCAN_API_KEY=
COINMARKETCAP_API_KEY=
```

Never commit private keys or secrets.

---

## Testing Strategy

### Unit Tests

Local smart contract testing using Hardhat Network.

### Staging Tests

Tests executed against a live testnet environment.

Goals:

- High test coverage
- Edge case validation
- Failure path testing
- Event verification

---

## Deployment

### Local Network

```bash
npx hardhat node
```

```bash
npx hardhat deploy --network localhost
```

### Sepolia

```bash
npx hardhat deploy --network sepolia
```

---

## Roadmap

- [ ] Marketplace Contract
- [ ] Listing Functionality
- [ ] Purchase Functionality
- [ ] Cancellation Functionality
- [ ] Price Updates
- [ ] Withdrawal System
- [ ] Full Unit Test Suite
- [ ] Staging Tests
- [ ] Contract Verification
- [ ] Frontend Integration
- [ ] IPFS Metadata Support
- [ ] Mainnet Deployment Preparation

---

## Learning Goals

This project is part of a deeper exploration of:

- Smart Contract Development
- Blockchain Security
- Web3 Architecture
- Testing Methodologies
- Deployment Pipelines
- Professional Git Workflows

---
