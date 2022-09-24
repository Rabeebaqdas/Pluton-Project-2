const { ethers, network } = require("hardhat")
const fs = require("fs")
const frontendContractFile = "../client/src/constants/networkMapping.json"
const frontendAbi = "../client/src/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONTEND) {
        console.log("updating front end........")
         await updateContractAddresses();
        await updateAbi()
        console.log("Frontend Updated Successfully")
    }
}

const updateContractAddresses = async () => {
     const token = await ethers.getContract("MyToken")
    const chainId = network.config.chainId.toString()
    const contractAddress = JSON.parse(fs.readFileSync(frontendContractFile, "utf-8"))
    if (chainId in contractAddress) {
        if (!contractAddress[chainId]["Token"].includes(token.address)) {
            contractAddress[chainId]["Token"].push(token.address)
        } 

    }else {
        contractAddress[chainId] = {"Token": [token.address]}
   }
   console.log("Done!")


   fs.writeFileSync(frontendContractFile, JSON.stringify(contractAddress))

}

const updateAbi = async () => {
    const token = await ethers.getContract("MyToken")
    fs.writeFileSync(`${frontendAbi}Token.json`, token.interface.format(ethers.utils.FormatTypes.json))
}
module.exports.tags = ['all', 'frontend']