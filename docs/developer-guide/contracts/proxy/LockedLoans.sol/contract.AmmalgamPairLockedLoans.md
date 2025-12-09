# AmmalgamPairLockedLoans
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/9ea650633cbdbae0d2c88f23ddb57a676d0f62c6/contracts/proxy/LockedLoans.sol)

**Inherits:**
[AmmalgamPair](/docs/developer-guide/contracts/AmmalgamPair.sol/contract.AmmalgamPair.md)


## Functions
### constructor


```solidity
constructor();
```

### initialize


```solidity
function initialize() external override reinitializer(2);
```

### borrow


```solidity
function borrow(address, uint256, uint256, bytes calldata) public pure override;
```

### borrowLiquidity


```solidity
function borrowLiquidity(address, uint256, bytes calldata) external pure override returns (uint256, uint256);
```

## Errors
### PairBorrowingFrozen

```solidity
error PairBorrowingFrozen();
```

