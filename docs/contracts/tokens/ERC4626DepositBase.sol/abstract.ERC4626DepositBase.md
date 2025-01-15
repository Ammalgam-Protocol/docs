# ERC4626DepositBase
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC4626DepositBase.sol)

**Inherits:**
ERC4626, [ERC20Base](/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md)


## Functions
### constructor


```solidity
constructor(ERC20BaseConfig memory config, address _asset) ERC20Base(config) ERC4626(IERC20(_asset));
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Base);
```

### _afterTokenTransfer


```solidity
function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Base);
```

### balanceOf


```solidity
function balanceOf(address account) public view virtual override(ERC20Base, IERC20, ERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view virtual override(ERC4626, ERC20Base) returns (uint8);
```

### totalAssets


```solidity
function totalAssets() public view virtual override returns (uint256);
```

