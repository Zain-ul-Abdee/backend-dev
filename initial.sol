// Solidity program to implement
// the above approach
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.3;

contract initial
{
  string public message = "Hello World";

  function setMessage(string memory _newMessage) public
  {
    message = _newMessage;
  }
}

