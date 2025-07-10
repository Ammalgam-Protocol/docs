# ERC20DebtLiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/975f0ea3593c2ebbbad06ad90ec03f0a7b68c3e0/contracts/tokens/ERC20DebtLiquidityToken.sol)

**Inherits:**
[ERC20DebtBase](/docs/developer-guide/contracts/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20DebtBase(config);
```

### ownerMint


```solidity
function ownerMint(
    address sender,
    address to,
    uint256 assets,
    uint256 shares
) public override(ERC20Base, IAmmalgamERC20) onlyOwner;
```

### ownerBurn


```solidity
function ownerBurn(address sender, address onBehalfOf, uint256 assets, uint256 shares) public override onlyOwner;
```

### ownerTransfer

This function is reserved for moving collateral to liquidators, but here we reuse it
to transfer debt from the pair to a borrower. Since the borrower might already be in trouble
if this is called during a liquidation, we do not call `validateOnUpdate` to avoid failing
on the loan to value check. This also means that saturation is not updated for this penalty
owed. we think this is an acceptable discrepancy since it is only the penalty for over
saturation that is not being included in the saturation update, which should be a negligible
amount with respect to the total debt. Once a position is updated either by the users
actions, or by a soft liquidation, this penalty will be adjusted to the correct value. in
the Saturation State.


```solidity
function ownerTransfer(address from, address to, uint256 amount) public override(ERC20Base, IAmmalgamERC20) onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|address from which shares are transferred|
|`to`|`address`|address to which shares are transferred|
|`amount`|`uint256`|amount of shares to transfer|


### borrowLiquidityCall

We use the callback to transfer debt to the caller and transfer borrowed assets to the receiver.
This contract never has assets or shares unless they were sent to it by the pair within
the context of this function getting called. Calling this function directly will not do
anything because there are no assets or shares to transfer.


```solidity
function borrowLiquidityCall(
    address sender,
    uint256 assetsX,
    uint256 assetsY,
    uint256 sharesL,
    bytes calldata data
) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`assetsX`|`uint256`|amount of tokenX sent to this contract|
|`assetsY`|`uint256`|amount of tokenY sent to this contract|
|`sharesL`|`uint256`|amount of liquidity debt added to this contract|
|`data`|`bytes`|encoded data containing the caller and receiver addresses|


