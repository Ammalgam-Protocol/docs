# ERC20DebtBase
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/tokens/ERC20DebtBase.sol)

**Inherits:**
[ERC20Base](/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md), [IERC20DebtToken](/contracts/interfaces/tokens/IERC20DebtToken.sol/interface.IERC20DebtToken.md)


## Functions
### constructor


```solidity
constructor(ERC20BaseConfig memory config) ERC20Base(config);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(address owner, address receiver, uint256 amount) internal virtual override;
```

### _afterTokenTransfer


```solidity
function _afterTokenTransfer(address owner, address receiver, uint256) internal virtual override;
```

### approve


```solidity
function approve(address, uint256) public pure virtual override(ERC20, IERC20) returns (bool);
```

### increaseAllowance


```solidity
function increaseAllowance(address, uint256) public pure virtual override returns (bool);
```

### decreaseAllowance


```solidity
function decreaseAllowance(address, uint256) public pure virtual override returns (bool);
```

### allowance


```solidity
function allowance(address receiver, address spender) public view virtual override(ERC20, IERC20) returns (uint256);
```

### debtAllowance

*Sets `amount` as the allowance of `spender` to send `receiver` debt tokens.
Map key is the receiver of the debt approving the debt to be moved to them.*


```solidity
function debtAllowance(address receiver, address spender) public view virtual override returns (uint256);
```

### approveDebt


```solidity
function approveDebt(address spender, uint256 amount) public virtual override returns (bool);
```

### transfer


```solidity
function transfer(address receiver, uint256 amount) public virtual override(ERC20, IERC20) returns (bool);
```

### transferFrom


```solidity
function transferFrom(
    address owner,
    address receiver,
    uint256 amount
) public virtual override(ERC20, IERC20) returns (bool);
```

### increaseDebtAllowance


```solidity
function increaseDebtAllowance(address spender, uint256 addedValue) public override returns (bool);
```

### decreaseDebtAllowance


```solidity
function decreaseDebtAllowance(address spender, uint256 subtractedValue) public override returns (bool);
```

### claimDebt


```solidity
function claimDebt(address owner, uint256 amount) public override;
```

### _approve

*Map key is the receiver of the debt approving the debt to be moved to them.*


```solidity
function _approve(address receiver, address spender, uint256 amount) internal virtual override;
```

### _spendAllowance

*override this method to be able to use debtAllowance*


```solidity
function _spendAllowance(address receiver, address spender, uint256 amount) internal virtual override;
```

## Errors
### DebtERC20ApproveDebt

```solidity
error DebtERC20ApproveDebt();
```

### DebtERC20IncreaseDebtAllowance

```solidity
error DebtERC20IncreaseDebtAllowance();
```

### DebtERC20DecreaseDebtAllowance

```solidity
error DebtERC20DecreaseDebtAllowance();
```

