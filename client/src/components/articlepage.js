import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function ArticlePage() {

    const { id } = useParams()
    const [article, setArticle] = useState(false)

    const [articleId, setArticleId] = useState(id)

    useEffect(() => {
        if (id !== articleId) {
            setArticleId(id)
            fetch(`http://localhost:3001/article/${id}/`)
                .then(result => result.json())
                .then(result => setArticle(result))
            console.log(article)
        }
    })



    return (
        <div>
            <p>aaaaaa</p>
            {article ?
                <div>
                    <h1>{article.article.title}</h1>
                    <p>{article.article.body}</p>
                    {article.comments.map(comment =>
                        <div>
                            <h5>{comment.username}</h5>
                            <p>{comment.body}</p>
                        </div>
                    )}
                </div>

                : 'loading article'}
        </div>
    )
}