import "./watchlistCard.css";
import millify from "millify";

import React from "react";
import { useGetCryptoDetailsQuery } from "../../services/cryptoApi";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const WatchlistCard = ({ cryptoId }) => {
  const { data, isFetching } = useGetCryptoDetailsQuery(cryptoId);
  const coinDetail = data?.data?.coin;

  if (isFetching) return "Loading...";

  return (
    <Link to={"/crypto/" + cryptoId} style={{textDecoration:"none"}}>
    <div className="watchlist-card-container">
      <div className="watchlist-card-left">
        <img className="watchlist-card-img" src={coinDetail?.iconUrl} alt="" />
        <div className="watchlist-card-ticker-container">
          <text className="watchlist-card-ticker-symbol">
            {coinDetail?.symbol}
          </text>
          <text className="watchlist-card-ticker-name">{coinDetail?.name}</text>
        </div>
      </div>
      <div className="watchlist-card-right">
        <div className="watchlist-card-price-container">
          <text className="watchlist-card-price">
            {"$" + parseFloat(coinDetail?.price).toFixed(2)}
          </text>
          <text className="watchlist-card-change">
            {millify(coinDetail?.change)}%
          </text>
        </div>
        {/* <IconButton className="watchlist-card-delete">
          <Delete fontSize="small" onClick={handleDelete}/>
        </IconButton> */}
      </div>
    </div>
    </Link>
  );
};

export default WatchlistCard;

{
  /* <ListItem
secondaryAction={
  <IconButton edge="end" aria-label="delete">
    <Delete />
  </IconButton>
}
>
<ListItemAvatar>
  <Avatar>W</Avatar>
</ListItemAvatar>
<ListItemText>Doge</ListItemText>
</ListItem> 



on click axios put delete from watchlist



*/
}
