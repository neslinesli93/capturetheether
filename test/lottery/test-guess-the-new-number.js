const { expect } = require('chai');

describe('GuessTheNewNumberChallengeSolver', function () {
  it('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const GuessTheNewNumberChallenge = await ethers.getContractFactory('GuessTheNewNumberChallenge');
    const challenge = await GuessTheNewNumberChallenge.deploy({ value: ethers.utils.parseEther('1.0') });
    console.log('Challenge deployed');

    // Deploy solver
    const GuessTheNewNumberChallengeSolver = await ethers.getContractFactory('GuessTheNewNumberChallengeSolver');
    const solver = await GuessTheNewNumberChallengeSolver.deploy();
    console.log('Solver deployed');

    await solver.solveChallenge(challenge.address, { value: ethers.utils.parseEther('1.0') });
  });
});
