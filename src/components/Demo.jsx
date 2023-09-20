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
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

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
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, [])

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

      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {
          allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn">
                <img 
                  src={copy} 
                  alt="copy icon" 
                  className="w-[40%] h-[40%] object-contain" 
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  </section>
  )
}

export default Demo