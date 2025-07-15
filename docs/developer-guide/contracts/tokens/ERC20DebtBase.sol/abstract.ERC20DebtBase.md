# ERC20DebtBase
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a26749d2952fb563364ca2f24c7ddd488be0359f/contracts/tokens/ERC20DebtBase.sol)

**Inherits:**
[ERC20Base](/docs/developer-guide/contracts/tokens/ERC20Base.sol/abstract.ERC20Base.md), [IERC20DebtToken](/docs/developer-guide/contracts/interfaces/tokens/IERC20DebtToken.sol/interface.IERC20DebtToken.md)


## Functions
### constructor


```solidity
constructor(
    ERC20BaseConfig memory config
) ERC20Base(config);
```

### nonces


```solidity
function nonces(
    address owner
) public view virtual override(ERC20Base, IERC20Permit) returns (uint256);
```

### approve


```solidity
function approve(address, uint256) public pure virtual override(ERC20, IERC20) returns (bool);
```

### allowance


```solidity
function allowance(address receiver, address spender) public view virtual override(ERC20, IERC20) returns (uint256);
```

### debtAllowance

*Sets `amount` as the allowance of `spender` to send `receiver` debt tokens.
Map key is the receiver of the debt approving the debt to be moved to them.*


```solidity
function debtAllowance(address receiver, address spender) public view returns (uint256);
```

### approveDebt


```solidity
function approveDebt(address spender, uint256 amount) public returns (bool);
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

### claimDebt


```solidity
function claimDebt(address owner, uint256 amount) public override;
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

