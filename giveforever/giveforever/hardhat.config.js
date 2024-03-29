/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.17",

  networks: {
    goerli :  {
      url : `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts : [process.env.USER1_PRIVATE_KEY,],

    },
    manniet : {
      url : `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts : [process.env.USER1_PRIVATE_KEY,],

    },
    local : {
      url : `http://127.0.0.1:8545`,
      accounts : [process.env.USER1_PRIVATE_KEY,],
    }
  }
};
