import React, { useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
  message
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png";
import axios from "axios";
import { CHAINS_CONFIG } from "../chains";
import { ethers } from "ethers";
import { CopyOutlined } from '@ant-design/icons';
// const ETHERSCAN_KEY = "ZQ4SRJ6YGJXKHM7XCBYE4BX8ZRGN8CMRSC"


function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
}) {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);
  // const [transactions, setTransactions] = useState(null);
  // const [loading, setLoading] = useState(true);

  const items = [
    {
      key: "3",
      label: `Tokens`,
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                width="100%"
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item style={{ textAlign: "left" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo || logo} />}
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(
                        Number(item.balance) /
                        10 ** Number(item.decimals)
                      ).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <>
              <span
                style={{ marginTop: "5px" }}>
                You seem to not have any tokens yet</span>

            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: `NFTs`,
      children: (
        <>
          {nfts ? (
            <div className="nftGrid">
              {nfts.map((url, index) => (
                <div className="nftItem" key={index}>
                  <img
                    className="nftImage"
                    alt={`NFT ${index + 1}`}
                    src={url || logo}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <span
                style={{ marginTop: "5px" }}>
                You seem to not have any NFTs yet
              </span>
            </>
          )}
        </>
      ),
    },
    {
      key: "1",
      label: `Transfer`,
      children: (
        <>
          <div className="sendRow">
            <p style={{
              width: "10px",
              textAlign: "left",
              margin: "10px 10px",
            }}> To:</p>
            <Input
              value={sendToAddress}
              onChange={(e) => setSendToAddress(e.target.value)}
              placeholder="0x..."
              style={{
                margin: "0px 10px"
              }}
            />
          </div>
          <div className="sendRow">
            <p style={{
              width: "30px",
              textAlign: "left",
              margin: "10px 10px",
            }}> Amount:</p>
            <Input
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              placeholder="Native tokens you wish to send..."
              style={{
                margin: "0px 10px"
              }}
            />
          </div>
          <Button
            disabled={
              processing
            }
            className="customBtn"
            type="primary"
            style={{ width: "100%", marginLeft: "5px", marginRight: "5px" }}
            onClick={() => sendTransaction(sendToAddress, amountToSend)}
          >
            Send Tokens
          </Button>
          {
            processing &&
            (
              <>
                <Spin />
                {hash && (
                  <Tooltip title={hash}>
                    <p>Hover For Tx Hash</p>
                  </Tooltip>
                )}
              </>
            )}
        </>
      ),
    },
    // {
    //   key: "4",
    //   label: "Activity",
    //   children: (
    //     <>
    //       {transactions ? (
    //         <>
    //           <ul>
    //             {transactions.map((tx, index) => (
    //               <li key={index}>
    //                 <p><strong>Hash:</strong> {tx.hash}</p>
    //                 <p><strong>From:</strong> {tx.from}</p>
    //                 <p><strong>To:</strong> {tx.to}</p>
    //                 <p><strong>Value:</strong> {tx.value.toString()} Wei</p>
    //                 <p><strong>Date:</strong> {new Date(tx.timestamp * 1000).toLocaleString()}</p>
    //               </li>
    //             ))}
    //           </ul>
    //         </>
    //       ) : (
    //         <>
    //           <span
    //             style={{ marginTop: "5px" }}>
    //             No activities to show</span>
    //         </>
    //       )}
    //     </>
    //   ),
    // },
  ];

  async function sendTransaction(to, amount) {

    const chain = CHAINS_CONFIG[selectedChain];

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProcessing(true);
    try {
      const transaction = await wallet.sendTransaction(tx);

      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
      } else {
        console.log("failed");
      }

    } catch (err) {
      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);
    }
  }

  // async function fetchTransactionHistory() {
  //   const chain = CHAINS_CONFIG[selectedChain];

  //   const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

  //   const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

  //   const wallet = new ethers.Wallet(privateKey, provider);

  //   const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_KEY}`);
  //   const data = await response.json();

  //   setTransactions(data)
  //   setLoading(false);
  // }

  const getAccountTokens = async() => {
    setFetching(true);

    const res = await axios.get("https://ex-wallet-backend-exceptional.onrender.com/getTokens", {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      },
    });

    const response = res.data;

    if (response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if (response.nfts.length > 0) {
      setNfts(response.nfts);
    }

    setBalance(response.balance);

    setFetching(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet);
    message.success('Wallet address copied to clipboard');
  };


  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  }

  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
    // fetchTransactionHistory();
  }, []);

  useEffect(() => {
    if (!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
    // fetchTransactionHistory();
  }, [selectedChain]);

  return (
    <>
      <div className="content">
        <div className="logoutButton"
          onClick={logout}
        >
          <LogoutOutlined />
        </div>
        <div className="walletName">Wallet</div>
        <Tooltip title={wallet}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              {wallet.slice(0, 4)}...{wallet.slice(38)}
            </div>
            <Button
              icon={<CopyOutlined />}
              type="text"
              size="small"
              onClick={copyToClipboard}
              style={{ marginLeft: 8 }}
            />
          </div>
        </Tooltip>
        <Divider />
        {!fetching && (
          <div className="balanceContainer">
            <h1 className="balanceAmount">{balance.toFixed(5)}</h1>
            <h3 className="balanceTicker">{CHAINS_CONFIG[selectedChain].ticker}</h3>
          </div>
        )}

        {fetching ? (
          <Spin />
        ) : (
          <Tabs defaultActiveKey="1" centered
            items={items} className="walletView" />
        )}
      </div>
    </>
  );
}

export default WalletView;