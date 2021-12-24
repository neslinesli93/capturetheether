const { ethers } = require('hardhat');

const DEPLOY = false;
const CHALLENGE_ADDRESS = '0x52F6B2eA8537F94C9B795497b44b0d7E1C988A52';
const SOLVER_ADDRESS = '0x74fCc2Dc27c6eb02c43a9292BA529b074d043e1B';

async function main() {
  const GuessTheNewNumberChallengeSolver = await ethers.getContractFactory('GuessTheNewNumberChallengeSolver');

  let solver;
  if (DEPLOY) {
    solver = await GuessTheNewNumberChallengeSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await GuessTheNewNumberChallengeSolver.attach(SOLVER_ADDRESS);
  }

  await solver.solveChallenge(CHALLENGE_ADDRESS, { value: ethers.utils.parseEther('1.0') });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
