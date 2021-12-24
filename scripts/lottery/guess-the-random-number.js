const { ethers } = require('hardhat');

const DEPLOY = false;
const BLOCK_NUMBER = 11682365 - 1;

async function main() {
  const GuessTheRandomNumberChallenge = await ethers.getContractFactory('GuessTheRandomNumberChallenge');
  const contract = await GuessTheRandomNumberChallenge.attach('0xf2a3E4cf04DcCd1B785F4907aE81902CF95D32F6');

  // First part: get block data
  const block = await ethers.provider.getBlock(BLOCK_NUMBER + 1);

  // // Second part: call other contract to get answer
  const GuessTheRandomNumberChallengeSolver = await ethers.getContractFactory('GuessTheRandomNumberChallengeSolver');
  let solver;
  if (DEPLOY) {
    solver = await GuessTheRandomNumberChallengeSolver.deploy();
  } else {
    solver = await GuessTheRandomNumberChallengeSolver.attach('0xcca2037efea6233ccec00a4b0e703963e708cd11');
  }

  const answer = await solver.getAnswer(BLOCK_NUMBER, block.timestamp);
  console.log(answer);

  // Third part: 🐔
  await contract.guess(answer, { value: ethers.utils.parseEther('1.0') });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
