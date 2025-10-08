# NewTokensFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/177484d49d90b45a40c5e8affa7fab5af8d23a1a/contracts/factories/NewTokensFactory.sol)

**Inherits:**
[INewTokensFactory](/home/runner/work/core-v1/core-v1/core-v1/docs/src/contracts/interfaces/factories/INewTokensFactory.sol/interface.INewTokensFactory.md)


## State Variables
### liquidityTokenFactory

```solidity
ITokenFactory private immutable liquidityTokenFactory
```


### depositTokenFactory

```solidity
ITokenFactory private immutable depositTokenFactory
```


### debtTokenFactory

```solidity
ITokenFactory private immutable debtTokenFactory
```


### liquidityDebtTokenFactory

```solidity
ITokenFactory private immutable liquidityDebtTokenFactory
```


## Functions
### constructor


```solidity
constructor(
    ITokenFactory _liquidityTokenFactory,
    ITokenFactory _depositTokenFactory,
    ITokenFactory _borrowTokenFactory,
    ITokenFactory _liquidityDebtTokenFactory
) ;
```

### createAllTokens


```solidity
function createAllTokens(
    address pair,
    address hookRegistry,
    address tokenX,
    address tokenY
) external returns (IAmmalgamERC20[6] memory tokens);
```

### createToken


```solidity
function createToken(
    address tokenFactory,
    address asset,
    ERC20BaseConfig memory config
) private returns (IAmmalgamERC20);
```

## Errors
### ERC20TokenFactoryFailed

```solidity
error ERC20TokenFactoryFailed()
```

