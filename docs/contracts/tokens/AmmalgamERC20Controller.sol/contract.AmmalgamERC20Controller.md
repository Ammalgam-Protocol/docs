# AmmalgamERC20Controller
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/tokens/AmmalgamERC20Controller.sol)

**Inherits:**
[IAmmalgamERC20Controller](/contracts/interfaces/tokens/IAmmalgamERC20Controller.sol/interface.IAmmalgamERC20Controller.md)

*Wrapper of the ERC20 tokens that has some functionality similar to the ERC1155.*


## State Variables
### tokenX

```solidity
address public immutable tokenX;
```


### tokenY

```solidity
address public immutable tokenY;
```


### _tokens

```solidity
IAmmalgamERC20[6] private _tokens;
```


## Functions
### constructor


```solidity
constructor();
```

### tokens


```solidity
function tokens(TokenType tokenType) public view override returns (IAmmalgamERC20);
```

### totalSupply


```solidity
function totalSupply(TokenType tokenType) public view override returns (uint256);
```

### balanceOf


```solidity
function balanceOf(address account, TokenType tokenType) public view override returns (uint256);
```

### mintId


```solidity
function mintId(TokenType tokenType, address to, uint256 amount) internal;
```

### burnId


```solidity
function burnId(TokenType tokenType, address from, uint256 amount) internal;
```

## Errors
### AmmalgamNewTokensFailed

```solidity
error AmmalgamNewTokensFailed();
```

