const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://kovan.infura.io/v3/d6567ea751014dc6b2426e02cd9ac714"
        );
      },
      network_id: 42,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
