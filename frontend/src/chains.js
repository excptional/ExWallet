const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: '',
    ticker: "ETH"
};

const MumbaiTestnet = {
    hex: '0x13881',
    name: 'Mumbai Testnet',
    rpcUrl: '',
    ticker: "MATIC"
};

const Polygon = {
    hex: '0x89',
    name: 'Polygon',
    rpcUrl: '',
    ticker: 'MATIC'
};

const EthereumSepoliaTestnet = {
    hex: '0xaa36a7',
    name: 'Ethereum Sepolia Testnet',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/wTH9NHRG8XDQRGSjSXQaeEwd0_2PP_fW',
    ticker: 'SepoliaETH'
};

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0x13881": MumbaiTestnet,
    "0x89": Polygon,
    "0xaa36a7": EthereumSepoliaTestnet,
};