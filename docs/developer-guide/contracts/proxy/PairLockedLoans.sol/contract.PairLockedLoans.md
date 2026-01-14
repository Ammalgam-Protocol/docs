# PairLockedLoans
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/78757f8a0ce2219e96389fd2347e05df5d8691e4/contracts/proxy/PairLockedLoans.sol)

**Inherits:**
[AmmalgamPair](/docs/developer-guide/contracts/AmmalgamPair.sol/contract.AmmalgamPair.md)


## Functions
### borrow


```solidity
function borrow(address, uint256, uint256, bytes calldata) public pure override;
```

### borrowLiquidity


```solidity
function borrowLiquidity(address, uint256, bytes calldata) external pure override returns (uint256, uint256);
```

### withdraw


```solidity
function withdraw(
    address
) external pure override;
```

### burn


```solidity
function burn(
    address
) external pure override returns (uint256, uint256);
```

## Errors
### BORROW_LOCKED

```solidity
error BORROW_LOCKED();
```

### WITHDRAW_LOCKED

```solidity
error WITHDRAW_LOCKED();
```

### BURN_LOCKED

```solidity
error BURN_LOCKED();
```

