# PairFrozen
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/5c642daad7bd2c0755b89a3f8c5110f37ee369af/contracts/proxy/PairFrozen.sol)

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
