require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'ropsten',
  solidity: {
    compilers: [
      {
        version: '0.4.24',
      },
      {
        version: '0.8.6',
      },
    ],
  },
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/49cec425776345b184dff28cd3406820',
      accounts: [ROPSTEN_PRIVATE_KEY],
      gas: 4712388,
    },
  },
};
