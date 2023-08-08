"use client"
import React, { useEffect, useState, useContext } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import truncateMiddle from "../utils/truncate";
import { Stacks } from '@providers/StacksProvider'

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

const ConnectWallet = () => {
  const { appDetails, network } = useContext(Stacks)
  const [stxHover, setStxHover] = useState(false)

  const [mounted, setMounted] = useState(false);
  useEffect(() => {setMounted(true)}, []);

  const handleStxHover = () => { setStxHover(prevStxHover => !prevStxHover) }


const authenticate = () => {
  showConnect({
    userSession,
    network,
    appDetails,
    onFinish: () => {
      window.location.reload();
    },
    onCancel: () => {
      window.location.reload();
    }
  });
}

const disconnect = () => {
  userSession.signUserOut("/");
}
  
  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div className="pill--container">
        <div className="pill--wrapper stx">
          <button className='pill--button' onClick={disconnect} onMouseOver={handleStxHover} onMouseLeave={handleStxHover}>
            {stxHover ? 'Disconnect' : truncateMiddle(userSession.loadUserData().profile.stxAddress.testnet).toLowerCase()}
          </button>

        </div>


      </div>
    );
  }

  return (
    <button className='button--connect' onClick={authenticate}>
      Connect
    </button>
  );
};

export default ConnectWallet;