import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, Paper, Stack, Typography } from "@mui/material";

const Metamask = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance , setBalance] = useState(null);

    useEffect(() => {
        if (window.ethereum){
            window.ethereum.on("accountsChanged", accountsChanged);
            window.ethereum.on("chainChanged", chainChanged);
            
        }
    },[]);

    const connectionHandler = async () => {
        if (window.ethereum){
            try {
                const res  = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                await accountsChanged(res[0]);
            } catch(err) {
                console.error(err);
                setErrorMessage("There was a problem connecting to MetaMask!! ");
            }
        }
        else {
            setErrorMessage("Install Metamask");
        }
    };

    const accountsChanged = async (newAccount) => {
       setAccount(newAccount);
       try {
        const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [newAccount.toString(), "latest"],
        });
        setBalance(ethers.utils.formatEther(balance));
       } catch(err){
        console.error(err);
        setErrorMessage("There was a problem connecting to Metamask");
       }
    };

    const chainChanged = () => {
        setErrorMessage(null);
        setAccount(null);
        setBalance(null);
    }


    return(
       <Paper elevation={3} sx={{ p: 3 }}>
         <Stack spacing={2}>
            <Typography variant="h6" >
                Account : {account}
            </Typography>
            <Typography variant="h6">
               Balance: {balance} {balance ? "ETH" : null }
            </Typography>
            <Button onClick={connectionHandler}>
                Connect Account
            </Button>
           {errorMessage ? (
            <Typography variant="body1" color="red">
                Error : {errorMessage}  
            </Typography>
           ) : null }
         </Stack>
       </Paper> 
    );
};

export default Metamask;