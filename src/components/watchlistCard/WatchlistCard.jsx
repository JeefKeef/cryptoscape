import "./watchlistCard.css";

import React from 'react'
import { useGetCryptoDetailsQuery } from "../../services/cryptoApi";

const WatchlistCard = ({cryptoId}) => {

    const {data, isFetching} = useGetCryptoDetailsQuery(cryptoId);
    const coinDetail = data?.data?.coin;



    
    if(isFetching) return "Loading...";

  return (
    <div className="watchlist-card-container">
        {coinDetail.name}
    </div>
  )
}

export default WatchlistCard;

{/* <ListItem
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
</ListItem> */}