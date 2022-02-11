**PROJECT: Decentralized Star Notary Service Project** 
This project built using boilerplate template provided by Udacity and is part of assessment for creating a decentralized application

### ERC-721 Token Name: High Five Token
### ERC-721 Token Symbol: HFT
### Contract Address on Rinkeby Network: 0xC32A1e3F940A09191474a4791BB0B9652820034B (https://rinkeby.etherscan.io/address/0xC32A1e3F940A09191474a4791BB0B9652820034B)

### Dependencies
For this project, you will need to have:
1. **Node and NPM** installed - NPM is distributed with [Node.js](https://www.npmjs.com/get-npm)
2. **Truffle v5.0.2** - A development framework for Ethereum. 
```bash
# Specify a particular version
npm install -g truffle@5.0.2
# Verify the version
truffle version
```
3. **Metamask: 5.3.1** - If you need to update Metamask just delete your Metamask extension and install it again.
4. [Ganache](https://www.trufflesuite.com/ganache) - Make sure that your Ganache and Truffle configuration file have the same port.
5. **OpenZeppelin: 2.3, Truffle-Hdwallet-Provider: 1.0.17**:
```bash
cd app
# install packages
npm install --save  openzeppelin-solidity@2.3
npm install --save  truffle-hdwallet-provider@1.0.17
npm install webpack-dev-server -g
npm install web3
```
6. **webpack-dev-server** - For running node project on localhost server
```bash
cd app
# install packages
npm install webpack-dev-server -g
```
7. **web3** - Web3.js for Ethereum APIs
```bash
cd app
# install packages
npm install web3
```

### Run the application
1. Clean the frontend 
```bash
cd app
# install all modules listed as dependencies in package.json
npm install
```

2. Deploy on Rinkeby
```bash
# For compiling the contract
truffle compile
# For migrating to rinkeby Ethereum network
truffle migrate --reset --network rinkeby

# For development 
truffle develop
# For migrating the contract to the locally running Ethereum network, inside the development console
migrate --reset
# For running unit tests the contract, inside the development console, run:
 test
```

3. Frontend :
```bash
cd app
npm run dev
```
### Rinekby Testnet
For Rinkeyby Test Network, you will have to provide:

| Network Name | New RPC URL | Chain ID |
|---|---|---|
|Private Network 1|`http://127.0.0.1:9545/`|1337 |
You will also need infurakey and metamaskseed (used in truffle-config.js):
infuraKey -  If you havent already done, create account in https://infura.io/ and create a project and use the project id key for Rinkeby
metamaskseed - This is the secret seed you would have copied when creating metamask account
