# PairLockedLoans
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2ed0f746da008769436bb8eab6619a109a032f9/contracts/proxy/PairLockedLoans.sol)

**Inherits:**
[AmmalgamPair](/docs/developer-guide/contracts/AmmalgamPair.md)


## Functions
### _initialize

*Reverts during proxy construction so createPair cannot deploy new pairs using this restricted implementation.*


```solidity
function _initialize() internal pure override;
```

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

### INIT_LOCKED

```solidity
error INIT_LOCKED();
```

