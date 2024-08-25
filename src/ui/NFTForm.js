import { useState } from "react";

import "../css/NFTForm.css";

export default function NFTForm() {
  const [receipient, setReceipient] = useState("");
  const [tokenURI, setTokenURI] = useState("");

  return (
    <form>
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
