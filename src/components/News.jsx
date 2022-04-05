import "./news.css";
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
  Grid,
  Box,
} from "@mui/material";

const newsDemoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoList } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 4 : 12,
  });

  if (isFetching) return "Loading...";

  //console.log(cryptoNews);

  return (
    <div className="news-container">
      <div className="news-search-container">
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
      <div className="news-box">
        <div className="news-box-wrapper">
          <div className="news-card-container">
            {cryptoNews?.value.map((news) => (
              <Card className="news-card" style={{backgroundColor:"#1A1A1B", boxShadow:"none"}}>
                <a href={news?.url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                  <CardContent className="news-content">
                    <div className="news-image-container">
                      <img
                        className="news-image"
                        src={
                          news?.image?.thumbnail?.contentUrl || newsDemoImage
                        }
                        alt="news"
                      ></img>
                    </div>
                    <div className="news-title-container">
                      <span className="news-title">{news?.name}</span>
                    </div>
                    <div className="news-provider-container">
                      <div className="news-provider-wrapper">
                        <div className="news-provider-icon">
                          <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={
                              news?.provider[0]?.image?.thumbnail?.contentUrl
                            }
                            alt={news?.provider[0]?.name}
                          />
                        </div>
                        <div className="news-timestamp-container">
                          <span className="news-timestamp">
                            {moment(news?.datePublished)
                              .startOf("ss")
                              .fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  {/* <CardContent>
                <Typography variant="subtitle2">
                  {news?.description.length > 50
                    ? `${news.description.substring(0, 50)}...`
                    : news.description}
                </Typography>
              </CardContent> */}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
//1:15
