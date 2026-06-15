# InitializablePair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/ec51218155bd2f8c1e5dc761ed4728baae81a01b/contracts/proxy/PairBeaconProxy.sol)

**Inherits:**
[IPairInitializable](/docs/developer-guide/contracts/proxy/PairBeaconProxy.sol/interface.IPairInitializable.md), Initializable


## Functions
### constructor


```solidity
constructor();
```

### initialize


```solidity
function initialize() external initializer;
```

### _initialize


```solidity
function _initialize() internal virtual;
```

### onlyProxySelfCall

Allows only the proxy-controlled self-call used by beacon upgrade reinitialization.


```solidity
modifier onlyProxySelfCall();
```

### reInitialize

Reinitializes the pair only when the proxy calls itself after a beacon implementation upgrade.


```solidity
function reInitialize() external onlyProxySelfCall reinitializer(_getInitializedVersion() + 1);
```

### _reInitialize


```solidity
function _reInitialize() internal virtual;
```

## Errors
### AccessDenied

```solidity
error AccessDenied();
```

