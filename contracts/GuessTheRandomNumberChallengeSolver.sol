pragma solidity ^0.4.21;

contract GuessTheRandomNumberChallengeSolver {
    function getAnswer(uint256 blockNumber, uint256 timestamp)
        public
        view
        returns (uint8)
    {
        return uint8(keccak256(block.blockhash(blockNumber), timestamp));
    }
}
