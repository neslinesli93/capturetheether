const { ethers } = require("hardhat");

async function main() {
  const CaptureTheEther = await ethers.getContractFactory("CaptureTheEther");
  const contract = await CaptureTheEther.attach(
    "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee"
  );

  const nick = ethers.utils.formatBytes32String("N3S");
  await contract.setNickname(nick);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
