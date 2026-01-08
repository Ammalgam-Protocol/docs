# PairBlockAllTransfers
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/5d18f8dbce5dfd269fee5cbf7ff5d5ec6c7da584/contracts/proxy/PairBlockAllTransfers.sol)

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
function liquidate(
    address,
    address,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256
) public pure override;
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

