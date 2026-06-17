# PairBlockLendingFundRemoval
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/704e13b16c0d3807131b6b753ca6085c1fab3045/contracts/proxy/PairBlockLendingFundRemoval.sol)

**Inherits:**
[AmmalgamPair](/docs/developer-guide/contracts/AmmalgamPair.md)


## Functions
### _initialize

*Reverts during proxy construction so createPair fails, forbidding new pairs under this restricted implementation.*


```solidity
function _initialize() internal pure override;
```

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

### INIT_BLOCKED

```solidity
error INIT_BLOCKED();
```

