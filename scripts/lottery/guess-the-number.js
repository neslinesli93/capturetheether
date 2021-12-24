const { ethers } = require("hardhat");

async function main() {
  const GuessTheNumberChallenge = await ethers.getContractFactory(
    "GuessTheNumberChallenge"
  );
  const contract = await GuessTheNumberChallenge.attach(
    "0xFacE57Fda2BB8A790cf858b1C92c1EfC9b8A374A"
  );

  await contract.guess(42, { value: ethers.utils.parseEther("1.0") });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
