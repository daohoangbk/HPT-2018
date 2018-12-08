var Auction = artifacts.require("Auction");

module.exports = function(deployer) {
  // deployer.deploy(Ratings,['Star Wars', 'Avatar', 'Inception'], {gas: 6700000});
  deployer.deploy(Auction);
};
