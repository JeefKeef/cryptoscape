import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  //Epoch To Date
  function EpochToDate(epoch) {
    if (epoch < 10000000000) epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var epoch = epoch + new Date().getTimezoneOffset() * -1; //for timeZone
    return new Date(epoch);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(EpochToDate(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div>
        <h1>{coinName} Price Chart</h1>
        <div>
          <h4>{coinHistory?.data?.change}%</h4>
          <h4>
            Current {coinName} Price: $ {currentPrice}
          </h4>
        </div>
      </div>
      <Line data={data} options={options} height={"70px"}/>
    </>
  );
};

export default LineChart;
