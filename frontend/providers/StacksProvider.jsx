"use client"
import { createContext } from "react"
import { appDetails } from "@lib/constants";
import { StacksMainnet, StacksTestnet, StacksMocknet } from "@stacks/network";

const Stacks = createContext()

function StacksProvider({children}) {
       const network = new StacksMocknet()

      return (
        <Stacks.Provider value={{
            appDetails,
            network,
        }}>
          {children}
        </Stacks.Provider>
      )
}

export { StacksProvider, Stacks }