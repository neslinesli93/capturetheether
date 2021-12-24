const { ethers } = require("hardhat");

async function main() {
  const GuessTheSecretNumberChallenge = await ethers.getContractFactory(
    "GuessTheSecretNumberChallenge"
  );
  const contract = await GuessTheSecretNumberChallenge.attach(
    "0x09926377cc8F7121c387b23CA276be5c8204e927"
  );

  let n = null;
  for (let i = 0; i < 2 ** 8; i++) {
    if (
      ethers.utils.keccak256(i) ===
      "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365"
    ) {
      console.log(`Found number: ${i}`);
      n = i;
      break;
    }
  }

  if (n === null) {
    throw "Number not found";
  }

  await contract.guess(n, { value: ethers.utils.parseEther("1.0") });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
