const SharedApartment = artifacts.require("SharedApartment");

module.exports = function (deployer) {
  deployer.deploy(SharedApartment);
};