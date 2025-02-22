// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.28;

import {IERC20} from '@openzeppelin/contracts/interfaces/IERC20.sol';
import {IERC20Metadata} from '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import {IERC20Permit} from '@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol';

/**
 * @title IAmmalgamERC20
 * @dev This interface extends IERC20, IERC20Metadata, and IERC20Permit, and defines mint and burn functions.
 */
interface IAmmalgamERC20 is IERC20, IERC20Metadata, IERC20Permit {
    /**
     * @dev Emitted when tokens are minted
     * @param to Address where minted tokens are sent
     * @param shares The amount of tokens being minted
     */
    event Mint(address indexed sender, address indexed to, uint256 shares);

    /**
     * @dev Emitted when tokens are burned
     * @param sender Supplies Ammalgam Liquidity token into the pair contract and receives the minted assets in exchange
     * @param to Address where burned tokens are sent
     * @param shares The amount of tokens being burned
     */
    event Burn(address indexed sender, address indexed to, uint256 shares);

    /**
     * @dev Emitted on a borrow of tokens
     * @param sender The address initiating the borrowing action
     * @param to The address receiving the borrowed tokens
     * @param assets The address of the borrowed token
     * @param shares The amount of tokens being borrowed
     */
    event Borrow(address indexed sender, address indexed to, uint256 assets, uint256 shares);

    /**
     * @dev Emitted on a repayment of tokens
     * @param sender The address initiating the repayment action
     * @param onBehalfOf The address of the account on whose behalf tokens are repaid
     * @param assets The address of the repaid token
     * @param shares The amount of tokens being repaid
     */
    event Repay(address indexed sender, address indexed onBehalfOf, uint256 assets, uint256 shares);

    /**
     * @dev Emitted on a liquidity borrow
     * @param sender The address initiating the borrowing action
     * @param borrowAmountLShares The amount of liquidity borrowed
     * @param to Address where the borrowed liquidity is sent
     */
    event BorrowLiquidity(address indexed sender, uint256 borrowAmountLShares, address indexed to);

    /**
     * @dev Emitted on a liquidity repayment
     * @param sender Supplies borrowed liquidity into the pair contract and the corresponding Ammalgam Debt tokens will be destroyed
     * @param onBehalfOf Address for whom the repayment is made
     * @param repayAmountLShares The amount of liquidity being repaid
     */
    event RepayLiquidity(address indexed sender, address indexed onBehalfOf, uint256 repayAmountLShares);

    /**
     * @notice Creates `amount` tokens and assigns them to `to` address, increasing the total supply.
     * @dev Emits a IERC20.Transfer event with `from` set to the zero address.
     * @param to The account to deliver the tokens to.
     * @param assets The quantity of assets represented by the shares.
     * @param shares The amount of shares to mint.
     */
    function ownerMint(address sender, address to, uint256 assets, uint256 shares) external;

    /**
     * @notice Destroys `amount` tokens from `from` address, reducing the total supply.
     * @dev Emits a IERC20.Transfer event with `to` set to the zero address.
     * @param from The account to deduct the tokens from.
     * @param assets The quantity of assets represented by the shares.
     * @param shares The amount of shares to be burned.
     */
    function ownerBurn(address sender, address from, uint256 assets, uint256 shares) external;
}
