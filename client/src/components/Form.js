import { ethers } from 'ethers'
import React, { useState } from 'react'
import { useMoralis, useWeb3Contract } from "react-moralis"
import networkMapping from "../constants/networkMapping.json"
import tokenabi from "../constants/Token.json"
const Form = () => {
    const [formParams, updateFormParams] = useState({ name: '', amount: ''});
    const {runContractFunction, isLoading} = useWeb3Contract()
  const { isWeb3Enabled, chainId } = useMoralis()
  const chainString = chainId ? parseInt(chainId).toString() : "31337"
   const tokenAddress = networkMapping[chainString]?.Token[0]
    console.log("aasd",tokenAddress)
    const submit = async(e) => {
        e.preventDefault(); 
        const options = {
            abi: tokenabi,
            contractAddress: tokenAddress,
            functionName: "transfer",
            params: {
                to: formParams.name,
                amount: ethers.utils.parseEther(`${formParams.amount}`).toString()
            }  
        }
        await runContractFunction({
            params: options,
            onSuccess:console.log("success"),
            onError:console.log("Error")
          })
          updateFormParams({name:"", amount:""})
    }

    
  return (
    <div className="">
        {
            isWeb3Enabled ? (
                <div className="flex flex-col place-items-center mt-10" id="nftForm">
                <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4" onSubmit={submit}>
                <h3 className="text-center font-bold text-purple-500 mb-8">Transfer Your Tokens To other Person</h3>
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Account Address</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="0xfdb039899F5BfeAc8bc3cd898A0E807d31849Fde" disabled={isLoading} onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Tokens</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Enter amount of Tokens" step="0.01" disabled={isLoading} value={formParams.amount} onChange={e => updateFormParams({...formParams, amount: e.target.value})}></input>
                    </div>
                  
                    <input type="submit" className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg" disabled={isLoading} />
        
                </form>
            </div>
            ) : "Please Connect Your Wallet"
        }
 
    </div>
  )
}

export default Form