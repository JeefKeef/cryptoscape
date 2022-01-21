import moment from "moment";
import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const newsDemoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoList } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isFetching) return "Loading...";

  //console.log(cryptoNews);

  return (
    <div>
      <div>
        {!simplified && (
          <div>
            <Autocomplete
              id="search-news"
              freeSolo
              options={cryptoList?.data?.coins.map((coin) => coin.name)}
              renderInput={(params) => (
                <TextField {...params} label="Cryptocurrencies" />
              )}
              onChange={(currency) => setNewsCategory(currency.target.innerText)}
            />
          </div>
        )}
      </div>
      {cryptoNews?.value.map((news) => (
        <div>
          <a href={news?.url} target="_blank" rel="noreferrer">
            <div>
              <h1>{news?.name}</h1>
              <img
                src={news?.image?.thumbnail?.contentUrl || newsDemoImage}
                alt="news"
              />
            </div>
            <p>
              {news?.description > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description}
            </p>
            <div>
              <div>
                <img
                  src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                  alt=""
                />
                <h6>{news?.provider[0]?.name}</h6>
              </div>
              <h6>{moment(news?.datePublished).startOf("ss").fromNow()}</h6>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
//1:15
