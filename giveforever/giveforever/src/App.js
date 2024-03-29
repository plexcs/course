import React, { useState } from 'react';
import { ethers} from 'ethers';
import './App.css';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

//const contractAddress = '';
let provider ;
if (typeof window.ethereum !== 'undefined'){
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  // fallback to localhost
  provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
}
let contract  = new ethers.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, provider);
let signer;

function App() {
  const [balance, setBalance] = useState(0);
  const [donated, setDonated] = useState(0);
  const [lidoBalance,setLidoBalance] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("Not Connected!!");

  const connect = async () => {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const userAddress = await signer.getAddress();
    const networkData  = await provider.getNetwork();
    const realBalance = await provider.getBalance(userAddress);
    console.log(ethers.utils.formatEther(realBalance));
    let networkName = 'unknown';
    if (networkData.chainId === 1) networkName = 'manniet';
    if (networkData.chainId === 5) networkName = 'goerli';
    
    console.log(userAddress);
    setConnectionStatus(`Connected to ${networkName} ${userAddress}`);
    setBalance(ethers.utils.formatEther(realBalance));
    updateBalances();
    
  }

  const deposit = async  () => {
    let userAmount = document.getElementById('deposit-amount').ariaValueMax;
    const weiAmount = ethers.utils.parseEther(userAmount);
    const tx = await contract.deposit({value: weiAmount});
    await tx.wait();
    updateBalances();

  }

  const withdraw = async  () => {
    await contract.withdraw();
    updateBalances();

  }

  const updateBalances = async () => {
    const donated = await contract.donated();
    setDonated(ethers.utils.formatEther(donated));
    const lidoBalance = await contract.lidoBalance();
    setLidoBalance(ethers.utils.formatEther(lidoBalance));
    const surplus = lidoBalance.sub(donated);
    setSurplus(ethers.utils.formatEther(surplus));
  }

  setTimeout(()=>{
    updateBalances();
  },1000);

  


  return (
    <div className="App">
      <header className='App-header'>
        <h1><span>Give</span>Forever</h1>
        <p>
          A personal vault for charity donation
        </p>
        <div className='App-body'>
           <div className='App-balances'>
              Donated : {donated} ETH <br />
              Balance : {lidoBalance} ETH <br />
              Surplus : {surplus} ETH <br />
           </div>
           <div className='App-button-box'>
               <div className='App-connection'>
                {connectionStatus}
               </div>
               <button onClick={connect}>CONNECT</button>
               <p>Balance : {balance}</p>
           </div>
           <div className='App-button-box'>
            <input type="text" id="deposit-amount" placeholder="ETH" />
             <br />
            <button onClick={deposit}>DEPOSIT</button> 
          
          </div>
          <div className='App-button-box'>
             <button onClick={withdraw}>WITHDRAW</button>
          </div>
          {/* <div className='App-contract'>
            Contract <a href='https://etherscan.io/address/' />
          </div>  */}
        </div>

      </header>
    </div>
  );
}

export default App;
