const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    let gasPrice = 35644
    //await instance.buyStar(starId, {from: user2, value: balance, gasPrice:gasPrice});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    //let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar) ;
    let value = starPrice + gasPrice;
    //console.log((Number(balanceOfUser2BeforeTransaction)));
    //console.log((Number(balanceAfterUser2BuysStar)));
    //console.log((Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar)));
    //console.log(value);
    //assert.equal(value, (Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar)));
});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    let instance = await StarNotary.deployed();
    // 1. create a Star with different tokenId
    await instance.createStar("R Star", 123);
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    let name = await instance.name.call();
    let symbol = await instance.symbol.call();
    assert.equal(name, "High Five Token");
    assert.equal(symbol, "HFT");
});

it('lets 2 users exchange stars', async() => {
    let instance = await StarNotary.deployed();
    // 1. create 2 Stars with different tokenId
    let token1 = 1111;
    let token2 = 2222;
    await instance.createStar("One Star" , token1);
    await instance.createStar("Two Star" , token2);
    let owner1 = await instance.ownerOf(token1);
    let owner2 = await instance.ownerOf(token2);
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(token1,token2);
    // 3. Verify that the owners changed
    let newowner1 = await instance.ownerOf(token1);
    let newowner2 = await instance.ownerOf(token2);
    assert.equal(newowner1 , owner2);
    assert.equal(newowner2 , owner1);
});

it('lets a user transfer a star', async() => {
    let instance = await StarNotary.deployed();
    // 1. create a Star with different tokenId
    let token3 = 33;
    let token2 = 2222;
    await instance.createStar("Three Star", token3);
    // 2. use the transferStar function implemented in the Smart Contract
    let owner2 = await instance.ownerOf(token2);
    await instance.transferStar(owner2,token3);
    // 3. Verify the star owner changed.
    let ownerOf3 = await instance.ownerOf(token3);
    assert.equal(ownerOf3,owner2);
});

it('lookUptokenIdToStarInfo test', async() => {
    let instance = await StarNotary.deployed();
    // 1. create a Star with different tokenId
    let token4 = 44;
    await instance.createStar("Four Star",token4);
    // 2. Call your method lookUptokenIdToStarInfo
    let name = await instance.lookUptokenIdToStarInfo(token4);
    // 3. Verify if you Star name is the same
    assert.equal(name, "Four Star");
});