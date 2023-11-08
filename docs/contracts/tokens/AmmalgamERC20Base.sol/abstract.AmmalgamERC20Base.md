# AmmalgamERC20Base
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/55eccbeef5b0ef289c29a5edda7e20c492c25998/contracts/tokens/AmmalgamERC20Base.sol)

**Inherits:**
ERC20Pods, Ownable, ERC20Permit, [IAmmalgamERC20](/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md)


## State Variables
### pair

```solidity
ITransferValidator public immutable pair;
```


### tokenType

```solidity
TokenType public immutable tokenType;
```


## Functions
### constructor


```solidity
constructor(
    string memory name,
    string memory symbol,
    TokenType _tokenType
) ERC20(name, symbol) ERC20Pods(10, 500_000) ERC20Permit(name);
```

### mint


```solidity
function mint(address to, uint256 amount) public onlyOwner;
```

### burn


```solidity
function burn(address to, uint256 amount) public onlyOwner;
```

### _afterTokenTransfer


```solidity
function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20Pods, ERC20);
```

### balanceOf


```solidity
function balanceOf(address account) public view virtual override(ERC20Pods, IERC20, ERC20) returns (uint256);
```

