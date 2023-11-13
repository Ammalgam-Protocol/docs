# IAmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/interfaces/IAmmalgamPair.sol)

**Inherits:**
[IAmmalgamERC20Controller](/contracts/interfaces/tokens/IAmmalgamERC20Controller.sol/interface.IAmmalgamERC20Controller.md), [ITransferValidator](/contracts/interfaces/callbacks/ITransferValidator.sol/interface.ITransferValidator.md)


## Functions
### MINIMUM_LIQUIDITY

Represents the token amount that is burned during the first liquidity provision.


```solidity
function MINIMUM_LIQUIDITY() external pure returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|1000|


### LTV

Returns the Loan-to-Value (LTV) ratio

*This LTV ratio could be used to determine the maximum borrowable amount against collateral*


```solidity
function LTV() external view returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The LTV ratio as a uint8 percentage value (75)|


### ALLOWED_LIQUIDITY_LEVERAGE

The constant value representing the allowed liquidity leverage in the system.

*This value is a constant and cannot be changed.*


```solidity
function ALLOWED_LIQUIDITY_LEVERAGE() external pure returns (uint8);
```

### missingX

Represents the amount of tokenX currently missing in the contract due to asset being lent out.


```solidity
function missingX() external view returns (uint112);
```

### missingY

Represents the amount of tokenY currently missing in the contract due to asset being lent out.


```solidity
function missingY() external view returns (uint112);
```

### factory

Represents the address of the factory contract.

*This address is immutable.*


```solidity
function factory() external view returns (address);
```

### getReserves

Fetches the current reserves of asset X and asset Y, as well as the block of the last operation.


```solidity
function getReserves() external view returns (uint112 reserveX, uint112 reserveY, uint256 blockLast);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveX`|`uint112`|The current reserve of asset X.|
|`reserveY`|`uint112`|The current reserve of asset Y.|
|`blockLast`|`uint256`|The block number of the last operation.|


### kLast

Get the last product of the reserves, immediately after the most recent liquidity event.


```solidity
function kLast() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The last product of the reserves.|


### externalLiquidity

*The external liquidity resepresents the liquidity that can be sourced on the external reference market to swap the collatoral asset
to the debt asset. It is used in the calculation of slippage in the validation library. It can be set to a number representing the lower bound
for the estimated external liquidity availabe for a given pair. This allows more liquid pairs to have less restrictive borrowing checks.*


```solidity
function externalLiquidity() external view returns (uint112);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint112`|The external liquidity in units of liquidity tokens (L).|


### updateExternalLiquidity

Updates the external liquidity value.

*This function sets the external liquidity to a new value and emits an event with the new value. It can only be called by the fee setter.*


```solidity
function updateExternalLiquidity(uint112 externalLiquidity_) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`externalLiquidity_`|`uint112`|The new external liquidity value.|


### mint

Mints tokens and assigns them to `to` address.

*Calculates the amount of tokens to mint based on reserves and balances. Requires liquidity > 0.
Emits a #Mint event.*


```solidity
function mint(address to) external returns (uint256 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|address to which tokens will be minted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint256`|amount of tokens minted|


### burn

Burns liquidity tokens from the contract and sends the underlying assets to `to` address.

*Calculates the amounts of assets to be returned based on liquidity.
Requires amountX and amountY to be greater than 0.
Emits a #Burn event and performs a safe transfer of assets.*


```solidity
function burn(address to) external returns (uint256 amountX, uint256 amountY);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|address to which the underlying assets will be transferred|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountX`|`uint256`|amount of first token to be returned|
|`amountY`|`uint256`|amount of second token to be returned|


### swap

Executes a swap of tokens.

*Requires at least one of `amountXOut` and `amountYOut` to be greater than 0,
and that the amount out does not exceed the reserves.
An optimistically transfer of tokens is performed.
A callback is executed if `data` is not empty.
Emits a #Swap event.*


```solidity
function swap(uint256 amountXOut, uint256 amountYOut, address to, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountXOut`|`uint256`|Amount of first token to be swapped out.|
|`amountYOut`|`uint256`|Amount of second token to be swapped out.|
|`to`|`address`|Address to which the swapped tokens are sent.|
|`data`|`bytes`|Data to be sent along with the call, can be used for a callback.|


### deposit

Handles deposits into the contract.

*Verifies deposit amounts and types, adjusts reserves if necessary, mints corresponding tokens, and updates missing assets.*


