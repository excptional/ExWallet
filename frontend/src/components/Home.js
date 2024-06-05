import React from "react";
import mwallet from "../ex-wallet.png";
import frontImg from "../front-logo.jpg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <img src={mwallet} alt="logo" className="frontPageLogo"/>
        <h3> Welcome to your Web3 Wallet</h3>
        <img src={frontImg}
        style={{width: "250px", height: "250px", borderRadius: "10px",
          marginTop: "5px"}}/>
        <Button
          onClick={() => navigate("/yourwallet")}
          className="customBtn"
          type="primary"
          style={{width:"85%", marginTop: "20px"}}
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => navigate("/recover")}
          className="customBtn"
          type="default"
          style={{width:"85%", marginTop: "10px"}}
        >
          Sign In With Seed Phrase
        </Button>
      </div>
    </>
  );
}

export default Home;