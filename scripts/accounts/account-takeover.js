const { ethers } = require('hardhat');

async function main() {
  const [owner, attacker] = await ethers.getSigners();

  const tx1 = await ethers.provider.getTransaction(
    '0xd79fc80e7b787802602f3317b7fe67765c14a7d40c3e0dcb266e63657f881396'
  );

  const tx1Output = {
    hash: '0xd79fc80e7b787802602f3317b7fe67765c14a7d40c3e0dcb266e63657f881396',
    type: 0,
    accessList: null,
    blockHash: '0x0515b2216fa8012618c330bff363d7a49876f4b0f05752b17b01597b5527a604',
    blockNumber: 3015063,
    transactionIndex: 9,
    confirmations: 8699932,
    from: '0x6B477781b0e68031109f21887e6B5afEAaEB002b',
    to: '0x92b28647Ae1F3264661f72fb2eB9625A89D88A31',
    r: '0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166',
    s: '0x7724cedeb923f374bef4e05c97426a918123cc4fec7b07903839f12517e1b3c8',
    v: 41,
    creates: null,
    chainId: 3,
  };

  const tx2 = await ethers.provider.getTransaction(
    '0x061bf0b4b5fdb64ac475795e9bc5a3978f985919ce6747ce2cfbbcaccaf51009'
  );

  const tx2Output = {
    hash: '0x061bf0b4b5fdb64ac475795e9bc5a3978f985919ce6747ce2cfbbcaccaf51009',
    type: 0,
    accessList: null,
    blockHash: '0xe23306ce25e2e0329ed148f17e16b3b566b2b42cb86bf4ece5b41a0fee30a497',
    blockNumber: 3015068,
    transactionIndex: 17,
    confirmations: 8699937,
    from: '0x6B477781b0e68031109f21887e6B5afEAaEB002b',
    to: '0x92b28647Ae1F3264661f72fb2eB9625A89D88A31',
    r: '0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166',
    s: '0x2bbd9c2a6285c2b43e728b17bda36a81653dd5f4612a2e0aefdb48043c5108de',
    v: 41,
    creates: null,
    chainId: 3,
  };

  const AccountTakeoverChallenge = await ethers.getContractFactory('AccountTakeoverChallenge');
  const contract = await AccountTakeoverChallenge.attach('0x7De6e3bCc2ed5423E8252dE97EfDD5D84a30AEC5');

  await contract.connect(attacker).authenticate();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
