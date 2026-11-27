# PairFrozen
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/5137887ca618a782644b16aaae53310f175487d9/contracts/proxy/PairFrozen.sol)

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

