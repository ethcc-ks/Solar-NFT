import Web3 from "web3";

const getWeb3 = () => {
    if (window.ethereum) {
        // Modern dapp browsers
        return new Web3(window.ethereum);
    }
    if (window.web3) {
        // Use Mist/MetaMask's provider
        const { web3 } = window;
        return web3;
    }
    // Fallback to localhost; use dev console port by default...
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    const web3 = new Web3(provider);
    return web3;
};

export default getWeb3;
