import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
const News = ({ simplified }) => {

    //const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    //const { data } = useGetCryptosQuery(100);
    //const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12 });

  //if(isFetching) return 'Loading...';

  // const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  // const { data } = useGetCryptosQuery(100);
  // const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 10 : 100 });
  
  // //if(!cryptoNews?.value) return 'Loading...';
  
  // console.log(" start");
  // console.log(cryptoNews);
  // console.log("news end");


  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 1 : 3 });

  console.log(cryptoNews);

  return (
    <div>News</div>);
};

export default News;
//1:15
