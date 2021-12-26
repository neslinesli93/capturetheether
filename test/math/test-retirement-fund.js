const { expect } = require('chai');
const { BigNumber } = ethers;

describe('RetirementFundChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner, alice] = await ethers.getSigners();

    // Deploy challenge
    const RetirementFundChallenge = await ethers.getContractFactory('RetirementFundChallenge');
    const challenge = await RetirementFundChallenge.deploy(alice.address, { value: ethers.utils.parseEther('1.0') });
    console.log('Challenge deployed');

    // Deploy solver
    const RetirementFundChallengeSolver = await ethers.getContractFactory('RetirementFundChallengeSolver');
    const solver = await RetirementFundChallengeSolver.deploy();
    console.log('Solver deployed');

    await owner.sendTransaction({
      to: solver.address,
      value: 1,
    });
    await solver.solveChallenge(challenge.address);

    await challenge.connect(alice).collectPenalty();

    const result = await challenge.isComplete();
    expect(result).to.be.true;
  });
});
