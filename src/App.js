import Dapp from './components/Dapp'
import {createContext} from 'react'
import { useContract } from "web3-hooks";
import { AdVitamAddress, AdVitamAbi } from "./contracts/advitamaeternam";
import { AeternamAbi, AeternamAddress } from "./contracts/aeternam";
import { IpfsContextProvider } from './contexts/ipfsContext';

export const AdVitamContext = createContext(null);
export const AeternamContext = createContext(null);

function App() {
  const advitam = useContract(AdVitamAddress, AdVitamAbi);
  const aeternam = useContract(AeternamAddress, AeternamAbi);
  return (
    <>
    <AdVitamContext.Provider value={advitam}>
      <AeternamContext.Provider value={aeternam}>
      <IpfsContextProvider>
        <Dapp />
      </IpfsContextProvider>
      </AeternamContext.Provider>
    </AdVitamContext.Provider>
    </>
  );
}

export default App;
