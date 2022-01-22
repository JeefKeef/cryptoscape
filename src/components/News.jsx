import moment from "moment";
import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Autocomplete from "@mui/material/Autocomplete";
import {
  TextField,
  Stack,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  Typography,
} from "@mui/material";

const newsDemoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
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
              onChange={(currency) =>
                setNewsCategory(currency.target.innerText)
              }
            />
          </div>
        )}
      </div>

      <Stack direction="row" spacing={2}>
        {cryptoNews?.value.map((news) => (
          <Card sx={{ maxWidth: 300 }}>
            <a href={news?.url} target="_blank" rel="noreferrer">
              <CardContent>
                <div>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || newsDemoImage}
                    alt="news"
                  ></img>
                  <Typography variant="subtitle1">{news?.name}</Typography>
                </div>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2">
                  {news?.description.length > 50
                    ? `${news.description.substring(0, 50)}...`
                    : news.description}
                </Typography>
              </CardContent>
              <CardContent className="news-provider-container">
                <Avatar
                  src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                  alt={news?.provider[0]?.name}
                />
                <Typography variant="subtitle2">
                  {moment(news?.datePublished).startOf("ss").fromNow()}
                </Typography>
              </CardContent>
            </a>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default News;
//1:15
