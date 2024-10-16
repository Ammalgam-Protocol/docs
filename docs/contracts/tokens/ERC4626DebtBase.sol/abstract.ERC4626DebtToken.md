# ERC4626DebtToken
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC4626DebtBase.sol)

**Inherits:**
ERC4626, [ERC20DebtBase](/contracts/tokens/ERC20DebtBase.sol/abstract.ERC20DebtBase.md)


## Functions
### _afterTokenTransfer


```solidity
function _afterTokenTransfer(address owner, address receiver, uint256 amount) internal override(ERC20, ERC20DebtBase);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual override(ERC20, ERC20DebtBase);
```

### decreaseAllowance


```solidity
function decreaseAllowance(
    address spender,
    uint256 subtractedValue
) public pure override(ERC20, ERC20DebtBase) returns (bool);
```

### allowance


```solidity
function allowance(
    address receiver,
    address spender
) public view override(IERC20, ERC20, ERC20DebtBase) returns (uint256);
```

### debtAllowance


```solidity
function debtAllowance(address receiver, address spender) public view virtual override returns (uint256);
```

### increaseAllowance


```solidity
function increaseAllowance(
    address spender,
    uint256 addedValue
) public pure virtual override(ERC20, ERC20DebtBase) returns (bool);
```

### approveDebt


```solidity
function approveDebt(address spender, uint256 amount) public override returns (bool);
```

### transfer


```solidity
function transfer(address recipient, uint256 amount) public override(IERC20, ERC20, ERC20DebtBase) returns (bool);
```

### transferFrom


```solidity
function transferFrom(
    address sender,
    address recipient,
    uint256 amount
) public override(IERC20, ERC20, ERC20DebtBase) returns (bool);
```

### balanceOf


```solidity
function balanceOf(address account) public view override(ERC20, ERC20Base, IERC20) returns (uint256);
```

### approve


```solidity
function approve(address spender, uint256 amount) public pure override(IERC20, ERC20, ERC20DebtBase) returns (bool);
```

### decimals


```solidity
function decimals() public view override(ERC4626, ERC20Base, IERC20Metadata) returns (uint8);
```

### _approve

*Map key is the receiver of the debt approving the debt to be moved to them.*


```solidity
function _approve(address receiver, address spender, uint256 amount) internal override(ERC20, ERC20DebtBase);
```

### _spendAllowance

*override this method to be able to use debtAllowance*


```solidity
function _spendAllowance(address receiver, address spender, uint256 amount) internal override(ERC20, ERC20DebtBase);
```

