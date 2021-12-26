const { expect, assert } = require('chai');
const { BigNumber } = ethers;

const PUBLIC_KEY =
  '0x613a8d23bd34f7e568ef4eb1f68058e77620e40079e88f705dfb258d7a06a1a0364dbe56cab53faf26137bec044efd0b07eec8703ba4a31c588d9d94c35c8db4';

describe('PublicKeyChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const PublicKeyChallenge = await ethers.getContractFactory('PublicKeyChallenge');
    const challenge = await PublicKeyChallenge.deploy();

    await challenge.authenticate(PUBLIC_KEY);
  });
});
