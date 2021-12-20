import { useState } from 'react';
import { SkynetClient } from 'skynet-js';

const client = new SkynetClient('https://siasky.net');

export const useSkyDBSetJson = () => {
  const [status, setStatus] = useState('');

  const setJSON = async (privateKey, dataKey, username, firstname, lastname, userID) => {
    try {
      setStatus('setting');
      
      await client.db.setJSON(privateKey, dataKey, username, firstname, lastname, userID);

      setStatus('completed');
    } catch (error) {
      setStatus('error');
    }
  };

  return [status, setJSON];
};

export const useSkyDBGetJson = () => {
  const [status, setStatus] = useState('');
  const [skyDbEntry, setSkyDbEntry] = useState({});

  const getJSON = async (publicKey, dataKey, username, firstname, lastname, userID) => {
    try {
      setStatus('getting');

      const response = await client.db.getJSON(publicKey, dataKey, username, firstname, lastname, userID);
      setSkyDbEntry(response.data);

      setStatus('completed');
    } catch (error) {
      setStatus('error');
    }
  };

  return [skyDbEntry, status, getJSON];
};
