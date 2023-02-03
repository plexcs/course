import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import { CONTRACT_ADDRESS, CONTACT_ABI } from './config';

function App() {

  const [account ,setAccount] = useState();
  const [contactList, setContactList] = useState();
  const [contacts , setContacts] = useState([]);
  const [newName, setNewName] = useState();
  const [newPhone, setNewPhone] = useState();

  const load = async () => {
    if (contactList){
      let counter = await contactList.methods.count().call();

    if (counter == 0){
      setContacts([]);
      return;
    }
    let updatedContactList = [];

    // iterate through the amount of time of counter
    for (let i=1; i<= counter; i++){
      // call the contracts method to get the particular contact
      const contact= await contactList.methods.contacts(i).call();
      // add recently fetched contact to state variable
      //setContacts((prevContacts) => [...prevContacts, contact])
      updatedContactList.push(contact);
    }
    setContacts(updatedContactList);
    }
  };

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      // Instantiate smart contracts using ABI and address
      const contactList = new web3.eth.Contract(CONTACT_ABI, CONTRACT_ADDRESS);
      // set contact list to state variable
      setContactList(contactList);

      await load();
    }
    init();

  },[]) // clean up 

  
  const handleSubmit = async e => {
    console.log(e)

    e.preventDefault();

    if (contactList){
      await contactList.methods
      .createContact(newName, newPhone)
      .send({from: account})
    }
    setNewName('');
    setNewPhone('');
    await load();
  };

  const handleDelete = async (id) => {
    console.log('id of delete contract : ', id);
    const res =  await contactList.methods.deleteContact(id).send({from: account });
    console.log(res);
    const updatedContactList = [];
    const counter = await contactList.methods.count().call();
    for (let i = 1; i <= counter; i++){
      const contact = await contactList.methods.contacts(i).call()
      if (contact.address !== CONTRACT_ADDRESS){
        updatedContactList.push(contact);
      }
    }
  
    setContacts(updatedContactList);
    await load()
  };




  return (
    <div className="App">
      <h3>Your account is : {account} </h3>
      <h1>
        Contacts 
      </h1>
     <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value = {newName || ''} onChange={(e) => setNewName(e.target.value)} />
        <input type="text" placeholder="Phone" value = {newPhone || ''} onChange={(e) => setNewPhone(e.target.value)} />
        <button type='submit'>Add Contact</button>
     </form>
     {contacts.length > 0 ? 
      <ul>
        {
          contacts.map((contact, index) => (
            <li key={`${contact.name}-${index}`} >
              <h4>{contact.name}</h4>
              <span><b>Phone: </b>{contact.phone}</span> 
              <button onClick={() => handleDelete(contacts[index].id)} >Delete Contact</button> 
            </li>
          ))
        }
      </ul> : (
        <p>No Contacts available</p>
      )}
    </div>
  );
}

export default App;
