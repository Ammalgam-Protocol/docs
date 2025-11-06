# ERC20Base
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/177484d49d90b45a40c5e8affa7fab5af8d23a1a/contracts/tokens/ERC20Base.sol)

**Inherits:**
ERC20Hooks, Ownable, ERC20Permit, [IAmmalgamERC20](/home/runner/work/core-v1/core-v1/core-v1/docs/src/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md)


## State Variables
### pair

```solidity
ITransferValidator public immutable pair
```


### hookRegistry

```solidity
IHookRegistry private immutable hookRegistry
```


### tokenType

```solidity
uint256 public immutable tokenType
```


### transferPenaltyFromPairToBorrower

```solidity
bool transient transferPenaltyFromPairToBorrower
```


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
)
    ERC20(config.name, config.symbol)
    ERC20Hooks(10, 500_000) // hooksLimit, hookCallGasLimit
    ERC20Permit(config.name)
    Ownable(config.pair);
```

### nonces


```solidity
function nonces(
    address owner
) public view virtual override(ERC20Permit, IERC20Permit) returns (uint256);
```

### ownerMint


```solidity
function ownerMint(
    address sender,
    address to,
    uint256 assets,
    uint256 shares
) public virtual onlyOwner;
```

### ownerTransfer


```solidity
function ownerTransfer(
    address from,
    address to,
    uint256 amount
) public virtual onlyOwner;
```

### balanceOf


```solidity
function balanceOf(
    address account
) public view virtual override(ERC20, ERC20Hooks, IERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view virtual override(ERC20, IERC20Metadata) returns (uint8);
```

### _update


```solidity
function _update(
    address from,
    address to,
    uint256 amount
) internal virtual override(ERC20, ERC20Hooks);
```

### addHook


```solidity
function addHook(
    address hook
) public override;
```

## Errors
### HookIsNotAllowed

```solidity
error HookIsNotAllowed()
```

