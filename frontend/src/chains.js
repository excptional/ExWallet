const ETHEREUM_MAINNET_RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"
const SEPOLIA_TESTNET_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"
const POLYGON_TESTNET_RPC_URL = "https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"
const MUMBAI_TESTNET_RPC_URL = "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"

const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: ETHEREUM_MAINNET_RPC_URL,
    ticker: "ETH"
};

const MumbaiTestnet = {
    hex: '0x13881',
    name: 'Mumbai Testnet',
    rpcUrl: MUMBAI_TESTNET_RPC_URL,
    ticker: "MATIC"
};

const Polygon = {
    hex: '0x89',
    name: 'Polygon',
    rpcUrl: POLYGON_TESTNET_RPC_URL,
    ticker: 'MATIC'
};

const EthereumSepoliaTestnet = {
    hex: '0xaa36a7',
    name: 'Ethereum Sepolia Testnet',
    rpcUrl: SEPOLIA_TESTNET_RPC_URL,
    ticker: 'SepoliaETH'
};

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0x13881": MumbaiTestnet,
    "0x89": Polygon,
    "0xaa36a7": EthereumSepoliaTestnet,
};
