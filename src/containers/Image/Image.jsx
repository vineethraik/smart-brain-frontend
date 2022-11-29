import React from "react";
import './Image.css'

const Image = ({ url, boundingBoxes }) => {

    if (boundingBoxes === undefined) {
        boundingBoxes = [];
    }


    return (
        <div className="image main">
            <div className="image main1">
                <div className="image main2">
                    <img id="imageimg" className="image img" src={url} alt="" />
                    {boundingBoxes.map((box, i) => <div key={i} className="image boundingBox" style={{ top: box.top, bottom: box.bottom, left: box.left, right: box.right, }}></div>)}
                </div>
            </div>
        </div>
    );
}

export default Image;