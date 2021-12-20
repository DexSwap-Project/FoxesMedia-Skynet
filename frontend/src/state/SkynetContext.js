import React, { createContext, useState, useEffect } from 'react';
import { SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

const SkynetContext = createContext(undefined);
const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
const client = new SkynetClient(portal);
const contentRecord = new ContentRecordDAC();
const dataDomain = window.location.hostname === 'localhost' ? 'localhost' : 'skynet-mysky.hns';




const SkynetProvider = ({ children }) => {
  const [skynetState, setSkynetState] = useState({
    client,
    mySky: null,
    contentRecord,
    dataDomain,
  });

  useEffect(() => {
    async function initMySky() {
      try {
        const mySky = await client.loadMySky(dataDomain, {
          debug: true,
          dev: true,
        });

        await mySky.loadDacs(contentRecord);
        setSkynetState({ ...skynetState, mySky });
      } catch (e) {
        console.error(e);
      }
    }

    if (!skynetState.mySky) {
      initMySky();
    }

    return () => {
      if (skynetState.mySky) {
        skynetState.mySky.destroy();
      }
    };
  }, [skynetState]);

  return (
    <SkynetContext.Provider value={skynetState}>
      {children}
    </SkynetContext.Provider>
  );
};


export { SkynetContext, SkynetProvider };
