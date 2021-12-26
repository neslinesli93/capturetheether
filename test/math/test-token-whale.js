const { expect } = require('chai');
const { BigNumber } = ethers;

describe('TokenWhaleChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner, alice] = await ethers.getSigners();

    // Deploy challenge
    const TokenWhaleChallenge = await ethers.getContractFactory('TokenWhaleChallenge');
    const challenge = await TokenWhaleChallenge.deploy(owner.address);
    console.log('Challenge deployed');

    // Deploy solver
    const TokenWhaleChallengeSolver = await ethers.getContractFactory('TokenWhaleChallengeSolver');
    const solver = await TokenWhaleChallengeSolver.deploy();
    console.log('Solver deployed');

    await challenge.transfer(solver.address, 400);
    await challenge.approve(solver.address, 600);

    await solver.solveChallenge(challenge.address, 600);

    const result = await challenge.isComplete();
    expect(result).to.be.true;
  });
});
