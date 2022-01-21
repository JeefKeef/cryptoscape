import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";

import {
  Select,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import {
  AccountBalanceOutlined,
  AttachMoneyOutlined,
  EqualizerOutlined,
  FormatListNumberedOutlined,
  StarOutlined,
  StorefrontOutlined,
} from "@material-ui/icons";
import {
  StackedBarChartOutlined,
  StackedLineChartOutlined,
} from "@mui/icons-material";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$${millify(cryptoDetails?.price)}`,
      icon: <AttachMoneyOutlined />,
    },
    {
      title: "Rank",
      value: `${cryptoDetails?.rank}`,
      icon: <FormatListNumberedOutlined />,
    },
    {
      title: "24h Volume",
      value: `${millify(cryptoDetails["24hVolume"])}`,
      icon: <EqualizerOutlined />,
    },
    {
      title: "Market Cap",
      value: `${millify(cryptoDetails?.marketCap)}`,
      icon: <StackedLineChartOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$${millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <StarOutlined />,
    },
  ];
  const supplyStats = [
    {
      title: "Number of Markets",
      value: `${millify(cryptoDetails?.numberOfMarkets)}`,
      icon: <StorefrontOutlined />,
    },
    {
      title: "Number of Exchanges",
      value: `${millify(cryptoDetails?.numberOfExchanges)}`,
      icon: <AccountBalanceOutlined />,
    },
    {
      title: "Total Supply",
      value: `${millify(cryptoDetails?.supply?.total)}`,
      icon: <StackedLineChartOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${millify(cryptoDetails?.supply?.circulating)}`,
      icon: <StackedBarChartOutlined />,
    },
  ];

  console.log(cryptoDetails);

  return (
    <div>
      <div>
        <h1>
          {cryptoDetails?.name} ({cryptoDetails?.symbol})
        </h1>
        <p>
          {cryptoDetails?.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-timeframe-label">Time Frame</InputLabel>
          <Select
            labelId="select-timeframe-label"
            id="select-timeframee"
            value={timePeriod}
            label="Time Frame"
            onChange={(time) => setTimePeriod(time.target.value)}
          >
            {time.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div>
        <div>
          <h1>{cryptoDetails?.name} Value Statistics</h1>
          <p>An overview showing the stats of {cryptoDetails?.name}</p>
        </div>
        {stats.map(({ title, value, icon }) => (
          <List>
            <ListItem>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} secondary={value} />
            </ListItem>
          </List>
        ))}
      </div>
      <div>
        <div>
          <h1>Supply Statistics</h1>
          <p>An overview showing the supply stats of {cryptoDetails?.name}</p>
        </div>
        {supplyStats.map(({ title, value, icon }) => (
          <List>
            <ListItem>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} secondary={value} />
            </ListItem>
          </List>
        ))}
      </div>
      <div>
        <div>
          <h1>{cryptoDetails?.name} Description</h1>
        </div>
        <div>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
      </div>
      <div>
        <div>
          <h1>{cryptoDetails?.name} Links</h1>
        </div>
        <div>
          {cryptoDetails?.links.map((link) => (
            <div>
            <h4>{link.type}</h4>
          <a href={link.url} target="__blank" rel="noreferrer">{link.name}</a>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
//1:50
