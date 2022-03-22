import { ethers } from 'ethers';

import MaticIcon from '../assets/icons/tokens/matic.svg';
import EthIcon from '../assets/icons/tokens/eth.svg';
import AvaxIcon from '../assets/icons/tokens/avax.svg';
import USDCIcon from '../assets/icons/tokens/usdc.svg';
import USDTIcon from '../assets/icons/tokens/usdt.svg';

export const noop = () => {};

export const start_and_end = (str, startLen = 5, endLen = 5) => {
  if (str.length > 35) {
    return str.substr(0, startLen) + '...' + str.substr(str.length-endLen, str.length);
  }
  return str;
}

export const MUMBAI = {
  name: "Mumbai",
  value: "Mumbai",
  icon: MaticIcon,
  chainId: 80001,
  rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/-B53i36HC0dwchxm586SE-0uuH3OKD7w",
}

export const GOERLI = {
  name: "Goerli",
  value: "Goerli",
  icon: EthIcon,
  chainId: 5,
  rpcUrl: "https://eth-goerli.alchemyapi.io/v2/R0GW01l8b733ftPYUilOiktyQKAB_-9x",
}

export const RINKEBY = {
  name: "Rinkeby",
  value: "Rinkeby",
  icon: EthIcon,
  chainId: 4,
  rpcUrl: "https://rinkeby.infura.io/v3/1bb06d6c96b94a678f902858aa99025b",
}

export const FUJI = {
  name: "Fuji",
  value: "Fuji",
  icon: AvaxIcon,
  chainId: 43113,
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
}

export const TESTNETS = [MUMBAI, GOERLI, FUJI, RINKEBY];

export const availablePairs = {
  [MUMBAI.chainId]: [GOERLI],
  [GOERLI.chainId]: [MUMBAI],
  [RINKEBY.chainId]: [FUJI],
  [FUJI.chainId]: [RINKEBY],
};

// tokens

export const ETH = {
  name: "ETH",
  value: "ETH",
  icon: EthIcon
}

export const USDC = {
  name: "USDC",
  value: "USDC",
  icon: USDCIcon
}

export const USDT = {
  name: "USDT",
  value: "USDT",
  icon: USDTIcon
}

export const TOKENS = [ETH, USDC, USDT];

export const ETHAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const tokensConfig = {
  ETH: {
    [MUMBAI.chainId]: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
    [GOERLI.chainId]: ETHAddress,
    [RINKEBY.chainId]: ETHAddress,
    [FUJI.chainId]: "",
    decimal: 18,
  },
  USDC: {
    [MUMBAI.chainId]: "0xdA5289fCAAF71d52a80A254da614a192b693e977",
    [GOERLI.chainId]: "0xb5B640E6414b6DeF4FC9B3C1EeF373925effeCcF",
    [RINKEBY.chainId]: "",
    [FUJI.chainId]: "",
    decimal: 6
  },
  USDT: {
    [MUMBAI.chainId]: "0xeaBc4b91d9375796AA4F69cC764A4aB509080A58",
    [GOERLI.chainId]: "0x64ef393b6846114bad71e2cb2ccc3e10736b5716",
    [RINKEBY.chainId]: "0xfab46e002bbf0b4509813474841e0716e6730136",
    [FUJI.chainId]: "0xb4e0f6fef81bdfea0856bb846789985c9cff7e85",
    decimal: 18
  },
}


export const getContract = async (contractAddress, contractABI, web3provider) => {
  return await new ethers.Contract(contractAddress, contractABI, web3provider);
}