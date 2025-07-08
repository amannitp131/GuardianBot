// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract GuardianBot is Ownable, ReentrancyGuard, Pausable {
    struct ContractRisk {
        uint256 riskScore;
        bool isBlacklisted;
        uint256 lastUpdated;
        string[] vulnerabilities;
    }

    struct TransactionAnalysis {
        address target;
        uint256 riskScore;
        string recommendation;
        bool isApproved;
        uint256 timestamp;
    }

    mapping(address => ContractRisk) public contractRisks;
    mapping(bytes32 => TransactionAnalysis) public transactionAnalyses;
    mapping(address => bool) public authorizedAnalyzers;

    event ContractAnalyzed(address indexed contractAddress, uint256 riskScore);
    event TransactionBlocked(address indexed user, address indexed target, string reason);
    event TransactionApproved(address indexed user, address indexed target);
    event RiskScoreUpdated(address indexed contractAddress, uint256 oldScore, uint256 newScore);

    modifier onlyAuthorized() {
        require(authorizedAnalyzers[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor() Ownable(msg.sender) {
        authorizedAnalyzers[msg.sender] = true;
    }

    function analyzeContract(
        address contractAddress,
        uint256 riskScore,
        string[] memory vulnerabilities
    ) external onlyAuthorized {
        require(contractAddress != address(0), "Invalid contract address");
        require(riskScore <= 100, "Risk score must be <= 100");

        ContractRisk storage risk = contractRisks[contractAddress];
        uint256 oldScore = risk.riskScore;
        
        risk.riskScore = riskScore;
        risk.lastUpdated = block.timestamp;
        risk.vulnerabilities = vulnerabilities;
        risk.isBlacklisted = riskScore >= 80;

        emit ContractAnalyzed(contractAddress, riskScore);
        emit RiskScoreUpdated(contractAddress, oldScore, riskScore);
    }

    function analyzeTransaction(
        address target,
        bytes memory data,
        uint256 value
    ) external view returns (uint256 riskScore, string memory recommendation, bool shouldBlock) {
        ContractRisk memory risk = contractRisks[target];
        
        riskScore = risk.riskScore;
        
        // Additional risk factors
        if (value > 1 ether) riskScore += 10;
        if (data.length > 1000) riskScore += 5;
        if (risk.isBlacklisted) riskScore = 100;

        if (riskScore >= 80) {
            recommendation = "HIGH RISK: Do not proceed. Contract is flagged as dangerous.";
            shouldBlock = true;
        } else if (riskScore >= 50) {
            recommendation = "MEDIUM RISK: Proceed with caution. Review transaction details.";
            shouldBlock = false;
        } else {
            recommendation = "LOW RISK: Transaction appears safe to proceed.";
            shouldBlock = false;
        }
    }

    function blacklistContract(address contractAddress) external onlyAuthorized {
        contractRisks[contractAddress].isBlacklisted = true;
        contractRisks[contractAddress].riskScore = 100;
        emit ContractAnalyzed(contractAddress, 100);
    }

    function authorizeAnalyzer(address analyzer) external onlyOwner {
        authorizedAnalyzers[analyzer] = true;
    }

    function revokeAnalyzer(address analyzer) external onlyOwner {
        authorizedAnalyzers[analyzer] = false;
    }

    function getContractRisk(address contractAddress) external view returns (
        uint256 riskScore,
        bool isBlacklisted,
        uint256 lastUpdated,
        string[] memory vulnerabilities
    ) {
        ContractRisk memory risk = contractRisks[contractAddress];
        return (risk.riskScore, risk.isBlacklisted, risk.lastUpdated, risk.vulnerabilities);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}