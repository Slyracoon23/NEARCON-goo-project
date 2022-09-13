import { useForm } from 'react-hook-form'

import { MetadataField } from 'mintbase'

import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'

import { useState, useEffect } from 'react'

import { useWallet } from '../services/providers/MintbaseWalletContext'


import {
  WalletConnection,
  Contract,
  ConnectedWalletAccount,
  Near,
  keyStores,
  connect,
  transactions
} from 'near-api-js';

import { initApiControl } from '@roketo/sdk';



import { getIncomingStreams, createStream } from '@roketo/sdk';

import type { Action as NearAction } from 'near-api-js/lib/transaction';


import { FTContract, RoketoContract, TransactionMediator } from '@roketo/sdk/dist/types';


const NEAR_CONSTANTS = {
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  networkId: 'testnet',
  roketoContractName: 'streaming-r-v2.dcversus.testnet', 
  financeContractName: 'finance-r-v2.dcversus.testnet',
  wNearContractName: 'wrap.testnet',
};



const Streamer = () => {
  const { wallet, isConnected, details } = useWallet()
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isMinting, setIsMinting] = useState<boolean>(false)



  const handleClick = async () => {
    if (!isConnected) {
      const keyStore = new keyStores.BrowserLocalStorageKeyStore();

      const near = await connect({
        nodeUrl: NEAR_CONSTANTS.nodeUrl,
        walletUrl: NEAR_CONSTANTS.walletUrl,
        networkId: NEAR_CONSTANTS.networkId,
        keyStore,
        headers: {},
      });
      const walletConnection = new WalletConnection(near, NEAR_CONSTANTS.roketoContractName);
      const account = walletConnection.account();


      await walletConnection.requestSignIn(NEAR_CONSTANTS.roketoContractName, 'Feed-a-cat');


      console.log("Not connected");
    } else {
      const fishTokenAccountId = 'fish.lebedev.testnet';

      const keyStore = new keyStores.BrowserLocalStorageKeyStore();


      const near = await connect({
        nodeUrl: NEAR_CONSTANTS.nodeUrl,
        walletUrl: NEAR_CONSTANTS.walletUrl,
        networkId: NEAR_CONSTANTS.networkId,
        keyStore,
        headers: {},
      });


      // @ts-ignore
      const walletConnection = new WalletConnection(near, NEAR_CONSTANTS.roketoContractName);
      const account = walletConnection.account();

      // await walletConnection.requestSignIn(NEAR_CONSTANTS.roketoContractName, 'Feed-a-cat');

      

      // setAccount(account);

      const transactionMediator: TransactionMediator<NearAction> = {
       // @ts-expect-error signAndSendTransaction is protected
       functionCall: (...args) => transactions.functionCall(...args),
       // @ts-expect-error signAndSendTransaction is protected
       signAndSendTransaction: (...args) => account.signAndSendTransaction(...args),
     };

    //  setTransactionMediator(transactionMediator);

     const { contract } = await initApiControl({
       account,
       transactionMediator,
       roketoContractName: NEAR_CONSTANTS.roketoContractName,
     });



    //  setContract(contract);



      const fishContract = new Contract(account, fishTokenAccountId, {
        viewMethods: ['ft_balance_of', 'ft_metadata', 'storage_balance_of'],
        changeMethods: ['ft_transfer_call', 'storage_deposit', 'near_deposit'],
      }) as FTContract;



      await createStream({
        comment: '',
        deposit: '1000000',
        commissionOnCreate: '0',
        receiverId: 'cat.lebedev.testnet',
        tokenAccountId: fishTokenAccountId,
        tokensPerSec: '1000',
        color: null,
        accountId: account.accountId,
        tokenContract: fishContract,
        transactionMediator,
        roketoContractName: NEAR_CONSTANTS.roketoContractName,
        wNearId: NEAR_CONSTANTS.wNearContractName,
        financeContractName: NEAR_CONSTANTS.financeContractName,
      });
    }
  };


  if (!isConnected) return <div>Connect your wallet</div>

  // if (loading) return <div>Loading...</div>

  return (
    <div className="w-full m-8 ">
      <div
        className="bg-white rounded px-8 pt-6 pb-8 mb-4 "      >
        <div className="mb-4">
          <h1 className="font-semibold text-gray-700 smb-2 text-xl leading-tight sm:leading-normal">
            Simple Streamer
          </h1>
        </div>
        {isMinting ? (
          <div className="w-full py-2 px-4 rounded bg-gray-200 text-center text-black font-bold mb-2">
            Creating your mint transaction...
          </div>
        ) : (
          <div className="flex items-center flex-row-reverse justify-between">
            <button 
              type="button"
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              onClick={handleClick}
            >
              Stream
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Streamer
