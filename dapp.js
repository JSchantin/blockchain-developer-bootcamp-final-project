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
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
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
    "type": "fallback",
    "payable": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "rent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "rentLastCollected",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "rentToCollect",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "renterAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "renters",
    "outputs": [
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
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renterAddressesLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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
    "inputs": [],
    "name": "payRent",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
]
// const saAddress = '0x57764D0034B18FA8aA2CC76AA422cd97d5699Dc4' //rinkeby
const saAddress = '0xa82729d001a2f3aaB52435755035fb57310255B7' //localhost
const sharedApartment = new web3.eth.Contract(abi, saAddress)
sharedApartment.setProvider(window.ethereum)

let role = ""

// check for events

sharedApartment.events.renterAdded(function(error, event){
  if(role != "OWNER") return
  alert('Renter added!')
  location.reload();
})

sharedApartment.events.renterRemoved(function(error, event){
  if(role != "OWNER") return
  alert('Renter removed!')
  location.reload();
})

sharedApartment.events.rentSet(function(error, event){
  if(role != "OWNER") return
  alert('New rent set to ' + web3.utils.fromWei(event.returnValues['rent']) + 'ETH')
})

sharedApartment.events.rentCollected(function(error, event){
  if(role != "OWNER") return
  alert('Rent collected!')
  location.reload();
})

sharedApartment.events.rentPaid(function(error, event){
  if(role != "RENTER") return
  alert('Rent paid!')
})

// functions

// check if wallet is installed
window.addEventListener('load', async function () {
    if(typeof window.ethereum !== 'undefined') {
        console.log('Wallet detected!')
        web3.setProvider(window.ethereum)
        console.log("web3 selected address: " + web3.currentProvider.selectedAddress)
    } else {
        console.log('No wallet detected!')
        document.getElementById('address').innerHTML = 'No wallet detected!'
    }
    getRole()
    fillRenterList()
    displayOwner()
    fillForms()
})

// connect metamask button
async function connectMM() {
    let brert = await window.ethereum.request({ method: 'eth_requestAccounts' })
    document.getElementById('address').innerHTML = brert
    getRole()
}

// displays owner address 
async function displayOwner() {
    let brert = await sharedApartment.methods.owner().call()
    document.getElementById('ownerAddress').innerHTML = brert
}

// check if user is owner or renter
async function getRole() {
  role = ""
  let brert = await sharedApartment.methods.owner().call()
  let brort = web3.currentProvider.selectedAddress
  if(brert.toLowerCase() === brort) {
      role = "OWNER"
      console.log(role)
      displayForm()
      return
  } else {
    let renterAddressesLength = await sharedApartment.methods.renterAddressesLength().call()
    let brart ='0x0'
    for (let i = 0; i < renterAddressesLength; i++) {
      let brart = await sharedApartment.methods.renterAddresses(i).call()
      if (brart.toLowerCase() === brort) {
          role = "RENTER"
          console.log(role)
          displayForm()
          return
      }
      }
    }
    console.log(role)
    displayForm()
}

// displays options according to role
function displayForm() {
    console.log('displaying form for ' + role)
    let ownerForm = document.getElementById('owner-form')
    let renterForm = document.getElementById('renter-form')
    let newbieForm = document.getElementById('newbie-form')

    if (role == "" && web3.currentProvider.selectedAddress != null) {
      document.getElementById('start-text').innerHTML = "You are not a renter in this apartment!"
      document.getElementById('start-button').style.visibility = "hidden"
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
  let theRent = await sharedApartment.methods.rent().call()
  document.getElementById('pay-rent').value = (web3.utils.fromWei(theRent, 'ether') + 'ETH')

  let theRentToCollect = await sharedApartment.methods.rentToCollect().call()
  document.getElementById('rent-to-collect').value = (web3.utils.fromWei(theRentToCollect, 'ether') + 'ETH')

  let theRentLastCollected = await sharedApartment.methods.rentLastCollected().call()
  let date = new Date(Number(theRentLastCollected) * 1000)
  document.getElementById('rent-last-collected').value = date

  document.getElementById('address').innerHTML = web3.currentProvider.selectedAddress
}

// displays all renters on the website
async function fillRenterList() {
  // if(role != 'OWNER') {return}
  let renterList = document.getElementById('renter-list')
  let renterAddressesLength = await sharedApartment.methods.renterAddressesLength().call()

  for (let i = 0; i < renterAddressesLength; i++) {
    let hjfg = await sharedApartment.methods.renterAddresses(i).call()
    let renter = await sharedApartment.methods.renters(hjfg).call()
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

async function addRenter() {
    let renterAddress = document.getElementById('add-renter').value
    await sharedApartment.methods.addRenter(renterAddress).send({from: web3.givenProvider.selectedAddress})
}

async function removeRenter(renterAddress) {
    await sharedApartment.methods.removeRenter(renterAddress).send({from: web3.givenProvider.selectedAddress})
}

async function setRent() {
    let theRent = web3.utils.toWei(document.getElementById('new-rent').value, 'ether')
    await sharedApartment.methods.setRent(theRent).send({from: web3.givenProvider.selectedAddress})
}

async function collectRent() {
  let lastCollectedDate = await sharedApartment.methods.rentLastCollected().call()
  // lastCollectedDate = new Date(lastCollectedDate * 1000)
  // console.log(lastCollectedDate.setTime(lastCollectedDate.getTime() + 2592 * 1000000))
  // if (lastCollectedDate.setTime(lastCollectedDate.getTime()) < Date.now()) {
  //   console.log('fwejqun')
  // }
    let transaction = {
        from: web3.currentProvider.selectedAddress,
    }
    await sharedApartment.methods.collectRent().send(transaction)
}

async function payRent() {
    let theRenter = await sharedApartment.methods.renters(web3.givenProvider.selectedAddress).call()
    if (theRenter.paidRent == true) {
        alert('You already paid rent this month!')
        return
    }

    let theRent = await sharedApartment.methods.rent().call()
    let transaction = {
        from: web3.currentProvider.selectedAddress,
        value: theRent
    }
    await sharedApartment.methods.payRent().send(transaction)
}