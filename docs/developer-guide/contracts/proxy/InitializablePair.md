# InitializablePair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2ed0f746da008769436bb8eab6619a109a032f9/contracts/proxy/PairBeaconProxy.sol)

**Inherits:**
[IPairInitializable](/docs/developer-guide/contracts/proxy/IPairInitializable.md), Initializable


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
