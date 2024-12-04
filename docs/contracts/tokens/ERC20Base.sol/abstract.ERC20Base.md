# ERC20Base
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC20Base.sol)

**Inherits:**
ERC20Pods, Ownable, ERC20Permit, [IAmmalgamERC20](/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md)


## State Variables
### pair

```solidity
ITransferValidator public immutable pair;
```


### tokenType

```solidity
uint8 public immutable tokenType;
```


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20(config.name, config.symbol) ERC20Pods(10, 500_000) ERC20Permit(config.name);
```

### ownerMint


```solidity
function ownerMint(address sender, address to, uint256 assets, uint256 shares) public virtual onlyOwner;
```

### ownerBurn


```solidity
function ownerBurn(address sender, address onBehalfOf, uint256 shares) public virtual onlyOwner returns (uint256);
```

### balanceOf


```solidity
function balanceOf(address account) public view virtual override(ERC20, ERC20Pods, IERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view virtual override(ERC20, IERC20Metadata) returns (uint8);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(address from, address to, uint256 shares) internal virtual override;
```

### _afterTokenTransfer


```solidity
function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Pods);
```

### _validateSolvency


```solidity
function _validateSolvency(
    uint8 _tokenType,
    address from,
    uint256 sharesSentIn,
    uint256 fromBalanceOfShares
) internal;
```

