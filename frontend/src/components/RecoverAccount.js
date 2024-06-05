import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";

const { TextArea } = Input;


function RecoverAccount({ setWallet, setSeedPhrase }) {
    const navigate = useNavigate();
    const [typedSeed, setTypedSeed] = useState("");
    const [nonValid, setNonValid] = useState(false);


    function seedAdjust(e) {
        setNonValid(false);
        setTypedSeed(e.target.value);
    }

    function recoverWallet() {
        let recoveredWallet;
        try {
            recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
        } catch (err) {
            setNonValid(true);
            return;
        }

        setSeedPhrase(typedSeed);
        setWallet(recoveredWallet.address);
        navigate("/yourwallet");
        return;
    }

    return (
        <>
            <div className="content">
                <div className="mnemonic">
                    <BulbOutlined style={{ fontSize: "20px" }} />
                    <div>
                        Type your seed phrase in the field below to recover your wallet (it
                        should include 12 words seperated with spaces)
                    </div>
                </div>
                {nonValid && (
                    <div className="error">
                    <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
                    <div>
                      You entered a invalid seed pharse.
                    </div>
                  </div>
                )}
                <TextArea
                    value={typedSeed}
                    onChange={seedAdjust}
                    rows={3}
                    className="seedPhraseContainer"
                    placeholder="Type your seed phrase here..."
                />
                <Button
                    disabled={
                        typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
                    }
                    className="customBtn"
                    type="primary"
                    style={{width:"90%", marginTop: "20px"}}
                    onClick={() => recoverWallet()}
                >
                    Recover Wallet
                </Button>
                <p className="frontPageBottom" onClick={() => navigate("/")}>
          <span>Back Home</span>
        </p>
            </div>
        </>
    );
}

export default RecoverAccount;