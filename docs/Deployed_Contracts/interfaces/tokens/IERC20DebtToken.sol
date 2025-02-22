// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.28;

import {IAmmalgamERC20} from 'contracts/interfaces/tokens/IAmmalgamERC20.sol';

/**
 * @title IERC20DebtToken Interface
 * @notice This interface extends the IAmmalgamERC20 with additional methods.
 * for handling debt allowances and claims in the Ammalgam protocol.
 */
interface IERC20DebtToken is IAmmalgamERC20 {
    /**
     * @notice Returns the current debt allowance of `spender` from `receiver`.
     * @param receiver The account that would receive debt moved by the spender.
     * @param spender The account that can spend the debt.
     * @return The allowance of debt the `spender` can send to the `receiver`.
     */
    function debtAllowance(address receiver, address spender) external view returns (uint256);

    /**
     * @notice Sets `amount` of debt tokens that can be accepted by the `caller` from the `spender`.
     * @dev The approveDebt implementation in ERC4626DebtToken calls _approve from ERC20, by passing in
     * the receiver as owner.
     * @param spender The account that can transfer the debt.
     * @param amount The amount of the debt.
     * @return A boolean value indicating whether the operation succeeded.
     */
    function approveDebt(address spender, uint256 amount) external returns (bool);

    /**
     * @notice Allows caller to claim `amount` of debt from `owner`.
     * @dev The caller must have sufficient collateral in order to secure the debt being claimed.
     * @param owner The account that owns the debt.
     * @param amount The amount of the debt to be claimed.
     */
    function claimDebt(address owner, uint256 amount) external;
}
