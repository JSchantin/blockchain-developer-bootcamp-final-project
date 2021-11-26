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
          "indexed": true,
          "internalType": "struct SharedApartment.Renter",
          "name": "renter",
          "type": "tuple"
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
          "indexed": true,
          "internalType": "struct SharedApartment.Renter",
          "name": "renter",
          "type": "tuple"
        }
      ],
      "name": "renterAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
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
          "indexed": true,
          "internalType": "struct SharedApartment.Renter",
          "name": "renter",
          "type": "tuple"
        }
      ],
      "name": "renterRemoved",
      "type": "event"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "inputs": [],
      "name": "payRent",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]
const saAddress = '0x7D557F23a160F0c1a02FEff81196b349Ba3dB024'
const sharedApartment = new web3.eth.Contract(abi, saAddress)
sharedApartment.setProvider(window.ethereum)

let role = ""

window.addEventListener('load', function () {
    if(typeof window.ethereum !== 'undefined') {
        console.log('Wallet detected!')
        fillForms()
    } else {
        console.log('No wallet detected!')
    }
    displayOwner()
})

const cmButton = document.getElementById('connect-mm')
cmButton.onclick = async () => {
    let brert = await window.ethereum.request({ method: 'eth_requestAccounts' })
    document.getElementById('address').innerHTML = brert
    getRole()
}

async function displayOwner() {
    let brert = await sharedApartment.methods.owner().call()
    document.getElementById('ownerAddress').innerHTML = brert
    console.log(brert)
}

// check if user is owner or renter
async function getRole() {
    let brert = await sharedApartment.methods.owner().call()
    let brort = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // console.log(brert)
    // console.log(brort)
    if(brert.toLowerCase() === brort[0]) {
        role = "OWNER"
        console.log(role)
        displayForm()
        return
    } else {
        let brart = 'undefined'
        //needed if renterAddresses array is empty
        try {
            brart = await sharedApartment.methods.renterAddresses(0).call()
        } finally {
            // console.log(brart)
            if (brart == 'undefined') {
                console.log(role)
                displayForm()
                return
            }
        }

        for (let i = 0; brart != 'undefined' && role != "RENTER"; i++) {
            try {
                brart = await sharedApartment.methods.renterAddresses(i).call()
            } catch { 
                return
            }
            if (brart.toLocaleLowerCase() == brort[0]) {
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

function displayForm() {
    console.log('displaying form for ' + role)
    let ownerForm = document.getElementById('owner-form')
    let renterForm = document.getElementById('renter-form')
    let newbieForm = document.getElementById('newbie-form')

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

async function addRenter() {
    let renterAddress = document.getElementById('add-renter').value
    await sharedApartment.methods.addRenter(renterAddress).send({from: web3.givenProvider.selectedAddress})
}

async function removeRenter() {
    let renterAddress = document.getElementById('remove-renter').value
    await sharedApartment.methods.removeRenter(renterAddress).send({from: web3.givenProvider.selectedAddress})
}

async function setRent() {
    let theRent = web3.utils.toWei(document.getElementById('new-rent').value, 'ether')
    await sharedApartment.methods.setRent(theRent).send({from: web3.givenProvider.selectedAddress})
}

async function collectRent() {
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

async function fillForms() {
    let theRent = await sharedApartment.methods.rent().call()
    document.getElementById('pay-rent').value = (web3.utils.fromWei(theRent, 'ether') + 'ETH')

    let theRentToCollect = await sharedApartment.methods.rentToCollect().call()
    document.getElementById('rent-to-collect').value = (web3.utils.fromWei(theRentToCollect, 'ether') + 'ETH')

    let theRentLastCollected = await sharedApartment.methods.rentLastCollected().call()
    let date = new Date(Number(theRentLastCollected))
    document.getElementById('rent-last-collected').value = date
}