import "./cryptocurrencies.css";
import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Input } from "@material-ui/core";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

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
    <div className="crypto-container">
      <div className="crypto-wrapper">
        {!simplified && (
          <div className="search-crypto">
            <Input
              placeholder="Search Cryptocurreny"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div className="crypto-card-container">
          <div className="crypto-card-content">
            {cryptos?.map((currency) => (
              <Link to={`/crypto/${currency.uuid}`}>
                <Card className="crypto-card">
                  <CardHeader
                      avatar={<Avatar alt="" src={currency.iconUrl} sx={{width:30, height:30}}/>}
                      title={currency.name}
                      subheader={"$"+ parseFloat(currency.price).toFixed(2)}
                    />
                    <div className="crypto-content">
                    {millify(currency.change)}%
                    </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrencies;
