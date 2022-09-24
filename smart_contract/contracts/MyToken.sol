// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MyToken is ERC20{
    constructor() ERC20("Dex Coin","DC") {
        _mint(msg.sender,1000 * 10 ** 18);
    }
}
