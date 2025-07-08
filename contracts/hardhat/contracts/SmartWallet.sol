// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./GuardianBot.sol";

contract GuardianWallet is Ownable, ReentrancyGuard {
    GuardianBot public guardianBot;
    
    bool public firewallEnabled = true;
    uint256 public riskThreshold = 70;
    
    event TransactionExecuted(address indexed to, uint256 value, bytes data);
    event TransactionBlocked(address indexed to, uint256 value, string reason);
    event FirewallToggled(bool enabled);
    event RiskThresholdUpdated(uint256 newThreshold);

    modifier onlyOwnerOrGuardian() {
        require(msg.sender == owner() || address(guardianBot) == msg.sender, "Not authorized");
        _;
    }

    constructor(address _guardianBot) Ownable(msg.sender) {
        guardianBot = GuardianBot(_guardianBot);
    }

    function executeTransaction(
        address to,
        uint256 value,
        bytes calldata data
    ) external onlyOwner nonReentrant {
        if (firewallEnabled) {
            (uint256 riskScore, string memory recommendation, bool shouldBlock) = 
                guardianBot.analyzeTransaction(to, data, value);
            
            if (shouldBlock || riskScore >= riskThreshold) {
                emit TransactionBlocked(to, value, recommendation);
                revert("Transaction blocked by Guardian");
            }
        }

        (bool success, ) = to.call{value: value}(data);
        require(success, "Transaction failed");
        
        emit TransactionExecuted(to, value, data);
    }

    function toggleFirewall() external onlyOwner {
        firewallEnabled = !firewallEnabled;
        emit FirewallToggled(firewallEnabled);
    }

    function setRiskThreshold(uint256 _threshold) external onlyOwner {
        require(_threshold <= 100, "Threshold must be <= 100");
        riskThreshold = _threshold;
        emit RiskThresholdUpdated(_threshold);
    }

    receive() external payable {}
}