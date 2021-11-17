const SharedApartment = artifacts.require("SharedApartment");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SharedApartment", function ( accounts ) {
  it("should assert true", async function () {
    await SharedApartment.deployed();
    return assert.isTrue(true);
  });

  describe("Owner logic", async () => {
    it("owner exists", async function() {
      const saInstance = await SharedApartment.deployed();
      const theOwner = await saInstance.getOwner();
      assert.equal(theOwner, accounts[0], "deployment account is not the owner!");
    });

    it("owner can set rent", async function() {
      const saInstance = await SharedApartment.deployed();
      const theOwner = await saInstance.owner;

    });

    it("owner can collect rent", async function() {

    });

    it("rent can be collected only once every 30d", async function() {

    });
  });

  describe("Renter logic", async () => {
    it("renter can be added", async function () {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[2], {from: accounts[0]});
      const theRenters = await saInstance.getRenters();
      assert.equal(theRenters[0].renterAddress, accounts[2], "Renter was not saved");
    });

    it("only owner can add renter", async function() {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[2], {from: accounts[4]});
      const theRenters = await saInstance.getRenters();
      assert.equal(theRenters[0].renterAddress, accounts[2], "Renter was not saved");
    });

    it("renter can be removed", async function() {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[2], {from: accounts[4]});
      assert(await saInstance.getRenters() != undefined, "renter was not saved!");
      await saInstance.removeRenter(await saInstance.getRenterId(accounts[2]));
      assert(await saInstance.getRenters() == {}, "renter was not removed!");
    });

    it("only owner can remove renter", async function() {

    });

    it("renter can be accesed by address", async function () {
      const saInstance = await SharedApartment.deployed();
      await saInstance.addRenter(accounts[2]);
      const theRenters = await saInstance.getRenters();
      assert.equal(theRenters[await saInstance.getRenterId(accounts[2])].renterAddress, accounts[2], "renter cant be accessed by address") 
    });

    it("can pay rent", async function() {

    });
  });
});
