// import pic from './assets/IMG_1809.jpg'

export const Card= ({imgSrc,imgAlt,title,body}) => {
    return(
        <div className="card">
            <img src={imgSrc} alt="default img" className='cardImg'></img>
            <h2>{title}</h2>
            <p className='cardBody'>{body}</p>
        </div>
    );
}

export default Card