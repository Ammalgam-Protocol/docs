# AmmalgamFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/2147358c53f5b1c77eb18db72089539dd0f4e5b9/contracts/factories/AmmalgamFactory.sol)

**Inherits:**
[IAmmalgamFactory](/docs/developer-guide/contracts/interfaces/factories/IAmmalgamFactory.sol/interface.IAmmalgamFactory.md)


## State Variables
### pairBeacon

```solidity
IBeacon public immutable override pairBeacon;
```


### hookRegistry

```solidity
IHookRegistry public immutable hookRegistry;
```


### liquidityTokenFactory

```solidity
ITokenFactory private immutable liquidityTokenFactory;
```


### depositTokenFactory

```solidity
ITokenFactory private immutable depositTokenFactory;
```


### debtTokenFactory

```solidity
ITokenFactory private immutable debtTokenFactory;
```


### liquidityDebtTokenFactory

```solidity
ITokenFactory private immutable liquidityDebtTokenFactory;
```


### saturationAndGeometricTWAPState

```solidity
ISaturationAndGeometricTWAPState public immutable saturationAndGeometricTWAPState;
```


### config

```solidity
IFactoryCallback.TokenFactoryConfig private config;
```


### feeTo

```solidity
address public feeTo;
```


### feeToSetter

```solidity
address public feeToSetter;
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
constructor(
    address _feeToSetter,
    IBeacon _pairBeacon,
    IHookRegistry _hookRegistry,
    ISaturationAndGeometricTWAPState _saturationAndGeometricTWAPState,
    ITokenFactory _liquidityTokenFactory,
    ITokenFactory _depositTokenFactory,
    ITokenFactory _borrowTokenFactory,
    ITokenFactory _liquidityDebtTokenFactory
);
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

### createAllTokens


```solidity
function createAllTokens(
    address pair,
    address tokenX,
    address tokenY
) private returns (IAmmalgamERC20[6] memory tokens);
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

### createPairFromSalt


```solidity
function createPairFromSalt(
    bytes32 salt
) private returns (address pair);
```

### createToken


```solidity
function createToken(
    address tokenFactory,
    address asset,
    ERC20BaseConfig memory _config
) private returns (IAmmalgamERC20);
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

### NewSatProxyIsZeroAddress

```solidity
error NewSatProxyIsZeroAddress();
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

### ERC20TokenFactoryFailed

```solidity
error ERC20TokenFactoryFailed();
```

