// import pic from './assets/IMG_1809.jpg'

export const Card= ({imgSrc,id,title,body,onClick}) => {
    let recID = id
    return(
        <button className="card" onClick={onClick} style={{ border: 'none', background: 'none', padding: 0 }}>
            <img src={imgSrc} alt="default img" className='cardImg'></img>
            <h2>{title}</h2>
            <p className='cardBody'>{body}</p>
            
            </button>
    );
}

export default Card