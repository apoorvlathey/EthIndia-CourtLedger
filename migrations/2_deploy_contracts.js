var Court = artifacts.require("./Court.sol");

module.exports = function(deployer) {
  deployer.deploy(Court);
};
