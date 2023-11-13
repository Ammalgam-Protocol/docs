# AmmalgamFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6642ecf302d69320796403bcb5da0c96165f00bd/contracts/factories/AmmalgamFactory.sol)

**Inherits:**
[IAmmalgamFactory](/contracts/interfaces/factories/IAmmalgamFactory.sol/interface.IAmmalgamFactory.md), [IAmmalgamFactoryCallback](/contracts/interfaces/factories/IAmmalgamFactoryCallback.sol/interface.IAmmalgamFactoryCallback.md)


## State Variables
### tokenFactory

```solidity
address public immutable tokenFactory;
```


### feeTo

```solidity
address public feeTo;
```


### feeToSetter

```solidity
address public feeToSetter;
```


### pairBytes

```solidity
bytes private pairBytes;
```


### config

```solidity
IAmmalgamFactoryCallback.TokenFactoryConfig private config;
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
constructor(address _feeToSetter, address _tokenFactory, bytes memory _pairBytes);
```

### allPairsLength


```solidity
function allPairsLength() external view returns (uint256);
```

### createPair


```solidity
function createPair(address tokenA, address tokenB) external returns (address pair);
```

### getTokenFactoryConfig


```solidity
function getTokenFactoryConfig() external view override returns (IAmmalgamFactoryCallback.TokenFactoryConfig memory);
```

### setFeeTo


```solidity
function setFeeTo(address newFeeTo) external onlyFeeToSetter;
```

### setFeeToSetter


```solidity
function setFeeToSetter(address newFeeToSetter) external onlyFeeToSetter;
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
### AmmalgamIdenticalAddresses

```solidity
error AmmalgamIdenticalAddresses();
```

### AmmalgamZeroAddress

```solidity
error AmmalgamZeroAddress();
```

### AmmalgamFeeToIsZeroAddress

```solidity
error AmmalgamFeeToIsZeroAddress();
```

### AmmalgamFeeToSetterIsZeroAddress

```solidity
error AmmalgamFeeToSetterIsZeroAddress();
```

### AmmalgamPairExists

```solidity
error AmmalgamPairExists();
```

### AmmalgamBytecodeLengthZero

```solidity
error AmmalgamBytecodeLengthZero();
```

### AmmalgamFailedOnDeploy

```solidity
error AmmalgamFailedOnDeploy();
```

### AmmalgamForbidden

```solidity
error AmmalgamForbidden();
```

