import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Input } from "@material-ui/core";
import {Card, CardHeader, Avatar, CardContent, Typography, Stack} from '@mui/material';


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurreny"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Stack direction="row" spacing={2}>
        {cryptos?.map((currency) => (
          <Link to={`/crypto/${currency.uuid}`}>
          <Card sx={{maxWidth: 300}}>
            <CardHeader
              avatar={<Avatar alt="" src={currency.iconUrl}/>}
              title={currency.rank + ". " + currency.name}
              />
            <CardContent>
              <Typography variant="body2">Price: {millify(currency.price)}</Typography>
              <Typography variant="body2">Market Cap: {millify(currency.marketCap)}</Typography>
              <Typography variant="body2">Daily Change: {millify(currency.change)}%</Typography>
            </CardContent>
          </Card>
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default Cryptocurrencies;