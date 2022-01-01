const { assert } = require('chai');

const SALT = '0x00000000000000000000000000000000000000000000000000000000004a95af';
const ADDRESS_VANITY_STRING = 'c1a0';

describe('FuzzyIdentityChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const FuzzyIdentityChallenge = await ethers.getContractFactory('FuzzyIdentityChallenge');
    const challenge = await FuzzyIdentityChallenge.deploy();

    // Deploy solver deployer
    const FuzzyIdentityChallengeSolverDeployer = await ethers.getContractFactory(
      'FuzzyIdentityChallengeSolverDeployer'
    );
    const solverDeployer = await FuzzyIdentityChallengeSolverDeployer.deploy();

    // Using salt 00000000000000000000000000000000000000000000000000000000004a95af will deploy at 2206b1698d8c1a09b3117b6246b1d9a623516698
    await solverDeployer.deploySolver(SALT);
    const address = await solverDeployer.solver();
    assert(address.includes(ADDRESS_VANITY_STRING));
  });
});
