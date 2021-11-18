const SharedApartment = artifacts.require("SharedApartment");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SharedApartment", function ( accounts ) {
  it("contract should be deployed", async function () {
    await SharedApartment.deployed();
    return assert.isTrue(true);
  });

  describe("Owner logic", async () => {
    it("owner exists and is deployment account", async function() {
      const saInstance = await SharedApartment.deployed();
      const theOwner = await saInstance.owner();
      assert.equal(theOwner, accounts[0], "deployment account is not the owner or owner does not exist!");
    });

    it("owner can set rent", async function() {
      const saInstance = await SharedApartment.deployed();
      const theOwner = await saInstance.owner();
      await saInstance.setRent(1000, {from: theOwner});
      const theRent = await saInstance.rent();
      assert.equal(theRent, 1000, "Rent is was not set correctly!")
    });

    
  });

  describe("Renter logic", async () => {
    it("renter can be added", async function () {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[2]);
      const theRenter = await saInstance.renters(0);     
      assert.equal(theRenter.renterAddress, accounts[2], "Renter was not saved");
    });

    it("renter can be accesed by address", async function () {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[4]);
      const theRenter = await saInstance.renters(1);
      assert.equal(theRenter.renterAddress, accounts[4], "renter can not be accessed by address") 
    });

    it("renter can be removed", async function() {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[3], {from: accounts[0]});
      const theRenter = await saInstance.renters(2);
      // console.log(theRenter);
      assert(theRenter != undefined, "renter was not saved!");
      await saInstance.removeRenter(theRenter.renterAddress);
      const deltedRenterId = await saInstance.getRenterId[accounts[3]];
      assert.equal(deltedRenterId, undefined, "Renter was not deleted!");
    });

    it("renter can pay rent", async function() {
      const saInstance = await SharedApartment.deployed();
      let theRenter = await saInstance.renters(0);  
      const theRent = await saInstance.rent();   
      await saInstance.payRent({from: theRenter.renterAddress, value: theRent});
      const theRRTC = await saInstance.rentReadyToCollect();
      theRenter = await saInstance.renters(0);  
      assert.deepEqual(theRRTC, theRent, "The rentReadyToCollect is not equal to the rent paid!");
      assert.isTrue(theRenter.paidRent, "it was not saved, that the renter has paid rent!")
    });

    it("renter can pay in fund", async function() {
      const saInstance = await SharedApartment.deployed();
      let theRenter = await saInstance.renters(0);  
      const theRent = await saInstance.rent();   
      await saInstance.payInFund({from: theRenter.renterAddress, value: 100});
      theRenter = await saInstance.renters(0);  
      let theFund = await saInstance.fund();
      assert.equal(theFund.toNumber(), 100, "Fund is not equal to funds paid into fund!");
      assert.equal(theRenter.paidExtra.toNumber(), 100, "Source of funds was not saved!")
      });

    it("owner can collect rent", async function() {
      const saInstance = await SharedApartment.deployed();
      const theOwner = await saInstance.owner();
      await saInstance.collectRent({from: theOwner});
      const theRRTC = await saInstance.rentReadyToCollect();
      assert.equal(theRRTC, 0, "Rent was not collected!");
    });
  });
});
