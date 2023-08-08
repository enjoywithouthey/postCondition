"use client"
import { createContext, useEffect, useState, useContext } from "react"
import { useConnect } from "@stacks/connect-react";
import { userSession } from "@components/ConnectWallet";
import { Stacks } from "@providers/StacksProvider"
import toast from 'react-hot-toast'
import {
    NonFungibleConditionCode,
    FungibleConditionCode,
    createAssetInfo,
    makeStandardNonFungiblePostCondition,
    makeContractNonFungiblePostCondition,
    makeStandardSTXPostCondition,
    AnchorMode,
    bufferCVFromString,
    cvToString,
    cvToValue,
    uintCV,
    standardPrincipalCV,
    stringAsciiCV,
    principalCV,
    callReadOnlyFunction
  } from "@stacks/transactions";

const Clarity = createContext()

function ClarityProvider({children}) {
    const { appDetails, network } = useContext(Stacks)
    const { doContractCall } = useConnect();
    const [ senderAddress, setSenderAddress ] = useState('')
    const anchorMode = AnchorMode.Any


    useEffect(() => {
      if (userSession.isUserSignedIn()) {
        setSenderAddress(userSession.loadUserData().profile.stxAddress.testnet)
      }
    }, [])


// ==================================== MINT FUNCTION ============================================ 

  const mint = async(id, mintPrice, contractAddress, contractName) => {
    const postConditionAddress = senderAddress;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = mintPrice;
    const postConditions = [makeStandardSTXPostCondition( postConditionAddress, postConditionCode, postConditionAmount )]
    
    doContractCall({ network, anchorMode, appDetails, contractAddress: contractAddress, contractName: contractName, functionName: "mint", functionArgs: [uintCV(id)],
      postConditions,
      onFinish: (data) => {
        console.log("onFinish:", data);
        console.log("Explorer:", `localhost:8000/txid/${data.txId}?chain=testnet`);
        toast(<div className={'toast--wrapper'}>
              <p>Mint Transaction Submitted</p>
              <a href={`http://localhost:8000/txid/${data.txId}?chain=testnet`} target="_blank">Check status on block explorer</a>
              </div>)
      }, onCancel: () => { console.log("onCancel:", "Transaction was cancelled")}})}


  const buy = async(id, listPrice, contractAddress, contractName) => {
    const postConditionAddress = senderAddress;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = listPrice
    const standardSTXPostCondition = makeStandardSTXPostCondition(
      postConditionAddress,
      postConditionCode,
      postConditionAmount
      );
    doContractCall({
      network, anchorMode, appDetails, contractAddress: contractAddress, contractName: contractName,
      functionName: "buy",
      functionArgs: [uintCV(id)],
      postConditions: [standardSTXPostCondition],
      onFinish: (data) => {
        console.log("onFinish:", data);
        console.log("Explorer:", `localhost:8000/txid/${data.txId}?chain=testnet`);
        toast(<div className={'toast--wrapper'}>
          <p>Buy Transaction Submitted</p>
          <a href={`http://localhost:8000/txid/${data.txId}?chain=testnet`} target="_blank">Check status on block explorer</a>
        </div>)
      },onCancel: () => {console.log("onCancel:", "Transaction was canceled")}})}


  const transfer = async(id, contractAddress, contractName, recipientAddress) => {
    const postConditionAddress = senderAddress
    const nftConditionCode = NonFungibleConditionCode.Sends
    const assetAddress = contractAddress
    const assetContractName = contractName
    const assetName = contractName
    const tokenAssetName = bufferCVFromString(contractName)
    const nonFungibleAssetInfo = createAssetInfo(
        assetAddress,
        assetContractName,
        assetName
    )

    const stxConditionCode = FungibleConditionCode.LessEqual;
    const stxConditionAmount = 0; // denoted in microstacks

    const postConditions = [
        makeStandardNonFungiblePostCondition(
          postConditionAddress,
          nftConditionCode,
          nonFungibleAssetInfo,
          tokenAssetName
        )
        // ,
        // makeStandardSTXPostCondition(
        //   postConditionAddress,
        //   stxConditionCode,
        //   stxConditionAmount
        // )
    ]
      
    doContractCall({
      network, anchorMode, appDetails, contractAddress: contractAddress, contractName: contractName,
      functionName: "transfer",
      functionArgs: [
        uintCV(id),
        standardPrincipalCV(senderAddress),
        standardPrincipalCV(recipientAddress)],
        postConditions: postConditions,
      onFinish: (data) => {
        console.log("onFinish:", data);
        console.log("Explorer:", `localhost:8000/txid/${data.txId}?chain=testnet`);
        toast(<div className={'toast--wrapper'}>
          <p>Transfer Transaction Submitted</p>
          <a href={`http://localhost:8000/txid/${data.txId}?chain=testnet`} target="_blank">Check status on block explorer</a>
        </div>)
      },onCancel: () => {console.log("onCancel:", "Transaction was canceled")}})}


  
    return (
        <Clarity.Provider value={{
            mint,
            buy,
            transfer
        }}>
            {children}
        </Clarity.Provider>
    )
}

export { ClarityProvider, Clarity }