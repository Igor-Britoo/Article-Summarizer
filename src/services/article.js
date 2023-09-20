import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '18e2d985b4mshe0d7eae50a66fcep1fff80jsnb0b101560fd5')
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')
      return headers
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}`
    })
  })
})

export const { useLazyGetSummaryQuery } = articleApi