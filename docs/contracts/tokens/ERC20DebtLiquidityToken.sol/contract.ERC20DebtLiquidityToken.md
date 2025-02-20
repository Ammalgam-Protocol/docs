# ERC20DebtLiquidityToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC20DebtLiquidityToken.sol)

**Inherits:**
[ERC20DebtBase](/contracts/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


## Functions
### constructor


```solidity
constructor(ERC20BaseConfig memory config) ERC20DebtBase(config);
```

### ownerMint


```solidity
function ownerMint(
    address sender,
    address to,
    uint256,
    uint256 shares
) public override(ERC20Base, IAmmalgamERC20) onlyOwner;
```

### ownerBurn


```solidity
function ownerBurn(address sender, address onBehalfOf, uint256, uint256 shares) public override onlyOwner;
```

### borrowCall

We use the callback to transfer debt to the caller and transfer borrowed assets to the receiver.


```solidity
function borrowCall(address sender, uint256 assetsX, uint256 assetsY, uint256 sharesL, bytes calldata data) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|msg.sender passed in by pair|
|`assetsX`|`uint256`|amount of tokenX sent to this contract|
|`assetsY`|`uint256`|amount of tokenY sent to this contract|
|`sharesL`|`uint256`|amount of liquidity debt added to this contract|
|`data`|`bytes`|encoded data containing the caller and receiver addresses|


