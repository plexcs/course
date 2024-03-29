const hre = require("hardhat");

const main = async () => {
    let owner,giveForever;
    [owner] = await ethers.getSigners();
    const charityAddress = '0xba29EE74e8182dC3F6531a628E97B48D8453d2eC';
    const lidoAddress = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84';

    const GiveForever = await ethers.getContractFactory('GiveForever');
    giveForever = await GiveForever.deploy(charityAddress, lidoAddress);
    console.log(`Contract deployed to : ${giveForever.address}`);
};

main();