const ethers = require("ethers")
const ABI = require("./abi/myToken.json")
require('dotenv').config()

async function main () { 
    const address = "0x91ecdB02434759AC6974af556b311de6173258B6"
    const provider = new ethers.providers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_WEBSOCKET}`)
    const contract = new ethers.Contract(address,ABI,provider)
    contract.on("Transfer",async(from, to, value, event) => {
        let info = {
            from: from,
            to: to,
            value: ethers.utils.formatUnits(value),
            data: event
        };
        console.log(info)
        console.log("----------------------------------------------------")
        console.log(from)
        console.log("----------------------------------------------------")
        console.log(to)
        console.log("----------------------------------------------------")
        console.log(value.toString())

        const res = await contract.balanceOf("0xcA2Ba2ddecfBa372690871D5EE36b472496c4a9c")
    console.log("BALANCE")
    console.log(ethers.utils.formatUnits(res))


    });  

}

main()