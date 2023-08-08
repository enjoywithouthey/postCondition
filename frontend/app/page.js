"use client"
import { useContext } from "react";
import { Clarity } from '@providers/ClarityProvider'
import ConnectWallet from '@components/ConnectWallet'
import { Toaster } from "react-hot-toast";


export default function Home() {
  const { mint, transfer } = useContext(Clarity)

  const contractAddress = "STB8E0SMACY4A6DCCH4WE48YGX3P877407QW176V"
  const contractName=  "dev"
  const tokenId = 2
  const mintPrice = 420000000
  const recipientAddress = "ST2RJ8YA4Y2PYR5JJW1AX6F5CS6CMTGG5TR5B4RCM"

    const handleMint = () => {
      mint(tokenId, mintPrice, contractAddress, contractName)
    }

    const handleTransfer = () => {
      transfer(1, contractAddress, contractName, recipientAddress)
    }

  return (
      <div className="container">
        <ConnectWallet />
       <button onClick={() => handleMint()}>Mint</button>
       <button onClick={() => handleTransfer()}>Transfer</button>
       <Toaster
                    containerStyle={{ top: 20 }}
                    toastOptions={{
                        duration: 10000,
                        style: {
                        border: '2px solid #ff9800'
                        }}}/>
      </div>
  )
}
