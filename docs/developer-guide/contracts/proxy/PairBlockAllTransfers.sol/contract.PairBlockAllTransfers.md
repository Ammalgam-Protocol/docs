# PairBlockAllTransfers
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/bf8d65327c2855dc6ef8eec9e222a72a334011ee/contracts/proxy/PairBlockAllTransfers.sol)

**Inherits:**
[AmmalgamPair](/docs/developer-guide/contracts/AmmalgamPair.sol/contract.AmmalgamPair.md)


## Functions
### withdraw


```solidity
function withdraw(
    address
) public pure override;
```

### burn


```solidity
function burn(
    address
) public pure override returns (uint256, uint256);
```

### borrow


```solidity
function borrow(address, uint256, uint256, bytes calldata) public pure override;
```

### borrowLiquidity


```solidity
function borrowLiquidity(address, uint256, bytes calldata) external pure override returns (uint256, uint256);
```

### liquidate


```solidity
function liquidate(address, address, uint256, uint256, uint256, uint256, uint256, uint256) public pure override;
```

## Errors
### WITHDRAW_BLOCKED

```solidity
error WITHDRAW_BLOCKED();
```

### BURN_BLOCKED

```solidity
error BURN_BLOCKED();
```

### BORROW_BLOCKED

```solidity
error BORROW_BLOCKED();
```

### LIQUIDATION_BLOCKED

```solidity
error LIQUIDATION_BLOCKED();
```

