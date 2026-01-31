# InitializablePair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/199cb86306d921ce989cfb1182c36cddd344d591/contracts/proxy/PairBeaconProxy.sol)

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

