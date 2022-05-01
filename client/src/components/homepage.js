import React, { useState, useEffect } from 'react'


export default  function Homepage(props) {

    const [articles, setArticles] = useState(false)
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(result => result.json())
            .then(result => setArticles(result))
            .then(setLoading(false))
            console.log(articles)
    }, [setArticles])

    const list = () => {
        if(articles) {
            return articles.map(art => {
                <p>{art.title}</p>
            })
        }
        else return 'no articles yet'
    }


    return (
        <div>
            <ul>
                {list}
                <button onClick={console.log(articles)}>click</button>
            </ul>
        </div>
    )
}