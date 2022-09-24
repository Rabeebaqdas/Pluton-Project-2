const {run} = require("hardhat")


const verify = async (contractAddress, args) => {
    console.log("Verifying Contract........")
    try{
        await run("verify:verify",{
            address : contractAddress,
            constructorArguments:args,
            contract: "contracts/MyToken.sol:MyToken"
        })
    }catch(err){
        if(err.message.toLowerCase().includes('already verified')){
            console.log("Already Verified!")
        }else {
            console.log(err)
        }
    }
}

module.exports = {verify};