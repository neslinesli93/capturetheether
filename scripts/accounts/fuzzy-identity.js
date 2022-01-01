const { ethers } = require('hardhat');

const CHALLENGE_ADDRESS = '0x105F64911958E85071b5DCe36B5835A5edB5bB08';

const DEPLOY = false;
const SOLVER_ADDRESS = '0x47726EB64bFf5747E13790235263fE2812883657';

const FIND_SALT = FALSE;
const SALT = '0x000000000000000000000000000000000000000000000000000000000008260f';

const BYTECODE =
  '0x608060405234801561001057600080fd5b506101a0806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100515780631c0f968314610084575b600080fd5b34801561005d57600080fd5b506100666100c7565b60405180826000191660001916815260200191505060405180910390f35b34801561009057600080fd5b506100c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100ef565b005b60007f736d617278000000000000000000000000000000000000000000000000000000905090565b60008190508073ffffffffffffffffffffffffffffffffffffffff1663380c7a676040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b15801561015857600080fd5b505af115801561016c573d6000803e3d6000fd5b5050505050505600a165627a7a72305820c22fd72e5e3af60fdcb3ec92f9567ec5b2108844705fdd777516d8156cd16f670029';

const HASHED_BYTECODE = ethers.utils.keccak256(BYTECODE).replace('0x', '');

async function main() {
  const FuzzyIdentityChallengeSolverDeployer = await ethers.getContractFactory('FuzzyIdentityChallengeSolverDeployer');

  // Step 1: deploy
  let solver;
  if (DEPLOY) {
    solver = await FuzzyIdentityChallengeSolverDeployer.deploy();
    await solver.deployed();
    console.log(`Solver address: ${solver.address}`);
  } else {
    solver = await FuzzyIdentityChallengeSolverDeployer.attach(SOLVER_ADDRESS);
  }

  // Step 2: find salt
  let salt;
  if (FIND_SALT) {
    // Address creation formula:
    // keccak256(0xff ++ deployingAddr ++ salt ++ keccak256(bytecode))[12:]
    const prefix = `0xff${SOLVER_ADDRESS.replace('0x', '')}`;
    for (let i = 0; i < 100000000; i++) {
      const salt = i.toString(16).padStart(64, '0');
      const finalAddress = ethers.utils.keccak256(`${prefix}${salt}${HASHED_BYTECODE}`).substring(26);
      console.log(`Using salt ${salt} will deploy at ${finalAddress}`);
      if (finalAddress.includes('badc0de')) {
        console.log('Found!');
        break;
      }
    }
  } else {
    salt = SALT;
  }

  // Step 3: deploy the solver and complete the challenge
  await solver.deploySolver(SALT);
  const solverAddress = await solver.solver();

  const FuzzyIdentityChallengeSolver = await ethers.getContractFactory('FuzzyIdentityChallengeSolver');
  const finalSolver = await FuzzyIdentityChallengeSolver.attach(solverAddress);
  await finalSolver.solveChallenge(CHALLENGE_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
