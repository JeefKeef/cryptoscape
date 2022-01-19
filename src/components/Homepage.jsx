import React from "react";
import millify from "millify"; //used to convert long integers into readable format
import { List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from ".";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(); //create a hook
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading..."; //prevents undefined from loading webpage

  console.log(data);

  return (
    <>
      <div className="home-global-container">
        <h1 className="homepage-header">Global Crypto Stats</h1>
        <List>
          <ListItem>
            Total Cryptocurrencies: {millify(globalStats.totalCoins)}
          </ListItem>
          <ListItem>
            Total Exchanges: {millify(globalStats.totalExchanges)}
          </ListItem>
          <ListItem>
            Total Market Cap: {millify(globalStats.totalMarketCap)}
          </ListItem>
          <ListItem>
            Total 24H Volume: {millify(globalStats.total24hVolume)}
          </ListItem>
          <ListItem>
            Total Markets: {millify(globalStats.totalMarkets)}
          </ListItem>
        </List>
      </div>
      <div className="home-heading-container">
        <h1 className="homepage-header">
          Top 10 Cryptocurrencies in the world
        </h1>
        <Link to="/cryptocurrencies">Show more</Link>
        <Cryptocurrencies simplified />
      </div>
      <div className="home-heading-container">
        <h1 className="homepage-header">
          Latest Crypto News
        </h1>
        <Link to="/news">Show more</Link>
        <News simplified />
      </div>
    </>
  );
};

export default Homepage;
