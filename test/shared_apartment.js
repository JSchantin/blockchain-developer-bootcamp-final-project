const SharedApartmentFactory = artifacts.require("SharedApartmentFactory");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SharedApartmentFactory", function ( accounts ) {

  // creates a new appartment with owner accounts[0] and checks if apartment exists
  it("Apartment can be created", async function() {
    const sa = await SharedApartmentFactory.deployed()
    await sa.createApartment()
    const ap = await sa.addressToApartment(accounts[0])
    assert(ap.owner != '0x0000000000000000000000000000000000000000', "Apartment was not created correctly!")
  });

  // deletes the apartment from previous test
  it("Apartment can be deleted", async function() {
    const sa = await SharedApartmentFactory.deployed()
    await sa.deleteApartment()
    const ap = await sa.addressToApartment(accounts[0])
    assert(ap.owner == '0x0000000000000000000000000000000000000000', "Apartment was not deleted correctly!")
  });

  // creates a new apartment and adds a renter to it
  it("renter can be added", async function () {
    const sa = await SharedApartmentFactory.deployed()
    await sa.createApartment()
    await sa.addRenter(accounts[1]);
    let theRenter = await sa.getRenter(accounts[0], accounts[1])
    assert.equal(theRenter.renterAddress, accounts[1], "Renter was not saved");
  });

  // first adds a new renter, checks if renter was saved and then deletes the renter
  it("renter can be removed", async function() {
    const sa = await SharedApartmentFactory.deployed()
    // add renter
    await sa.addRenter(accounts[2])
    const theRenter = await sa.getRenter(accounts[0], accounts[2])
    assert(theRenter.renterAddress != '0x0000000000000000000000000000000000000000', "renter was not saved!")
    //delete renter
    await sa.removeRenter(theRenter.renterAddress)
    let deletedRenter = await sa.getRenter(accounts[0], accounts[2])
    assert.equal(deletedRenter.renterAddress, '0x0000000000000000000000000000000000000000', "Renter was not deleted!")
  });

  // checks if the renter from the "add renter" test can pay rent
  it("renter can pay rent", async function() {
    const sa = await SharedApartmentFactory.deployed()
    let theRent = await sa.addressToApartment(accounts[0])
    theRent = theRent.rent.ammount
    await sa.payRent(accounts[0], {from: accounts[1], value: theRent})
    let theRTC = await sa.addressToApartment(accounts[0])
    theRTC = theRTC.rent.collectable
    assert.deepEqual(theRTC, theRent, "The collectable rent is not equal to the rent paid!");
  });

  // checks if the owner can collect the rent paid in the previous test
  it("owner can collect rent", async function() {
    const sa = await SharedApartmentFactory.deployed();
    await sa.collectRent();
    let theRTC = await sa.addressToApartment(accounts[0])
    theRTC = theRTC.rent.collectable
    assert.equal(theRTC, 0, "Rent was not collected!");
    // assert.equal(accounts[0]., 0, "Rent was not collected!");
  });
});
