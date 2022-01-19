import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Input } from "@material-ui/core";

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

  //console.log(cryptos);

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

      <div>
        {cryptos?.map((currency) => (
          <div>
            <p>{currency.rank}.</p>
            <p>{currency.name}</p>
            <img className="crypto-icon" src={currency.iconUrl} alt="" />
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>Daily Change: {millify(currency.change)}%</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cryptocurrencies;
