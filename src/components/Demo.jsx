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
  const [copiedUrl, setCopiedUrl] = useState('')
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  const handleUrlInputChange = (event) => {
    setArticle(prevState => ({
      ...prevState,
      url: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    )
    if (existingArticle) return setArticle(existingArticle);
    
    const response = await getSummary({ articleUrl: article.url })

    if (response?.data?.summary){
      const newArticle = {
        ...article,
        summary: response.data.summary
      }
      const updatedAllArticles = [
        newArticle,
        ...allArticles
      ]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  const handleCopy = (copyUrl) => {
    setCopiedUrl(copyUrl)
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopiedUrl(''), 1200);
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
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img 
                  src={copiedUrl === article.url ? tick : copy}
                  alt={copiedUrl === article.url ? "tick icon" : "copy icon"}
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

      <div className="flex my-10 max-w-full justify-center items-center">
        {
          isFetching ?
            <img src={loader} alt="loading" className="w-10 h-10 object-contain"/>
            :
            error ?
              <p className="font-inter font-bold text-black text-center">
                An error occurred while summarizing the article.
                <br />
                <span className="font-satoshi font-normal text-gray-700">
                  {error?.data?.error}
                </span>
              </p>
              :
              article?.summary && 
              <div className="flex flex-col gap-4 items-center">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient"> Summary </span>
                </h2>
                <div className='summary_box'>
                  <p className='font-inter font-medium text-sm text-gray-700'>
                    {article.summary}
                  </p>
                </div>
              </div>
        }
      </div>
    </div>
  </section>
  )
}

export default Demo