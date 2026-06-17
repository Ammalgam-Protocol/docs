# PairFrozen
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/1592c5477df75ce2f8b168a6221f7a5e154d286b/contracts/proxy/PairFrozen.sol)

**Inherits:**
[InitializablePair](/docs/developer-guide/contracts/proxy/InitializablePair.md)


## Functions
### _initialize

*Reverts during proxy construction so createPair fails instead of poisoning the factory slot.*


```solidity
function _initialize() internal pure override;
```

### fallback


```solidity
fallback() external;
```

## Errors
### FROZEN

```solidity
error FROZEN();
```

