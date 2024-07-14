import React from 'react';

const NewsItems =(props)=>{
    
        let { title, description, imageURL, newsURL, author, date, source } = props;
        return (
            <div className="my-3 d-flex justify-content-center">
                <div className="card" style={{ width: "18rem" }}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '85%', zIndex: '20' }}>
                        {source}


                    </span>
                    <img src={imageURL} alt=""></img>
                    <div className="card-body d-flex flex-column align-items-center">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsURL} target='blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>


        )
    
}

export default NewsItems
