"use client"
import "@styles/globals.css"

import { appDetails } from "@lib/constants";
import { Connect } from "@stacks/connect-react";
import { userSession } from "@components/ConnectWallet";
import { ClarityProvider } from "@providers/ClarityProvider";
import { StacksProvider } from "@providers/StacksProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head title="Bitcoin Maximalists"></head>
      <body>
        <StacksProvider>
          <Connect
            authOptions={{
              appDetails,
              redirectTo: "/",
              onFinish: () => {
                window.location.reload();
              },
              userSession,
            }}>
                    <ClarityProvider>
                        <div className="page">
                                <div className="container">
                                  {children}
                                </div>
                        </div>
                    </ClarityProvider>
            </Connect>
          </StacksProvider> 
        </body>
    </html>
  )
}
