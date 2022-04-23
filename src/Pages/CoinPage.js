import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import styles from "./CoinPage.module.css";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, styled, Typography } from "@mui/material";
import { numberWithCommas } from "../Components/Banner/Carousel";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SideBar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "25px",
  borderRight: "2px solid grey",
}));

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  // for responsive
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const CoinPage = () => {
  
  let { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    return <LinearProgress sx={{ bgcolor: "gold" }} />;
  }

  return (
    <Root>
      <SideBar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={styles.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={styles.description}>
          <div
            dangerouslySetInnerHTML={{
              __html: coin?.description.en.split(". ")[0] + ".",
            }}
          />
        </Typography>

        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={styles.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={styles.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={styles.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
            {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </SideBar>

      {/* chart */}
      <CoinInfo coin={coin} />
    </Root>
  );
};

export default CoinPage;
