import Head from 'next/head'
import Hero from '../components/Hero'
import Minter from '../components/Minter'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../components/Navbar'


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
import NearCon from '../public/img/nearcon.png';


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


const GlobalStyle = `
@font-face {
  font-family: 'Satoshi';
  src: url('https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2') format('woff2'),
      url('https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff') format('woff'),
      url('https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.ttf') format('truetype');
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Satoshi';
  src: url('https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2') format('woff2'),
      url('https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff') format('woff'),
      url('https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf') format('truetype');
  font-weight: 600;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Clash Display';
  src: url('https://cdn.fontshare.com/wf/FPDAZ2S6SW4QMSRIIKNNGTPM6VIXYMKO/5HNPQ453FRLIQWV2FNOBUU3FKTDZQVSG/Z3MGHFHX6DCTLQ55LJYRJ5MDCZPMFZU6.woff2') format('woff2'),
      url('https://cdn.fontshare.com/wf/FPDAZ2S6SW4QMSRIIKNNGTPM6VIXYMKO/5HNPQ453FRLIQWV2FNOBUU3FKTDZQVSG/Z3MGHFHX6DCTLQ55LJYRJ5MDCZPMFZU6.woff') format('woff'),
      url('https://cdn.fontshare.com/wf/FPDAZ2S6SW4QMSRIIKNNGTPM6VIXYMKO/5HNPQ453FRLIQWV2FNOBUU3FKTDZQVSG/Z3MGHFHX6DCTLQ55LJYRJ5MDCZPMFZU6.ttf') format('truetype');
  font-weight: 600;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'General Sans';
  src: url('https://cdn.fontshare.com/wf/KWXO5X3YW4X7OLUMPO4X24HQJGJU7E2Q/VOWUQZS3YLP66ZHPTXAFSH6YACY4WJHT/NIQ54PVBBIWVK3PFSOIOUJSXIJ5WTNDP.woff2') format('woff2'),
      url('https://cdn.fontshare.com/wf/KWXO5X3YW4X7OLUMPO4X24HQJGJU7E2Q/VOWUQZS3YLP66ZHPTXAFSH6YACY4WJHT/NIQ54PVBBIWVK3PFSOIOUJSXIJ5WTNDP.woff') format('woff'),
      url('https://cdn.fontshare.com/wf/KWXO5X3YW4X7OLUMPO4X24HQJGJU7E2Q/VOWUQZS3YLP66ZHPTXAFSH6YACY4WJHT/NIQ54PVBBIWVK3PFSOIOUJSXIJ5WTNDP.ttf') format('truetype');
  font-weight: 700;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: 'Fira Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firamono/v12/N0bX2SlFPv1weGeLZDtgJv7S.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
html {
  background: black;
  background: linear-gradient(140deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 50%, rgba(76,13,113,1) 100%);
  background-attachment: fixed;
  min-height: 100vh;
}
body {
  margin: 0;
  font-family: 'Satoshi', sans-serif';
  color: '#eee';
  letter-spacing: 0.02em;
}
h1, h2, h3, h4, b {
  font-family: 'Clash Display', sans-serif';
  font-weight: 600;
  margin: .4em 0;
  color: white;
}
p {
  margin: 0.3em 0;
}
code {
  font-family: 'Fira Mono', monospace;
  font-size: 0.9em;
}
a {
  text-decoration: none;
  color: #8c20c6;
  transition: all 50ms ease-in-out;
  &:hover {
    color: #a100ff;
  }
}
input {
  padding: 0.4em 0.5em;
  box-sizing: border-box;
  border-radius: 6px;
  background: '#eeeeee18';
  border: #00000000 2px solid;
  color: white;
  font-family: Satoshi', sans-serif;
  &:focus{
    outline: none;
    border: #8300d0 2px solid;
  }
}
.plyr--video {
  margin-top: -4em;
  width: 100vw !important;
  height: 80vh !important;
}
.plyr__controls {
  opacity: 0;
}
button[data-plyr="play"] {
  position: absolute;
  left: 50%;
  z-index: 1000;
}
button[data-plyr="fullscreen"] {
  display: none !important;
}
button[data-plyr="pip"] {
  display: none !important;
}
.plyr__volume {
  display: none !important;
}
.plyr__menu {
  display: none !important;
}
`


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

      <Navbar/>
      <Hero  image={NearCon}/>
    
      {/* <Container className="flex justify-center my-24">

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

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:gap-12">
          {links.map((link, index) => (
            <Link href={link.href} key={'link' + index} passHref>
              <a>
                <div className="flex w-auto max-w-64 h-full">
                  <Card title={link.title} description={link.description} />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Container> */}
      <style jsx global>{
     GlobalStyle
      }</style> 
    </>
  )
}

export default Home
