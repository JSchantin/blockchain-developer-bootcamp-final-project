var web3 = new Web3(window.ethereum)

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "apartmentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "rentCollected",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "rentCollected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "renter",
        "type": "address"
      }
    ],
    "name": "rentPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "rent",
        "type": "uint256"
      }
    ],
    "name": "rentSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "renter",
        "type": "address"
      }
    ],
    "name": "renterAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "renter",
        "type": "address"
      }
    ],
    "name": "renterRemoved",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "addressToApartment",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ammount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "collectable",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastCollected",
            "type": "uint256"
          }
        ],
        "internalType": "struct SharedApartmentFactory.Rent",
        "name": "rent",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getRenterAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "renters",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getRenterAddressesLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_renterAddress",
        "type": "address"
      }
    ],
    "name": "getRenter",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "renterAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "renterId",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "strikes",
            "type": "uint16"
          },
          {
            "internalType": "bool",
            "name": "paidRent",
            "type": "bool"
          }
        ],
        "internalType": "struct SharedApartmentFactory.Renter",
        "name": "renter",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createApartment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deleteApartment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_renterAddress",
        "type": "address"
      }
    ],
    "name": "addRenter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_renterAddress",
        "type": "address"
      }
    ],
    "name": "removeRenter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rent",
        "type": "uint256"
      }
    ],
    "name": "setRent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectRent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_apartmentOwner",
        "type": "address"
      }
    ],
    "name": "payRent",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
const saAddress = '0x35765288b613BaDdf553eF538A71E554913b774B' //rinkeby
//const saAddress = '0xC14BFFD0dB3ff28474B37E4589a366b133aE6c38' //localhost
const sharedApartment = new web3.eth.Contract(abi, saAddress)
sharedApartment.setProvider(window.ethereum)

var role = ""
var ownerAddress = '0x0000000000000000000000000000000000000000'
//get owneraddress from storage
if ('Owner' in sessionStorage) {
  ownerAddress = window.sessionStorage.getItem('Owner')
}

// checks for events

sharedApartment.events.renterAdded(function(error, event){
  if(role != "OWNER") return
  alert('Renter added!  ' + event.returnValues['renter'])
  location.reload();
})

sharedApartment.events.renterRemoved(function(error, event){
  if(role != "OWNER") return
  alert('Renter removed!  ' + event.returnValues['renter'])
  location.reload();
})

sharedApartment.events.rentSet(function(error, event){
  if(role != "OWNER") return
  alert('New rent set to ' + web3.utils.fromWei(event.returnValues['rent']) + 'ETH')
  location.reload()
})

sharedApartment.events.rentCollected(function(error, event){
  if(role != "OWNER") return
  alert('Rent collected!  ' + web3.utils.fromWei(event.returnValues['rentCollected']) + 'ETH')
  location.reload()
})

sharedApartment.events.rentPaid(function(error, event){
  if(role != "RENTER") return
  alert('Rent paid!  ' + event.returnValues['renter'])
  location.reload()
})

// functions

// check for address change
window.ethereum.on('accountsChanged', function (accounts) {
  location.reload()
})

// check if wallet is installed
window.addEventListener('load', async function () {
    if(typeof window.ethereum !== 'undefined') {
        console.log('Wallet detected!')
        document.getElementById('address').innerHTML = web3.currentProvider.selectedAddress
        console.log("web3 selected address: " + web3.currentProvider.selectedAddress)
        if(web3.currentProvider.selectedAddress != null ) {
          document.getElementById('connect-mm').display = 'none'
        }
    } else {
        console.log('No wallet detected!')
        document.getElementById('address').innerHTML = 'No wallet detected!'
    }
    //building the website
  displayOwner()
  await getRole()
  displayForm()
  await fillForms()
})

document.getElementById('set-owner').addEventListener('click', async function () {
  await setOwnerAddress()
  await getRole()
  displayForm()
})

// connect metamask button
async function connectMM() {
    let brert = await window.ethereum.request({ method: 'eth_requestAccounts' })
    document.getElementById('address').innerHTML = brert
}

// displays owner address 
function displayOwner() {
  if (ownerAddress != '0x0000000000000000000000000000000000000000') {
    document.getElementById('ownerAddress').innerHTML = ownerAddress
  }
  else {
    document.getElementById('ownerAddress').innerHTML = 'No Apartment selected'
  }
}

// check if user is owner or renter
async function getRole() {
  if(ownerAddress.toLowerCase() == await web3.currentProvider.selectedAddress) {
      role = "OWNER"
      console.log('Role: '+ role)
      fillRenterList()
      return
  } else {
    let _rtAdLng = await sharedApartment.methods.getRenterAddressesLength(ownerAddress.toLowerCase()).call()
    console.log('getRole: RenterAddressLength: ' + _rtAdLng)
    for (let i = 0; i < _rtAdLng; i++) {
      let _rnAd = await sharedApartment.methods.getRenterAddress(ownerAddress.toLowerCase(), i).call()
      console.log('getRole: for loop: RenterAddress: ' + _rnAd)
      if (_rnAd.toLowerCase() == web3.currentProvider.selectedAddress.toLowerCase()) {
          role = "RENTER"
          console.log(role)
          return
      }
      }
    }
    console.log('Role: ' + role)
}

