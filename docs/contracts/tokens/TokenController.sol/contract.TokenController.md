# TokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/TokenController.sol)

**Inherits:**
[ITokenController](/contracts/interfaces/tokens/ITokenController.sol/interface.ITokenController.md)

*Wrapper of the ERC20 tokens that has some functionality similar to the ERC1155.*


## State Variables
### tokenX

```solidity
IERC20 private immutable tokenX;
```


### tokenY

```solidity
IERC20 private immutable tokenY;
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

### underlyingTokens


```solidity
function underlyingTokens() public view override returns (IERC20, IERC20);
```

### tokens


```solidity
function tokens(uint8 tokenType) public view override returns (IAmmalgamERC20);
```

### balanceOf


```solidity
function balanceOf(address account, uint8 tokenType) internal view returns (uint256);
```

### mintId


```solidity
function mintId(uint8 tokenType, address sender, address to, uint256 assets, uint256 shares) internal;
```

### burnId


```solidity
function burnId(uint8 tokenType, address sender, address from, uint256 assets, uint256 shares) internal;
```

## Errors
### TokenCreationFailure

```solidity
error TokenCreationFailure();
```

