import MaticIcon from '../assets/icons/tokens/matic.svg';
import EthIcon from '../assets/icons/tokens/eth.svg';
import AvaxIcon from '../assets/icons/tokens/avax.svg';

export const noop = () => {};

export const MUMBAI = {
  name: "Mumbai",
  icon: MaticIcon,
  chainId: 80001,
  rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/-B53i36HC0dwchxm586SE-0uuH3OKD7w",
}

export const GOERLI = {
  name: "Goerli",
  icon: EthIcon,
  chainId: 5,
  rpcUrl: "https://eth-goerli.alchemyapi.io/v2/R0GW01l8b733ftPYUilOiktyQKAB_-9x",
}

export const RINKEBY = {
  name: "Rinkeby",
  icon: EthIcon,
  chainId: 4,
  rpcUrl: "https://rinkeby.infura.io/v3/1bb06d6c96b94a678f902858aa99025b",
}

export const FUJI = {
  name: "Fuji",
  icon: AvaxIcon,
  chainId: 43113,
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
}

export const TESTNETS = [MUMBAI, GOERLI, RINKEBY, FUJI];
