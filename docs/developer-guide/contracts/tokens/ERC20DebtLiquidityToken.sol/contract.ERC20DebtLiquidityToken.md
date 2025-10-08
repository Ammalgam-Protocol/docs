# ERC20DebtLiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/177484d49d90b45a40c5e8affa7fab5af8d23a1a/contracts/tokens/ERC20DebtLiquidityToken.sol)

**Inherits:**
[ERC20DebtBase](/home/runner/work/core-v1/core-v1/core-v1/docs/src/contracts/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


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
function ownerBurn(
    address sender,
    address onBehalfOf,
    uint256 assets,
    uint256 shares
) public override onlyOwner;
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
function ownerTransfer(
    address from,
    address to,
    uint256 amount
) public override(ERC20Base, IAmmalgamERC20) onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|address from which shares are transferred|
|`to`|`address`|address to which shares are transferred|
|`amount`|`uint256`|amount of shares to transfer|


