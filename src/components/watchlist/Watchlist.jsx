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
    const addHandler = async () => {
      try {
        crypto &&
          (await axios
            .put("/watchlist/add", {
              userId: currUser._id,
              watchlistId: watchlist?.data[0]._id,
              cryptoId: crypto?.uuid,
            })
            .then(async (response) => {
              const res = await axios.get("/watchlist/" + currUser._id);
              setWatchlist(res);
            }));
      } catch (err) {
        console.log(err);
      }
    };
    addHandler();
  }, [watchlist?.data, currUser._id, crypto]);

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
    const filteredData = data?.data?.coins.find((coin) =>
      coin.name.toLowerCase().includes(searchTerm && searchTerm.toLowerCase())
    );
    setCrypto(filteredData);
  }, [searchTerm]);

  if (isFetching) return "Loading..."; //prevents undefined from loading webpage
  const handleDelete = async (coinId) => {
    try {
      await axios
        .put("/watchlist/delete", {
          userId: currUser._id,
          watchlistId: watchlist?.data[0]._id,
          cryptoId: coinId,
        })
        .then(async (response) => {
          const res = await axios.get("/watchlist/" + currUser._id);
          setCrypto(null);
          setWatchlist(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
                  inputProps={{
                    ...params.inputProps,
                    onKeyDown: (e) => {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                      }
                    },
                  }}
                />
              )}
              // onChange={(coin) => console.log(coin.target.innerText)}
              onChange={(coin) => setSearchTerm(coin.target.innerText)}
            />
          </div>
          {watchlist?.data[0]?.userWatchlist.map((coinId) => (
            <div className="watchlist-trash-container">
              <WatchlistCard
                cryptoId={coinId}
              />
              <IconButton className="watchlist-card-delete">
                <Delete fontSize="small" onClick={() => handleDelete(coinId)} />
              </IconButton>
            </div>
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
