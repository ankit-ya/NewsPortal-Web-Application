import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItems from './NewsItems';
import Spinner from './Spinner';


const News =(props)=>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)


const updateNews=async()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db455b858f1f46e7941d7c68939303ea&page=${page}&pageSize= ${props.pageSize}`;
    
    setloading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    
    props.setProgress(100);

}
  


     /*constructor() {
        super();
        console.log("hello I am a constructor from News Components")
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    } */

    /*async componentDidMount() {
        console.log("cmd");
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db455b858f1f46e7941d7c68939303ea&page=${page}&pageSize= ${props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        
        props.setProgress(100);

    } */

    useEffect(() => {
      
        
           updateNews();
    
        
      
    }, [])
    const handleNextclick = async () => {
         /*console.log("Next")
        props.setProgress(0);
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {


            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db455b858f1f46e7941d7c68939303ea&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();


            setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)


        }
        props.setProgress(100); */

        setpage(page+1)
        updateNews();
    }


    const handlePrevclick = async () => {
         /*console.log("Privous")
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db455b858f1f46e7941d7c68939303ea&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        props.setProgress(100); 

        this.setState({page: this.state.page - 1}); */
        setpage(page - 1)
        updateNews();



    }

     const fetchMoreData = async () => {
         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db455b858f1f46e7941d7c68939303ea&page=${page+1}&pageSize= ${props.pageSize}`;
         setpage(page + 1)
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setloading(false)
       /* this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })*/

    }

   
        return (
            <div container="container my-3">
                <h2 className='text-center ' style={{marginTop:'90px'}} >Newspaper - Top headlines</h2>
                {/*this.state.loading && <Spinner/>*/}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                > <div className='container'>

                        <div container="row">
                            {articles.map((element) => {
                                return <div container="col-md-3" key={element.url}>
                                    <NewsItems title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                                </div>
                            })}

                        </div>
                    </div>

                </InfiniteScroll>
                <div container="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevclick}> &larr; Privous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextclick}>Next &rarr; </button>
                </div> 





            </div>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
