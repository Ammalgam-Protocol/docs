# AmmalgamPairLockedLoans
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/714a6abe39ed88de6e42d84043a3067d73ac6e8d/contracts/proxy/LockedLoans.sol)

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

