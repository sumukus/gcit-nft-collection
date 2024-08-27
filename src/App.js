import "./App.css";
import NFTForm from "./ui/NFTForm";
import NFTCard from "./ui/NFTCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useState, useEffect, Suspense } from "react";
import { ethers } from "ethers";
import axios from "axios";

const gcitNFTABI = require("./contracts/GcitNFT.json");
const gcitNFTContractAddress = "0xC0784F43c5ce5BEfe906Fe251ecAB2F803202874"; // replace with your contract address
// const gcitNFTContractAddress = "0xb9f8760083Ed4F5DBce7F01243A182dC05E64867";

function App() {
  const [gcitNFTList, setGCITNFTList] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [gcitNFTAPI, setGcitNFTAPI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum == null) {
        console.log("Metamask Wallet Not Available");
        setProvider(ethers.getDefaultProvider());
      } else {
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        setProvider(providerInstance);

        //Get Signer Instance as well to write sth in contract
        providerInstance
          .getSigner()
          .then((signerInstance) => {
            setSigner(signerInstance);

            //connect smart contract
            setGcitNFTAPI(
              new ethers.Contract(
                gcitNFTContractAddress,
                gcitNFTABI.abi,
                signerInstance // In case if you want to perform only the read operation provide providerInstance
                //Else signerInstance as third arguments
              )
            );
          })
          .catch((error) => console.log(error));
      }
    };
    //Call the connectWallet
    connectWallet();
  }, []);

  useEffect(() => {
    const fetchIndividualNFT = async () => {
      const nftDataList = [];
      let tokenID = 0;
      if (gcitNFTAPI) {
        while (true) {
          try {
            let tokenURI = await gcitNFTAPI.tokenURI(tokenID);
            let nftMetadata = await axios.get(tokenURI);
            nftDataList.push(nftMetadata.data);
            tokenID += 1;
          } catch (error) {
            console.log(error);
            break;
          }
        }
        setGCITNFTList(nftDataList);
      }
    };
    fetchIndividualNFT();
  }, [gcitNFTAPI]);
  return (
    <div className="App">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <NFTForm gcitNFTAPI={gcitNFTAPI} setIsLoading={setIsLoading} />
      )}
      <h1>NFT Gallery</h1>
      {gcitNFTList === null ? (
        <h3>NFT not available</h3>
      ) : (
        <div className="nft-card-list">
          {gcitNFTList.map((item) => (
            <NFTCard
              key={item.name}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
