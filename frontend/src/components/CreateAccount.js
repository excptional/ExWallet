import React, { useState } from "react";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const CustomButton = ({ onClick, children, type = 'button', className = '', style = {}, ...props }) => {
  const defaultStyle = {
    backgroundColor: '#000000',
    border: 'none',
    color: 'white',
    padding: '10px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    marginTop: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
    ...style,
  };

  return (
    <button type={type} className={`custom-btn ${className}`} onClick={onClick} style={defaultStyle} {...props}>
      {children}
    </button>
  );
};

function CreateAccount({ setWallet, setSeedPhrase }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
    setErrorMessage(false); // Clear any existing error message when generating a new seed phrase
  }

  function setWalletAndMnemonic() {
    if (!newSeedPhrase) {
      setErrorMessage(true);
      return;
    }
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
    setErrorMessage(false); // Clear error message when successfully setting wallet and mnemonic
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
          <div>
            Once you generate the seed phrase, save it securely in order to
            recover your wallet in the future.
          </div>
        </div>
        <CustomButton
          className="frontPageButton"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </CustomButton>
        {errorMessage && (
          <div className="error">
            <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
            <div>
              Please generate a seed phrase first.
            </div>
          </div>
        )}
        <Card className="seedPhraseContainer">
          {newSeedPhrase && <pre style={{ whiteSpace: "pre-wrap" }}>{newSeedPhrase}</pre>}
        </Card>
        <Button
          onClick={() => setWalletAndMnemonic()}
          className="customBtn"
          type="primary"
          style={{ width: "90%", marginTop: "20px" }}
        >
          Open Your New Wallet
        </Button>
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;

