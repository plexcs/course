import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
//import {CONTRACT_ABI, CONTRACT_ADDRESS} from './config';



function App() {
  
  const [account, setAccount] = useState();
  const [newName , setNewName] = useState();
  const [newFvNumber, setNewFvNumber] = useState();


  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]); 

      // instantiate smart contracts using ABI and address
     
    }
    init();
  },[]);

  const handleSubmit = async e => {
  
    e.preventDefault();

  };

  return (
    <div className="App">
     <h1>Brownies</h1>
     <h3><span>Account  : </span>{account}</h3>
     <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Name' value={newName || ''} onChange={(e) => setNewName(e.target.value)} />
        <input type='text' placeholder='Number' value={newFvNumber || ''} onChange={(e) => setNewFvNumber(e.target.value)} />
        <button type='submit'>Add Person</button>
     </form>
    </div>
  );
}

export default App;
