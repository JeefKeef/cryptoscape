import "./watchlist.css";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { WatchlistCard } from "..";
import Autocomplete from "@mui/material/Autocomplete";

import React, { useState, useEffect } from "react";
import millify from "millify";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  ListItemIcon,
  Typography,
  TextField,
} from "@mui/material";

import {
  AccountBalanceOutlined,
  AttachMoneyOutlined,
  EqualizerOutlined,
  StorefrontOutlined,
  Delete,
  SearchOutlined,
} from "@material-ui/icons";

import { StackedLineChartOutlined } from "@mui/icons-material";

import { Button, Input } from "@material-ui/core";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Watchlist = ({ options }) => {
  const { user: currUser } = useContext(AuthContext);
  const { data, isFetching } = useGetCryptosQuery(100); //create a hook
  const [crypto, setCrypto] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const globalStats = data?.data?.stats;

  useEffect(() => {
    const fetchWatchlist = async () => {
      const res = currUser && (await axios.get("/watchlist/" + currUser._id));
      if (res?.data.length === 0 && currUser) {
        await axios.post("/watchlist", {
          userId: currUser._id,
          userWatchlist: [],
        });
        fetchWatchlist();
      }
      setWatchlist(res);
    };
    fetchWatchlist();
  }, [currUser]);

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCrypto(filteredData);
  }, [searchTerm, data]);

  const renderSwitch = (params) => {
    switch (params) {
      case "guest":
        return <GuestWatchlist />;
      case "profile":
        return <ProfileWatchlist />;
      default:
        break;
    }
  };
  if (isFetching) return "Loading..."; //prevents undefined from loading webpage

  const GuestWatchlist = () => {
    return (
      <>
        <Box className="home-global-container">
          <h1 className="homepage-header">Global Crypto Stats</h1>
          <List>
            <ListItem>
              <ListItemIcon>
                <AttachMoneyOutlined />
              </ListItemIcon>
              <ListItemText
                primary={"Total Cryptocurrencies"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {millify(globalStats.total)}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBalanceOutlined />
              </ListItemIcon>
              <ListItemText
                primary={"Total Exchanges"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {millify(globalStats.totalExchanges)}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StackedLineChartOutlined />
              </ListItemIcon>
              <ListItemText
                primary={"Total Market Cap"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {millify(globalStats.totalMarketCap)}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EqualizerOutlined />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"Total 24h Volume"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {millify(globalStats.total24hVolume)}
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <StorefrontOutlined />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"Total Market"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {millify(globalStats.totalMarkets)}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Box>
        <div className="guest-watchlist-container">
          Watchlist
          <div className="guest-watchlist-signin">
            Sign in to view watchlist
            <div className="guest-watchlist-signin-btn">
              <Button>Sign in</Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ProfileWatchlist = () => {
    return (
      <>
        <List>
          Watchlist
          <div className="watchlist-searchbar">
            <Autocomplete
              id="watchlist-search"
              freeSolo
              options={data?.data?.coins.map((coin) => coin.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <div className="watchlist-search-icon">
                      <SearchOutlined />
                    </div>
                  }
                />
              )}
              onChange={(coin) => setSearchTerm(coin.target.innerText)}
            />
          </div>
          {watchlist?.data[0]?.userWatchlist.map((coinId) => (
            <WatchlistCard cryptoId={coinId}/>
          ))}
        </List>
      </>
    );
  };

  return (
    <div className="watchlist-container">
      <div className="watchlist-wrapper">{renderSwitch(options.value)}</div>
    </div>
  );
};

export default Watchlist;
