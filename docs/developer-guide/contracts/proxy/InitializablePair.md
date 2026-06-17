# InitializablePair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/41405bd809b3ec5c7cb39be8890c13bee26ba0b6/contracts/proxy/PairBeaconProxy.sol)

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

