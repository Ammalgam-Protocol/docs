# PairFrozen
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/609f8dd84eb0f59fc67f71da5364b9c59ba343f4/contracts/proxy/PairFrozen.sol)

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
