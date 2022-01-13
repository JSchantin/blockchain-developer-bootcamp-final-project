const SharedApartmentFactory = artifacts.require("SharedApartmentFactory");

module.exports = function (deployer) {
  deployer.deploy(SharedApartmentFactory);
};