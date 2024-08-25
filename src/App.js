import "./App.css";
import NFTForm from "./ui/NFTForm";
import NFTCard from "./ui/NFTCard";
import { useState } from "react";

//dummy data for NFT
const NFTList = [
  {
    name: "Butterfly",
    description: "A picture of a beautiful butterfly",
    image:
      "https://black-additional-bobcat-526.mypinata.cloud/ipfs/QmW3gD3su1bZKtroJnsjtcjFSRsfnuA4ibEFoB5h7Pj7MB",
  },
  {
    name: "Elephant",
    description: "This is simple image of elephant",
    image:
      "https://black-additional-bobcat-526.mypinata.cloud/ipfs/QmbeaTvfdHKDJ5g769J75dN31VSvPbntggYUEi8uQvbGmJ",
  },
];

function App() {
  const [gcitNFTList, setGCITNFTList] = useState(NFTList);
  return (
    <div className="App">
      <NFTForm />
      <h1>NFT Gallery</h1>

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
    </div>
  );
}

export default App;
