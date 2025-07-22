# IAmmalgamFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0225322e5b1d4d1ce3ec3ffc220dfd4d8afaf521/contracts/interfaces/factories/IAmmalgamFactory.sol)

**Inherits:**
[IFactoryCallback](/docs/developer-guide/contracts/interfaces/factories/IFactoryCallback.sol/interface.IFactoryCallback.md)


## Functions
### getPair

Returns the pair address for two tokens.


```solidity
function getPair(address tokenA, address tokenB) external view returns (address pair);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenA`|`address`|The first token.|
|`tokenB`|`address`|The second token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`pair`|`address`|The address of the pair for the two tokens.|


### allPairs

Returns the pair address at a specific index.


```solidity
function allPairs(
    uint256 index
) external view returns (address pair);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index`|`uint256`|The index of the pair.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`pair`|`address`|The address of the pair at the given index.|


### allPairsLength

Returns the total number of token pairs.


```solidity
function allPairsLength() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total number of token pairs.|


### createPair

Creates a new pair for two tokens.


```solidity
function createPair(address tokenA, address tokenB) external returns (address pair);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenA`|`address`|The first token.|
|`tokenB`|`address`|The second token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`pair`|`address`|The address of the new pair.|


### setFeeTo

Changes the fee recipient address.


```solidity
function setFeeTo(
    address newFeeTo
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFeeTo`|`address`|The new fee recipient address.|


### setFeeToSetter

Changes the address that can change the fee recipient.


```solidity
function setFeeToSetter(
    address newFeeToSetter
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFeeToSetter`|`address`|The new fee setter address.|


## Events
### PairCreated
Emitted when a new pair is created.


```solidity
event PairCreated(address indexed tokenX, address indexed tokenY, address pair, uint256 allPairsLength);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenX`|`address`|The first token in the pair.|
|`tokenY`|`address`|The second token in the pair.|
|`pair`|`address`|The address of the new pair.|
|`allPairsLength`|`uint256`|The current total number of token pairs.|

### LendingTokensCreated
Emitted when new lending tokens are created.


```solidity
event LendingTokensCreated(
    address indexed pair,
    address depositL,
    address depositX,
    address depositY,
    address borrowL,
    address borrowX,
    address borrowY
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pair`|`address`|The address of the pair.|
|`depositL`|`address`|The address of the `DEPOSIT_L` lending token.|
|`depositX`|`address`|The address of the `DEPOSIT_X` lending token.|
|`depositY`|`address`|The address of the `DEPOSIT_Y` lending token.|
|`borrowL`|`address`|The address of the `BORROW_L` lending token.|
|`borrowX`|`address`|The address of the `BORROW_X` lending token.|
|`borrowY`|`address`|The address of the `BORROW_Y` lending token.|

