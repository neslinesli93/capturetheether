pragma solidity ^0.4.21;

contract DonationChallengeSolver {
    function getDivision(uint256 amount) public view returns (uint256) {
        uint256 scale = 10**18 * 1 ether;
        return amount / scale;
    }
}
