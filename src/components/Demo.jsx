//import React from 'react'
import { useState, useEffect } from "react"

import { copy, linkIcon, loader, tick, enterArrow } from '../assets'
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })
  const [allArticles, setAllArticles] = useState([])
  const [getSummary] = useLazyGetSummaryQuery()

  const handleUrlInputChange = (event) => {
    setArticle(prevState => ({
      ...prevState,
      url: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await getSummary({ articleUrl: article.url })

    if (response?.data?.summary){
      const newArticle = {
        ...article,
        summary: response.data.summary
      }
      const updatedAllArticles = [
        ...allArticles,
        newArticle
      ]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)
    }

  }

  return (
  <section className="mt-16 w-full max-w-xl">
    <div className="flex flex-col w-full gap-2">
      <form 
        className="relative flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <img 
          src={linkIcon} 
          alt="link icon"
          className="absolute left-0 my-2 ml-3 w-5"
        />

        <input 
          type="url"
          placeholder="Enter a URL"
          value={article.url}
          className="url_input peer"
          onChange={handleUrlInputChange}
          required
        />

        <button 
          type="submit" 
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
        >
          <img src={enterArrow} className="w-4" />
        </button>

      </form>
    </div>
  </section>
  )
}

export default Demo