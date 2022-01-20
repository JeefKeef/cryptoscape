import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '1d29f4f00emsh6ea8df101bbf573p1dcb24jsn636d1ac15938'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news/search';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`?q=${newsCategory}&count=${count}`)
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

