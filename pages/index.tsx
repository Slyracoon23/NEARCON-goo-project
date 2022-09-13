import Head from 'next/head'
import Hero from '../components/Hero'
import Minter from '../components/Minter'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'
import Image from 'next/image'


import { useEffect, useState } from 'react';

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

// import { NEAR_CONSTANTS } from '../constants/roketo';

import defaultCat from '../public/img/defaultCat.png';
import fedCat from '../public/img/fedCat.png';
import hungryCat from '../public/img/hungryCat.png';


const links = [
  {
    href: 'https://testnet.mintbase.io/developer',
    title: 'Get an API Key',
    description:
      'The key to authenticate your app. This is used for file uploads and fetching useful information.',
  },
  {
    href: 'https://docs.mintbase.io/dev/getting-started',
    title: 'Documentation',
    description: 'Find in-depth information about Mintbase features and API.',
  },
  {
    href: 'https://github.com/mintbase/examples',
    title: 'Examples',
    description: 'Discover and deploy boilerplate example Mintbase projects.',
  },
  {
    href: 'https://testnet.mintbase.io/create',
    title: 'Deploy a contract',
    description: 'The first step for an on-chain adventure.',
  },
]

const FEEDING_SPEED_THRESHOLD = 10000;

const NEAR_CONSTANTS = {
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  networkId: 'testnet',
  roketoContractName: 'streaming-r-v2.dcversus.testnet', 
  financeContractName: 'finance-r-v2.dcversus.testnet',
  wNearContractName: 'wrap.testnet',
};

const Home = () => {

  const { wallet, isConnected, details } = useWallet()

  const [catImage, setCatImage] = useState(defaultCat);


  const [feedingSpeed, setFeedingSpeed] = useState<number | null>(null);


  const [account, setAccount] = useState<ConnectedWalletAccount>(null);

  const [contract, setContract] = useState<RoketoContract>(null);

  const [transactionMediator, setTransactionMediator] = useState<TransactionMediator>(null);

  // useEffect( () => {
  //   (async () => {
  //      // @ts-ignore
  //      const walletConnection = new WalletConnection(wallet?.activeNearConnection , NEAR_CONSTANTS.roketoContractName);
  //      const account = walletConnection.account();

  //      setAccount(account);

  //      const transactionMediator: TransactionMediator<NearAction> = {
  //       // @ts-expect-error signAndSendTransaction is protected
  //       functionCall: (...args) => transactions.functionCall(...args),
  //       // @ts-expect-error signAndSendTransaction is protected
  //       signAndSendTransaction: (...args) => account.signAndSendTransaction(...args),
  //     };

  //     setTransactionMediator(transactionMediator);

  //     const { contract } = await initApiControl({
  //       account,
  //       transactionMediator,
  //       roketoContractName: NEAR_CONSTANTS.roketoContractName,
  //     });

  //     setContract(contract);


  //   })();
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     const streams = await getIncomingStreams({
  //       from: 0,
  //       limit: 500,
  //       accountId: 'cat.lebedev.testnet',
  //       contract,
  //     });

  //     const currentFeedingSpeed = streams.reduce((speed, { tokens_per_sec }) => speed + Number(tokens_per_sec), 0);

  //     setCatImage((currentCat) => {
  //       if (currentCat !== defaultCat) {
  //         return defaultCat;
  //       } else {
  //         return currentFeedingSpeed >= FEEDING_SPEED_THRESHOLD ? fedCat : hungryCat;
  //       }
  //     });

  //     setFeedingSpeed(currentFeedingSpeed);
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, [contract]);  


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

      setAccount(account);

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



  return (
    <>
      <Head>
        <title>Mintbase Engineering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />

      <Container className="flex justify-center my-24">


      <div className="App">
      <header className="App-header">
        <Image src={catImage} className="cat" alt="cat" />
        <p>
          <a className="underline" href="https://github.com/roke-to/roketo-sdk-sample#how-to-feed-the-cat">The guide to cat feeding.</a>
        </p>
        {feedingSpeed !== null ? (
          <>
            <p>Current feeding speed is {feedingSpeed}/{FEEDING_SPEED_THRESHOLD} FISH tokens per second.</p>
            <p>{feedingSpeed > FEEDING_SPEED_THRESHOLD ? 'The cat is fed.' : 'The cat is hungry.'}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleClick}>
          {isConnected ? 'Feed the cat 1000 FISH tokens per second' : 'Log in'}
        </button>
      </header>
    </div>

        {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:gap-12">
          {links.map((link, index) => (
            <Link href={link.href} key={'link' + index} passHref>
              <a>
                <div className="flex w-auto max-w-64 h-full">
                  <Card title={link.title} description={link.description} />
                </div>
              </a>
            </Link>
          ))}
        </div> */}
      </Container>
    </>
  )
}

export default Home
