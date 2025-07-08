# NewTokensFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/d1df5df9e4b968d0d06a1d2d00a0120c1be82e15/contracts/factories/NewTokensFactory.sol)

**Inherits:**
[INewTokensFactory](/docs/developer-guide/contracts/interfaces/factories/INewTokensFactory.sol/interface.INewTokensFactory.md)


## State Variables
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


## Functions
### constructor


```solidity
constructor(
    ITokenFactory _liquidityTokenFactory,
    ITokenFactory _depositTokenFactory,
    ITokenFactory _borrowTokenFactory,
    ITokenFactory _liquidityDebtTokenFactory
);
```

### createAllTokens


```solidity
function createAllTokens(
    address pair,
    address pluginRegistry,
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
error ERC20TokenFactoryFailed();
```

