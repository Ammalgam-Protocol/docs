# AmmalgamFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/factories/AmmalgamFactory.sol)

**Inherits:**
[IAmmalgamFactory](/contracts/interfaces/factories/IAmmalgamFactory.sol/interface.IAmmalgamFactory.md), [IFactoryCallback](/contracts/interfaces/factories/IFactoryCallback.sol/interface.IFactoryCallback.md)


## State Variables
### tokenFactory

```solidity
address public immutable tokenFactory;
```


### pairFactory

```solidity
address public immutable pairFactory;
```


### pluginRegistry

```solidity
address public immutable pluginRegistry;
```


### feeTo

```solidity
address public feeTo;
```


### feeToSetter

```solidity
address public feeToSetter;
```


### config

```solidity
IFactoryCallback.TokenFactoryConfig private config;
```


### getPair

```solidity
mapping(address => mapping(address => address)) public getPair;
```


### allPairs

```solidity
address[] public allPairs;
```


## Functions
### onlyFeeToSetter


```solidity
modifier onlyFeeToSetter();
```

### constructor


```solidity
constructor(address _feeToSetter, address _tokenFactory, address _pairFactory, address _pluginRegistry);
```

### allPairsLength


```solidity
function allPairsLength() external view returns (uint256);
```

### createPair


```solidity
function createPair(address tokenA, address tokenB) external returns (address pair);
```

### getConfig


```solidity
function getConfig() private view returns (IFactoryCallback.TokenFactoryConfig memory);
```

### generateTokensWithinFactory


```solidity
function generateTokensWithinFactory() external returns (IERC20, IERC20, IAmmalgamERC20[6] memory);
```

### setFeeTo


```solidity
function setFeeTo(
    address newFeeTo
) external onlyFeeToSetter;
```

### setFeeToSetter


```solidity
function setFeeToSetter(
    address newFeeToSetter
) external onlyFeeToSetter;
```

## Events
### NewFeeTo

```solidity
event NewFeeTo(address indexed feeTo);
```

### NewFeeToSetter

```solidity
event NewFeeToSetter(address indexed feeToSetter);
```

## Errors
### IdenticalAddresses

```solidity
error IdenticalAddresses();
```

### ZeroAddress

```solidity
error ZeroAddress();
```

### FeeToIsZeroAddress

```solidity
error FeeToIsZeroAddress();
```

### FeeToSetterIsZeroAddress

```solidity
error FeeToSetterIsZeroAddress();
```

### PairExists

```solidity
error PairExists();
```

### BytecodeLengthZero

```solidity
error BytecodeLengthZero();
```

### FailedOnDeploy

```solidity
error FailedOnDeploy();
```

### Forbidden

```solidity
error Forbidden();
```

### NewTokensFailed

```solidity
error NewTokensFailed();
```

