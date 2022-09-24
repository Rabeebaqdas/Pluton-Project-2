const {ethers} = require("hardhat")
const amount = ethers.utils.parseEther("1","eth")
const transfer = async() => {
    const token = await ethers.getContract("MyToken")
    console.log("Transfering................")
    const balance = await token.transfer("0xfdb039899F5BfeAc8bc3cd898A0E807d31849Fde",amount)
    balance.wait(1)
    console.log("Completed!")


}

const main = async() => {
    try {
        await transfer()
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
    }
    main()