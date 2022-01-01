pragma solidity ^0.4.21;

interface IFuzzyIdentityChallenge {
    function authenticate() public;
}

contract FuzzyIdentityChallengeSolver {
    function name() public view returns (bytes32) {
        return bytes32('smarx');
    }

    function solveChallenge(address challenge) public {
        IFuzzyIdentityChallenge instance = IFuzzyIdentityChallenge(challenge);
        instance.authenticate();
    }
}
