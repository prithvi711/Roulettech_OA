import React from "react";
import "./Modal.css";

function Modal({ trigger, onClose, data }) {
  return (
    trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <button className="closes" onClick={onClose}>Close</button>
          {data.imgSrc && <img src={data.imgSrc} alt={data.title} className='modalImg' />}
          <h2>{data.title}</h2>
          <p className="allSteps">{data.body}</p>
        </div>
      </div>
    ) : null
  );
}

export default Modal;
