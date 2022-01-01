pragma solidity ^0.8.6;

contract FuzzyIdentityChallengeSolverDeployer {
    address public solver;
    bytes contractBytecode =
        hex'608060405234801561001057600080fd5b506101a0806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100515780631c0f968314610084575b600080fd5b34801561005d57600080fd5b506100666100c7565b60405180826000191660001916815260200191505060405180910390f35b34801561009057600080fd5b506100c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100ef565b005b60007f736d617278000000000000000000000000000000000000000000000000000000905090565b60008190508073ffffffffffffffffffffffffffffffffffffffff1663380c7a676040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b15801561015857600080fd5b505af115801561016c573d6000803e3d6000fd5b5050505050505600a165627a7a72305820c22fd72e5e3af60fdcb3ec92f9567ec5b2108844705fdd777516d8156cd16f670029';

    function deploySolver(bytes32 salt) public {
        address addr;
        bytes memory bytecode = contractBytecode;

        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        solver = addr;
    }
}
