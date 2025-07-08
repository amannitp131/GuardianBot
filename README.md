<div align="center">
    <h1>🛡️ GuardianBot</h1>
    <p>A comprehensive BlockDAG-based decentralized application with advanced smart contract functionality</p>
    <p>
        <a href="https://primordial.bdagscan.com/">
            <img src="https://blockdag.network/images/presskit/Logo.svg" width="200" alt="BlockDAG" />
        </a>
    </p>
</div>

# GuardianBot

**GuardianBot** is a modern, full-stack decentralized application (DApp) built on the BlockDAG Primordial network. It features a robust architecture with dual smart contract development environments and a responsive Next.js frontend with Web3 integration.

## ✨ Features

- 🔗 **BlockDAG Integration**: Built specifically for BlockDAG Primordial network
- 🛠️ **Dual Development Environment**: Support for both Hardhat and Foundry
- ⚛️ **Modern Frontend**: Next.js with TypeScript, Tailwind CSS, and Web3Modal
- 🔐 **Smart Contract Security**: OpenZeppelin contracts integration
- 🧪 **Comprehensive Testing**: Test suites for both Foundry and Hardhat environments
- 🚀 **Production Ready**: Optimized deployment configurations

## 🏗️ Project Structure

```
GuardianBot/
├── guardianbot/
│   ├── contracts/
│   │   ├── hardhat/              # Hardhat development environment
│   │   │   ├── contracts/        # Solidity smart contracts
│   │   │   │   └── Greeter.sol   # Example contract
│   │   │   ├── scripts/          # Deployment scripts
│   │   │   ├── test/             # Contract tests
│   │   │   └── hardhat.config.ts # Hardhat configuration
│   │   └── foundry/              # Foundry development environment
│   │       ├── src/              # Solidity smart contracts
│   │       │   └── MyToken.sol   # ERC20 token contract
│   │       ├── test/             # Contract tests
│   │       ├── script/           # Deployment scripts
│   │       └── foundry.toml      # Foundry configuration
│   └── frontend/                 # Next.js frontend application
│       ├── src/
│       │   ├── app/              # Next.js app router
│       │   ├── components/       # React components
│       │   ├── configs/          # Web3 configurations
│       │   └── chains.ts         # Blockchain configurations
│       └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GuardianBot
```

### 2. Environment Setup

#### Frontend Environment

```bash
cd guardianbot/frontend
cp .env.example .env.local
```

Edit `.env.local` with your WalletConnect Project ID:
```bash
NEXT_PUBLIC_PROJECT_ID=your_wallet_connect_project_id
```

> Get your WalletConnect Project ID at https://cloud.walletconnect.com/

#### Smart Contracts Environment

**For Hardhat:**
```bash
cd ../contracts/hardhat
cp .env.example .env
```

**For Foundry:**
```bash
cd ../contracts/foundry
cp .env.example .env
```

Edit the `.env` files with your private key:
```bash
# Hardhat
DEPLOYER_PRIVATE_KEY=your_private_key_here

# Foundry
PRIVATE_KEY=your_private_key_here
RPC_URL=https://rpc.primordial.bdagscan.com
```

### 3. Installation & Setup

#### Frontend Setup

```bash
cd guardianbot/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### Smart Contracts Setup

**Using Hardhat:**
```bash
cd guardianbot/contracts/hardhat
npm install
npx hardhat compile
npx hardhat test
```

**Using Foundry:**
```bash
cd guardianbot/contracts/foundry
forge install
forge build
forge test
```

## 📋 Available Scripts

### Frontend Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# From guardianbot/frontend/
```

### Smart Contract Commands

**Hardhat:**
```bash
# From guardianbot/contracts/hardhat/
npx hardhat compile                                    # Compile contracts
npx hardhat test                                       # Run tests
npx hardhat run scripts/deploy.ts --network primordial # Deploy to Primordial network
```

**Foundry:**
```bash
# From guardianbot/contracts/foundry/
forge build                                            # Compile contracts
forge test                                             # Run tests
forge script script/Deployer.s.sol --rpc-url $RPC_URL --broadcast --legacy --private-key $PRIVATE_KEY
```

## 🔧 Configuration

### Network Configuration

The project is configured for BlockDAG Primordial network:

- **Chain ID**: 1043
- **RPC URL**: https://rpc.primordial.bdagscan.com
- **Explorer**: https://primordial.bdagscan.com
- **Currency**: BDAG

### Smart Contracts

#### Available Contracts

1. **Greeter** (Hardhat): A simple greeting contract
2. **MyToken** (Foundry): An ERC20 token with minting capabilities

#### Contract Features

- OpenZeppelin integration for security
- Comprehensive test coverage
- Gas optimization enabled
- Deployment scripts for both environments

## 🧪 Testing

### Running Tests

**Hardhat Tests:**
```bash
cd guardianbot/contracts/hardhat
npx hardhat test
```

**Foundry Tests:**
```bash
cd guardianbot/contracts/foundry
forge test -vv
```

### Test Coverage

The project includes comprehensive test suites covering:
- Contract deployment
- Function calls
- Edge cases
- Gas optimization

## 🚀 Deployment

### Deploy to Primordial Network

**Using Hardhat:**
```bash
cd guardianbot/contracts/hardhat
npx hardhat run scripts/deploy.ts --network primordial
```

**Using Foundry:**
```bash
cd guardianbot/contracts/foundry
source .env
forge script script/Deployer.s.sol --rpc-url $RPC_URL --broadcast --legacy --private-key $PRIVATE_KEY
```

### Frontend Deployment

```bash
cd guardianbot/frontend
npm run build
npm run start
```

## 🔐 Security

- All smart contracts use OpenZeppelin's secure implementations
- Private keys are managed through environment variables
- Frontend uses secure Web3 connection practices
- Comprehensive testing for security vulnerabilities

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Web3Modal**: Web3 wallet connection
- **Wagmi**: React hooks for Ethereum
- **Viem**: Type-safe Ethereum library

### Smart Contracts
- **Solidity**: Smart contract language
- **Hardhat**: Development environment
- **Foundry**: Fast development toolkit
- **OpenZeppelin**: Secure contract library

### Blockchain
- **BlockDAG Primordial**: Layer 1 blockchain
- **BDAG**: Native cryptocurrency

## 📚 Documentation

- [BlockDAG Documentation](https://blockdag.network)
- [Hardhat Documentation](https://hardhat.org)
- [Foundry Documentation](https://book.getfoundry.sh)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
mail me : amanmis601@gmail.com

---

**Built with ❤️ for the BlockDAG ecosystem**
