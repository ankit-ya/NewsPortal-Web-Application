import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';

const News = ({ category, country, setProgress }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const updateNews = useCallback(async () => {
        setProgress(0);
        const url = `https://api.currentsapi.services/v1/latest-news?category=${category}&country=${country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page_number=${page}&page_size=6`;
        
        setLoading(true);
        try {
            const data = await fetch(url);
            const parsedData = await data.json();
            
            setArticles(parsedData.news || []);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
            setProgress(100);
        }
    }, [page, category, country, setProgress]);
    
    useEffect(() => {
        updateNews();
    }, [updateNews, page]);

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        setPage(1);
    }, [category]);

    return (
        <div className="container my-3">
            <h2 className='text-center' style={{ marginTop: '90px' }}>Newspaper - Top headlines</h2>
            {loading && <Spinner />}

            <div className="row">
                {articles.map((element) => (
                    <div className="col-md-4" key={element.url}>
                        <NewsItems 
                            title={element.title} 
                            description={element.description} 
                            imageURL={element.urlToImage} 
                            newsURL={element.url} 
                            author={element.author} 
                            date={element.publishedAt} 
                            source={element.source ? element.source.name : "Unknown"}
                        />
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between my-4">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevious}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
            </div>
        </div>
    );
};

News.defaultProps = {
    country: 'in',
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
