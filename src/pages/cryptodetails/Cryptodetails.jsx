import "./cryptodetails.css";

import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";

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

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../../services/cryptoApi";
import LineChart from "../../components/LineChart";

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
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$${parseFloat(cryptoDetails?.price).toFixed(2)}`,
      icon: <AttachMoneyOutlined />,
    },
    {
      title: "Rank",
      value: `${cryptoDetails?.rank}`,
      icon: <FormatListNumberedOutlined />,
    },
    {
      title: "24h Volume",
      value: `${parseFloat(cryptoDetails["24hvolume"]).toFixed(2)}`,
      icon: <EqualizerOutlined />,
    },
    {
      title: "Market Cap",
      value: `${parseFloat(cryptoDetails?.marketCap).toFixed(2)}`,
      icon: <StackedLineChartOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$${parseFloat(cryptoDetails?.allTimeHigh?.price).toFixed(2)}`,
      icon: <StarOutlined />,
    },
  ];
  const supplyStats = [
    {
      title: "Number of Markets",
      value: `${parseFloat(cryptoDetails?.numberOfMarkets).toFixed(2)}`,
      icon: <StorefrontOutlined />,
    },
    {
      title: "Number of Exchanges",
      value: `${parseFloat(cryptoDetails?.numberOfExchanges).toFixed(2)}`,
      icon: <AccountBalanceOutlined />,
    },
    {
      title: "Total Supply",
      value: `${parseFloat(cryptoDetails?.supply?.total).toFixed(2)}`,
      icon: <StackedLineChartOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${parseFloat(cryptoDetails?.supply?.circulating).toFixed(2)}`,
      icon: <StackedBarChartOutlined />,
    },
  ];

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
          <LineChart coinHistory={coinHistory} currentPrice={parseFloat(cryptoDetails?.price).toFixed(2)} coinName={cryptoDetails?.name}/>
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
