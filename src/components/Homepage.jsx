import * as React from "react";
import millify from "millify"; //used to convert long integers into readable format
import {
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from ".";

import {
  AccountBalanceOutlined,
  AttachMoneyOutlined,
  EqualizerOutlined,
  StorefrontOutlined,
} from "@material-ui/icons";

import {
  StackedLineChartOutlined,
} from "@mui/icons-material";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10); //create a hook
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading..."; //prevents undefined from loading webpage
  // console.log("homepage start");

  // console.log(data);
  // console.log("homepage end");

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
      <div className="home-heading-container">
        <h1 className="homepage-header">
          Top 10 Cryptocurrencies in the world
        </h1>
        <Link to="/cryptocurrencies">Show more</Link>
        <Cryptocurrencies simplified />
      </div>
      <div className="home-heading-container">
        <h1 className="homepage-header">Latest Crypto News</h1>
        <Link to="/news">Show more</Link>
        <News simplified />
      </div>
    </>
  );
};

export default Homepage;
