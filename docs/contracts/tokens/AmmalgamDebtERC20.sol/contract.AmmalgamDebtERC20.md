# AmmalgamDebtERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/8a7f458eaa44bd6bb81314db98899ee7d35f8c57/contracts/tokens/AmmalgamDebtERC20.sol)

**Inherits:**
[AmmalgamERC20Base](/contracts/tokens/AmmalgamERC20Base.sol/abstract.AmmalgamERC20Base.md), [IAmmalgamDebtERC20](/contracts/interfaces/tokens/IAmmalgamDebtERC20.sol/interface.IAmmalgamDebtERC20.md)


## Functions
### constructor


```solidity
constructor(
    string memory name,
    string memory symbol,
    TokenType _tokenType
) AmmalgamERC20Base(name, symbol, _tokenType);
```

### approve


```solidity
function approve(address, uint256) public pure override(ERC20, IERC20) returns (bool);
```

### increaseAllowance


```solidity
function increaseAllowance(address, uint256) public pure override(ERC20) returns (bool);
```

### decreaseAllowance


```solidity
function decreaseAllowance(address, uint256) public pure override(ERC20) returns (bool);
```

### allowance


```solidity
function allowance(address receiver, address spender) public view override(ERC20, IERC20) returns (uint256);
```

### debtAllowance

*Sets `amount` as the allowance of `spender` to send `receiver` debt tokens.
Map key is the receiver of the debt approving the debt to be moved to them.*


```solidity
function debtAllowance(address receiver, address spender) public view override returns (uint256);
```

### approveDebt


```solidity
function approveDebt(address spender, uint256 amount) public override returns (bool);
```

### _approve

*Map key is the receiver of the debt approving the debt to be moved to them.*


```solidity
function _approve(address receiver, address spender, uint256 amount) internal override;
```

### _spendAllowance

*override this method to be able to use debtAllowance*


```solidity
function _spendAllowance(address receiver, address spender, uint256 amount) internal override;
```

### transfer


```solidity
function transfer(address receiver, uint256 amount) public override(ERC20, IERC20) returns (bool);
```

### transferFrom


```solidity
function transferFrom(address owner, address receiver, uint256 amount) public override(ERC20, IERC20) returns (bool);
```

### _afterTokenTransfer


```solidity
function _afterTokenTransfer(address owner, address receiver, uint256) internal override;
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

