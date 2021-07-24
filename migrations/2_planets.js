const PlanetReact = artifacts.require("PlanetReact");
//const PlanetERC20 = artifacts.require("PlanetERC20");

module.exports = function (deployer) {
  deployer.deploy(PlanetReact);
}

/*
module.exports = function (deployer) {
  deployer.deploy(PlanetERC20);
};
*/
