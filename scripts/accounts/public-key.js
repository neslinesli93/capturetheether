const { ethers } = require('hardhat');

async function main() {
  const PublicKeyChallenge = await ethers.getContractFactory('PublicKeyChallenge');
  const contract = await PublicKeyChallenge.attach('0x2C0cE6df7377b4Ed59bAE33514c83065743Cc0c4');

  const tx = await ethers.provider.getTransaction('0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb');
  const expandedSig = {
    r: tx.r,
    s: tx.s,
    v: tx.v,
  };
  const signature = ethers.utils.joinSignature(expandedSig);
  const txData = {
    gasPrice: tx.gasPrice,
    gasLimit: tx.gasLimit,
    value: tx.value,
    nonce: tx.nonce,
    data: tx.data,
    chainId: tx.chainId,
    to: tx.to, // you might need to include this if it's a regular tx and not simply a contract deployment
  };
  const rsTx = await ethers.utils.resolveProperties(txData);
  const raw = ethers.utils.serializeTransaction(rsTx); // returns RLP encoded tx
  const msgHash = ethers.utils.keccak256(raw); // as specified by ECDSA
  const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash
  const recoveredPubKey = ethers.utils.recoverPublicKey(msgBytes, signature);
  console.log(recoveredPubKey);
  const recoveredAddress = ethers.utils.recoverAddress(msgBytes, signature);
  console.log(recoveredAddress);

  await contract.authenticate(recoveredPubKey.replace('0x04', '0x'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
