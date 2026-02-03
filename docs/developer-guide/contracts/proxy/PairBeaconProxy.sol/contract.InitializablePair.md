# InitializablePair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/1cc9b790c0f0942d82915a25875fbc4d4fdeff47/contracts/proxy/PairBeaconProxy.sol)

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

