const { expect } = require("chai");

describe("GuessTheRandomNumberChallengeSolver", function () {
  it("should log the answer", async function () {
    const [owner] = await ethers.getSigners();

    const GuessTheRandomNumberChallengeSolver = await ethers.getContractFactory(
      "GuessTheRandomNumberChallengeSolver"
    );

    const contract = await GuessTheRandomNumberChallengeSolver.deploy();
    await contract.getAnswer(0, 0);
  });
});