// displays options according to role
function displayForm() {
    console.log('displaying form for ' + role)
    let ownerForm = document.getElementById('owner-form')
    let renterForm = document.getElementById('renter-form')
    let newbieForm = document.getElementById('newbie-form')

    if (role == "" && web3.currentProvider.selectedAddress != null && document.getElementById('owner-address').value != '') {
      if(web3.currentProvider.selectedAddress.toLowerCase() == document.getElementById('owner-address').value.toLowerCase()) {
        role = 'OWNER'
        fillRenterList()
      } else {
        alert('You are not a renter or owner in the apartment of ' + document.getElementById('owner-address').value + ' ! Your address: ' + web3.currentProvider.selectedAddress)
        //document.getElementById('start-button').style.visibility = "hidden"
      }
    }

    if (role == "RENTER") {
        ownerForm.style.display = 'none'
        renterForm.style.display = "block"
        newbieForm.style.display = "none"
    } else if (role == "OWNER") {
        ownerForm.style.display = "block"
        renterForm.style.display = "none"
        newbieForm.style.display = "none"
    } else {
        ownerForm.style.display = "none"
        renterForm.style.display = "none"
        newbieForm.style.display = "block"
    }
}

// fills textinputs with correct values
async function fillForms() {
  var theRent = await sharedApartment.methods.addressToApartment(ownerAddress).call()
  //console.log(theRent)
  var theRentAmmount = theRent.rent.ammount
  document.getElementById('pay-rent').value = (web3.utils.fromWei(theRentAmmount, 'ether') + 'ETH')

  let theRentToCollect = theRent.rent.collectable
  document.getElementById('rent-to-collect').value = (web3.utils.fromWei(theRentToCollect, 'ether') + 'ETH')

  let theRentLastCollected = theRent.rent.lastCollected
  let date = new Date(Number(theRentLastCollected) * 1000)
  document.getElementById('rent-last-collected').value = date

  document.getElementById('address').innerHTML = web3.currentProvider.selectedAddress
}

// displays all renters on the website
async function fillRenterList() {
  if (ownerAddress.toLowerCase() != web3.currentProvider.selectedAddress) return //only execute if its the owner
  let renterList = document.getElementById('renter-list')
  let renterAddressesLength = await sharedApartment.methods.getRenterAddressesLength(ownerAddress).call({from: web3.currentProvider.selectedAddress})

  console.log(renterAddressesLength + '    -rentaddlength')
  
  for (let i = 0; i < renterAddressesLength; i++) {
    var _renAdd = await sharedApartment.methods.getRenterAddress(web3.currentProvider.selectedAddress, i).call()
    let renter = await sharedApartment.methods.getRenter(web3.currentProvider.selectedAddress, _renAdd).call()
    console.log(renter + '   -renter')
    let newRenter = document.createElement('div')
    newRenter.className = 'pure-u renter-box'
    newRenter.innerHTML = (
      '<b>Address</b><p>' +
      renter.renterAddress +
      '</p><b>Renter ID</b><p>' +
      renter.renterId +
      '</p><b>Paid rent</b><p>' +
      renter.paidRent +
      '</p><b>Strikes</b><p>' +
      renter.strikes +
      '</p>' +
      '<button class="pure-button" style="background-color: rgb(207, 85, 85);" onclick="removeRenter(\'' + 
      renter.renterAddress +
      '\')">Remove renter</button>'
    )

    renterList.appendChild(newRenter)
  }
}

// smartcontract interaction functions

// sets the owner address for the frontend
async function setOwnerAddress() {
  var _ownerAddress = document.getElementById('owner-address').value.toLowerCase()
  var aprtownr = await sharedApartment.methods.addressToApartment(_ownerAddress).call()
  aprtownr = aprtownr.owner.toLowerCase()
  if (aprtownr == _ownerAddress) { //check if apartment exists
    ownerAddress = _ownerAddress
    displayOwner()
    window.sessionStorage.setItem('Owner',ownerAddress)
  } else {
    alert('The Shared Apartment with the owner ' + _ownerAddress + ' does not exist!')
  }
}
// creates apartment with current address as owner
async function createApartment() {
  await sharedApartment.methods.createApartment().send({from: web3.givenProvider.selectedAddress})
}

async function deleteApartment() {
  await sharedApartment.methods.deleteApartment().send({from: web3.givenProvider.selectedAddress})
}

async function addRenter() {
  if (web3.givenProvider.selectedAddress != ownerAddress.toLocaleLowerCase()) return
  let renterAddress = document.getElementById('add-renter').value
  await sharedApartment.methods.addRenter(renterAddress).send({from: web3.givenProvider.selectedAddress})
}

async function removeRenter(renterAddress) {
  if (web3.givenProvider.selectedAddress != ownerAddress.toLocaleLowerCase()) return
  await sharedApartment.methods.removeRenter(renterAddress).send({from: web3.givenProvider.selectedAddress})
}

async function setRent() {
  if (web3.givenProvider.selectedAddress != ownerAddress.toLocaleLowerCase()) {
    alert(web3.givenProvider.selectedAddress + '  ' + ownerAddress)
  }
  let theRent = web3.utils.toWei(document.getElementById('new-rent').value, 'ether')
  await sharedApartment.methods.setRent(theRent).send({from: web3.givenProvider.selectedAddress})
}

async function collectRent() {
  if (web3.givenProvider.selectedAddress != ownerAddress) return
  await sharedApartment.methods.collectRent().send({from: web3.currentProvider.selectedAddress})
}

async function payRent() {
    let theRenter = await sharedApartment.methods.getRenter(ownerAddress, web3.givenProvider.selectedAddress).call()
    if (theRenter.paidRent == true) {
        alert('You already paid rent this month!')
        return
    }

    let theRent = await sharedApartment.methods.addressToApartment(ownerAddress).call()
    theRent = theRent.rent.ammount
    let transaction = {
        from: web3.currentProvider.selectedAddress,
        value: theRent
    }
    await sharedApartment.methods.payRent(ownerAddress).send(transaction)
}