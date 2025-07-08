# ERC20Base
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/tokens/ERC20Base.sol)

**Inherits:**
ERC20Plugins, Ownable, ERC20Permit, [IAmmalgamERC20](/docs/developer-guide/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md)


## State Variables
### pair

```solidity
ITransferValidator public immutable pair;
```


### pluginRegistry

```solidity
IPluginRegistry private immutable pluginRegistry;
```


### tokenType

```solidity
uint256 public immutable tokenType;
```


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20(config.name, config.symbol) ERC20Plugins(10, 500_000) ERC20Permit(config.name) Ownable(config.pair);
```

### nonces


```solidity
function nonces(
    address owner
) public view virtual override(ERC20Permit, IERC20Permit) returns (uint256);
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
function balanceOf(
    address account
) public view virtual override(ERC20, ERC20Plugins, IERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view virtual override(ERC20, IERC20Metadata) returns (uint8);
```

### _update


```solidity
function _update(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Plugins);
```

### addPlugin


```solidity
function addPlugin(
    address plugin
) public override;
```

