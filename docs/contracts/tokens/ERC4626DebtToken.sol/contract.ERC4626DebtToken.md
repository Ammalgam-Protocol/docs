# ERC4626DebtToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC4626DebtToken.sol)

**Inherits:**
ERC4626, [ERC20DebtBase](/contracts/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


## Functions
### constructor


```solidity
constructor(ERC20BaseConfig memory config, address _asset) ERC4626(IERC20(_asset)) ERC20DebtBase(config);
```

### ownerMint


```solidity
function ownerMint(
    address sender,
    address to,
    uint256 assets,
    uint256 shares
) public virtual override(ERC20Base, IAmmalgamERC20) onlyOwner;
```

### ownerBurn


```solidity
function ownerBurn(
    address sender,
    address onBehalfOf,
    uint256 assets,
    uint256 shares
) public virtual override(IAmmalgamERC20) onlyOwner;
```

### borrowCall

We use the callback to transfer debt to the caller and transfer borrowed assets to the receiver.

*TODO(#547): Shares and assets need testing.*


```solidity
function borrowCall(address sender, uint256 assetsX, uint256 assetsY, uint256, bytes calldata data) public virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|msg.sender passed in by pair|
|`assetsX`|`uint256`|amount of tokenX sent to this contract|
|`assetsY`|`uint256`|amount of tokenY sent to this contract|
|`<none>`|`uint256`||
|`data`|`bytes`|encoded data containing the caller and receiver addresses|


### _deposit

*ERC4626 facade for [IAmmalgamPair-borrow](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md#borrow).
both deposit and mint calls _deposit
This is called when the user is borrowing*


```solidity
function _deposit(address caller, address receiver, uint256 assets, uint256) internal virtual override;
```

### _withdraw

*ERC4626 facade for [IAmmalgamPair-repay](/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md#repay).
both withdraw and redeem calls _withdraw
This is called when the user is repaying their debt*


```solidity
function _withdraw(address caller, address receiver, address, uint256 assets, uint256) internal virtual override;
```

### approve


```solidity
function approve(address account, uint256 balance) public pure override(ERC20, ERC20DebtBase, IERC20) returns (bool);
```

### allowance


```solidity
function allowance(
    address owner,
    address spender
) public view override(ERC20, ERC20DebtBase, IERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view override(ERC20Base, ERC4626, IERC20Metadata) returns (uint8);
```

### totalAssets


```solidity
function totalAssets() public view virtual override returns (uint256);
```

### decreaseAllowance


```solidity
function decreaseAllowance(
    address spender,
    uint256 subtractedValue
) public pure override(ERC20, ERC20DebtBase) returns (bool);
```

### increaseAllowance


```solidity
function increaseAllowance(
    address spender,
    uint256 addedValue
) public pure override(ERC20, ERC20DebtBase) returns (bool);
```

### transfer


```solidity
function transfer(address recipient, uint256 amount) public override(ERC20, IERC20, ERC20DebtBase) returns (bool);
```

### transferFrom


```solidity
function transferFrom(
    address sender,
    address recipient,
    uint256 amount
) public override(ERC20, IERC20, ERC20DebtBase) returns (bool);
```

### _afterTokenTransfer


```solidity
function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual override(ERC20, ERC20DebtBase);
```

### _approve


```solidity
function _approve(address owner, address spender, uint256 amount) internal virtual override(ERC20, ERC20DebtBase);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual override(ERC20DebtBase, ERC20);
```

### _spendAllowance


```solidity
function _spendAllowance(
    address owner,
    address spender,
    uint256 amount
) internal virtual override(ERC20DebtBase, ERC20);
```

### balanceOf


```solidity
function balanceOf(address account) public view override(ERC20Base, IERC20, ERC20) returns (uint256);
```

