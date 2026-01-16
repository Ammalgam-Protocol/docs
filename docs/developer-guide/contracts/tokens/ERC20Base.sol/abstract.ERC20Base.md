# ERC20Base
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c5db531d79fc2e0c5f0d1aff3de660f92811c86e/contracts/tokens/ERC20Base.sol)

**Inherits:**
ERC20Hooks, Ownable, ERC20Permit, [IAmmalgamERC20](/docs/developer-guide/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md)


## State Variables
### pair

```solidity
ITransferValidator public immutable pair;
```


### hookRegistry

```solidity
IHookRegistry private immutable hookRegistry;
```


### tokenType

```solidity
uint256 public immutable tokenType;
```


### ownerTransferSkipValidation
This boolean is reserved for moving collateral to liquidators. And we reuse it
to transfer debt from the pair to a borrower. Since the borrower might already be in trouble
if this is called during a liquidation, we do not call `validateOnUpdate` to avoid failing
on the loan to value check. This also means that saturation is not updated for this penalty
owed. we think this is an acceptable discrepancy since it is only the penalty for over
saturation that is not being included in the saturation update, which should be a negligible
amount with respect to the total debt. Once a position is updated either by the users
actions, or by a saturation liquidation reset, this penalty will be adjusted to the correct
value in the Saturation State.


```solidity
bool transient ownerTransferSkipValidation;
```


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20(config.name, config.symbol) ERC20Hooks(10, 500_000) ERC20Permit(config.name) Ownable(config.pair);
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

### ownerTransfer


```solidity
function ownerTransfer(address from, address to, uint256 amount) public virtual onlyOwner;
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

Updates the pair state based on the transfer.

*Triggers pair state updates for DEPOSIT_L and debt token transfers
to avoid potential L token accumulation in the pair during burn operations.*


```solidity
function _update(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Hooks);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The address of the sender.|
|`to`|`address`|The address of the recipient.|
|`amount`|`uint256`|The amount of tokens transferred.|


### addHook


```solidity
function addHook(
    address hook
) public override;
```

## Errors
### HookIsNotAllowed

```solidity
error HookIsNotAllowed();
```

