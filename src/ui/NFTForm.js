import { useState } from "react";

import "../css/NFTForm.css";

export default function NFTForm({ gcitNFTAPI, setIsLoading }) {
  const [receipient, setReceipient] = useState("");
  const [tokenURI, setTokenURI] = useState("");

  //handler for mint button inside NFTForm
  async function hadleNFTForm() {
    setIsLoading(true);
    try {
      const tx = await gcitNFTAPI.addNFTItem(receipient, tokenURI);
      await tx.wait();
      if (tx.hash) {
        alert("Successfully mint Gcit NFT");
      } else {
        alert("Failed to mint Gcit NFT");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to mint NFT");
    }
    setReceipient("");
    setTokenURI("");
    setIsLoading(false);
  }

  return (
    <form onSubmit={hadleNFTForm}>
      <label>Enter Recepient Address:</label>
      <input
        type="text"
        value={receipient}
        onChange={(event) => {
          setReceipient(event.target.value);
        }}
      />
      <br />
      <br />
      <label>NFT URI</label>
      <input
        type="url"
        value={tokenURI}
        onChange={(event) => {
          setTokenURI(event.target.value);
        }}
      />
      <br />
      <br />
      <input value="Mint GCIT NFT" type="submit" />
    </form>
  );
}
