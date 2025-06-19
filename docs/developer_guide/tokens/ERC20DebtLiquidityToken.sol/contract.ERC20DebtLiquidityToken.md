# ERC20DebtLiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/tokens/ERC20DebtLiquidityToken.sol)

**Inherits:**
[ERC20DebtBase](/docs/developer_guide/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


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
function ownerBurn(address sender, address onBehalfOf, uint256, uint256 shares) public override onlyOwner;
```

### borrowCall

We use the callback to transfer debt to the caller and transfer borrowed assets to the receiver.
This contract never has assets or shares unless they were sent to it by the pair within
the context of this function getting called. Calling this function directly will not do
anything because there are no assets or shares to transfer.


```solidity
function borrowCall(address sender, uint256 assetsX, uint256 assetsY, uint256 sharesL, bytes calldata data) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`||
|`assetsX`|`uint256`|amount of tokenX sent to this contract|
|`assetsY`|`uint256`|amount of tokenY sent to this contract|
|`sharesL`|`uint256`|amount of liquidity debt added to this contract|
|`data`|`bytes`|encoded data containing the caller and receiver addresses|


