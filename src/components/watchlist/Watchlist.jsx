import "./watchlist.css";
import { useGetCryptosQuery } from "../../services/cryptoApi";

import React from "react";
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
} from "@mui/material";

import {
  AccountBalanceOutlined,
  AttachMoneyOutlined,
  EqualizerOutlined,
  StorefrontOutlined,
  Delete
} from "@material-ui/icons";

import {
  StackedLineChartOutlined,
} from "@mui/icons-material";

import { Button } from "@material-ui/core";

const Watchlist = ({ options }) => {

  const { data, isFetching } = useGetCryptosQuery(10); //create a hook
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading..."; //prevents undefined from loading webpage

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
          <ListItem
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
