
import Minter from '../components/Minter';
import Card from '../components/Card';

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
`

const MintPage = () => {
    return (
        <>
         {/* <GlobalStyle/> */}
        <h1> Mint Pages</h1>
        <Minter />
        <Card title="Mint" description="Description" />
        <style jsx global>{
     GlobalStyle
      }</style> 
        </>
    )

}

export default MintPage;
