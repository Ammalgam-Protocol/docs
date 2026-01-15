# InitializablePair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6d77b4a84ad340f4b034093511ca1c507d2d15a0/contracts/proxy/PairBeaconProxy.sol)

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

### reInitialize


```solidity
function reInitialize() external reinitializer(_getInitializedVersion() + 1);
```

### _reInitialize


```solidity
function _reInitialize() internal virtual;
```