```solidity
function deposit(address to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to which tokens will be minted.|


### withdraw

Handles withdrawals from the contract.

*Verifies withdrawal amounts, burns corresponding tokens, transfers the assets, and updates missing assets.*


```solidity
function withdraw(address to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to which the withdrawn assets will be transferred.|


### borrow

Handles borrowing from the contract.

*Verifies the borrowing amounts, mints corresponding debt tokens, transfers the assets, and updates missing assets. Also supports flash loan interactions.*


```solidity
function borrow(address to, uint256 amountX, uint256 amountY, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|Address to which the borrowed assets will be transferred.|
|`amountX`|`uint256`|Amount of asset X to borrow.|
|`amountY`|`uint256`|Amount of asset Y to borrow.|
|`data`|`bytes`|Call data to be sent to external contract if flash loan interaction is desired.|


### borrowLiquidity

Handles liquidity borrowing from the contract.

*Verifies the borrowing amount, mints corresponding tokens, transfers the assets, and updates reserves. Also supports flash loan interactions.*


```solidity
function borrowLiquidity(address to, uint256 borrowAmountL, bytes calldata data) external returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`||
|`borrowAmountL`|`uint256`|Amount of liquidity to borrow.|
|`data`|`bytes`|Call data to be sent to external contract if flash loan is desired.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|borrowedLX Amount of asset X borrowed.|
|`<none>`|`uint256`|borrowedLY Amount of asset Y borrowed.|


### repay

Handles repayment of borrowed assets.

*Burns corresponding borrowed tokens, adjusts the reserves, and updates missing assets.*


```solidity
function repay(address onBehalfOf) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`onBehalfOf`|`address`|Address of the entity on whose behalf the repayment is made.|


### repayLiquidity

Handles repayment of borrowed liquidity.

*Calculates repayable liquidity, burns corresponding tokens, adjusts reserves, and updates active liquidity.*


```solidity
function repayLiquidity(address onBehalfOf) external returns (uint256 amountX, uint256 amountY, uint256 repayAmountL);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`onBehalfOf`|`address`|Address of the entity on whose behalf the liquidity repayment is made.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountX`|`uint256`|Repayment amount for asset X.|
|`amountY`|`uint256`|Repayment amount for asset Y.|
|`repayAmountL`|`uint256`|Amount of liquidity repaid.|


### skim

Transfers excess tokens to a specified address.

*Calculates the excess of tokenX and tokenY balances and transfers them to the specified address.*


```solidity
function skim(address to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to which the excess tokens are transferred.|


### sync

Updates the reserves to match the current token balances.

*Reads the current balance of tokenX and tokenY in the contract, and updates the reserves to match these balances.*


```solidity
function sync() external;
```

### configLongTermInterval

Resets the long-term interval configuration.

*Allows the contract owner to reset the long-term interval configuration to the specified value.*


```solidity
function configLongTermInterval(uint24 _longTermIntervalConfig) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_longTermIntervalConfig`|`uint24`|The new value for the long-term interval configuration.|


### getObservations

Retrieves the current observations from the contract.

*Returns the GeometricBWAP Observation struct.*


```solidity
function getObservations() external view returns (GeometricBWAP.Observations memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`GeometricBWAP.Observations`|observations A struct containing the current observations data.|


### getTickRange

Retrieves the tick range values.

*Returns the minimum and maximum tick values that define a tick range.*


```solidity
function getTickRange() external view returns (int24 minTick, int24 maxTick);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minTick`|`int24`|The minimum tick value among current, mid-term, and long-term ticks.|
|`maxTick`|`int24`|The maximum tick value among current, mid-term, and long-term ticks.|


## Events
### Mint
*Emitted when tokens are minted*


```solidity
event Mint(address indexed sender, uint256 amountX, uint256 amountY);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies assets into the pair contract and receives Ammalgam Liquidity in exchange|
|`amountX`|`uint256`|The amount of token X minted|
|`amountY`|`uint256`|The amount of token Y minted|

### Burn
*Emitted when tokens are burned*


```solidity
event Burn(address indexed sender, uint256 amountX, uint256 amountY, address indexed to);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies Ammalgam Liquidity token into the pair contract and receives the minted assets in exchange|
|`amountX`|`uint256`|The amount of token X burned|
|`amountY`|`uint256`|The amount of token Y burned|
|`to`|`address`|Address where burned tokens are sent|

### Swap
*Emitted on a token swap*


```solidity
event Swap(
    address indexed sender,
    uint256 amountXIn,
    uint256 amountYIn,
    uint256 amountXOut,
    uint256 amountYOut,
    address indexed to
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the swap|
|`amountXIn`|`uint256`|The amount of token X provided for the swap|
|`amountYIn`|`uint256`|The amount of token Y provided for the swap|
|`amountXOut`|`uint256`|The amount of token X received from the swap|
|`amountYOut`|`uint256`|The amount of token Y received from the swap|
|`to`|`address`|Address where the swapped tokens are sent|

### Deposit
Emitted on a deposit of tokens

*When assets X and Y are being lent out and depleted, the modified invariant curve is utilized, which approaches infinity
faster than the normal invariant curve. Depositers who deposits the depleted assets will earn additional deposit credit as
they are helping move the modified invariant curve back to the original curve.*


```solidity
event Deposit(address indexed sender, uint256 amountX, uint256 amountY, uint256 fromReserveX, uint256 fromReserveY);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies assets into the pair contract and receives Ammalgam Deposit Tokens in exchange|
|`amountX`|`uint256`|The amount of token X deposited|
|`amountY`|`uint256`|The amount of token Y deposited|
|`fromReserveX`|`uint256`|The prior reserve of token X before deposit|
|`fromReserveY`|`uint256`|The prior reserve of token Y before deposit|

### Withdraw
*Emitted on a withdrawal of tokens*


```solidity
event Withdraw(address indexed sender, uint256 amountX, uint256 amountY);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies Ammalgam Deposit Tokens and receives the underlying assets in exchange|
|`amountX`|`uint256`|The amount of token X withdrawn|
|`amountY`|`uint256`|The amount of token Y withdrawn|

### Borrow
*Emitted on a borrow of tokens*


```solidity
event Borrow(address indexed sender, uint256 amountX, uint256 amountY, address indexed to);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the borrowing action|
|`amountX`|`uint256`|The amount of token X borrowed|
|`amountY`|`uint256`|The amount of token Y borrowed|
|`to`|`address`|Address where the borrowed tokens are sent|

### BorrowLiquidity
*Emitted on a liquidity borrow*


```solidity
event BorrowLiquidity(address indexed sender, uint256 borrowAmountL, address indexed to);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the borrowing action|
|`borrowAmountL`|`uint256`|The amount of liquidity borrowed|
|`to`|`address`|Address where the borrowed liquidity is sent|

### Repay
Emitted on a token repayment

*When assets X and Y are being lent out and depleted, the modified invariant curve is utilized, which approaches infinity
faster than the normal invariant curve. Depositers who deposits the depleted assets will earn additional deposit credit as
they are helping move the modified invariant curve back to the original curve.*


```solidity
event Repay(
    address indexed sender,
    address indexed onBehalfOf,
    uint256 amountX,
    uint256 amountY,
    uint256 fromReserveX,
    uint256 fromReserveY
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies borrowed underlying assets into the pair contract and the corresponding Ammalgam Debt tokens will be destroyed|
|`onBehalfOf`|`address`|Address for whom the repayment is made|
|`amountX`|`uint256`|The amount of token X repaid|
|`amountY`|`uint256`|The amount of token Y repaid|
|`fromReserveX`|`uint256`|The prior reserve of token X before repayment|
|`fromReserveY`|`uint256`|The prior reserve of token Y before repayment|

### RepayLiquidity
*Emitted on a liquidity repayment*


```solidity
event RepayLiquidity(address indexed sender, address indexed onBehalfOf, uint256 amountLX, uint256 amountLY);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Supplies borrowed liquidity into the pair contract and the corresponding Ammalgam Debt tokens will be destroyed|
|`onBehalfOf`|`address`|Address for whom the repayment is made|
|`amountLX`|`uint256`|The amount of liquidity X repaid|
|`amountLY`|`uint256`|The amount of liquidity Y repaid|

### Sync
*Emitted when reserves are synchronized*


```solidity
event Sync(uint112 reserveX, uint112 reserveY);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserveX`|`uint112`|The updated reserve for token X|
|`reserveY`|`uint112`|The updated reserve for token Y|

### UpdateExternalLiquidity
*Emitted when external liquidity is updated*


```solidity
event UpdateExternalLiquidity(uint112 externalLiquidity);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`externalLiquidity`|`uint112`|The updated value for external liquidity|

