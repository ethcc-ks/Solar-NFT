const NFTPlanet = artifacts.require("./NFTPlanet.sol");
//const PlanetERC20 = artifacts.require("PlanetERC20");

module.exports = function (deployer) {
    deployer.deploy(NFTPlanet);
}

