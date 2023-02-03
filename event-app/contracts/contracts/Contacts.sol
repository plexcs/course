// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

contract Contacts{
    uint public count = 0 ; // state variable

    struct Contact {
        uint id;
        string name;
        string phone;
    }

    constructor()  {
        createContact('Adhrit Developer','123123123');
    }   // create constructor visibility abstract

    mapping(uint => Contact) public contacts;

    function createContact(string memory _name, string memory _phone ) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
    }
    function deleteContact(uint _id) public {
        delete contacts[_id];
    }
}