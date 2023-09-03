import React from 'react';
import { useState } from 'react';
import Images from '../Images/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


function PlaceGallery({ place }) {

    const [showAllImg, setShowAllImg] = useState(false);

    if (showAllImg) {
        return (
            <div>
                <div>
                    <button onClick={() => setShowAllImg(false)} className="btn-back">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <h2 className="">Photos of {place.title}</h2>
                </div>
                {place?.photos?.length > 0 && place.photos.map((photo, idx) => (
                    <div key={idx} className="App pad-mar">
                        <Images src={photo} alt="" />
                    </div>
                ))}
            </div>
        )
    }


    return (
        <div>
            <div>
                <div className="App image-gallery">
                    <div>
                        {place.photos?.[0] && (
                            <div className="">
                                <Images onClick={() => setShowAllImg(true)} style={{ width: "500px", height: "450px", borderRadius: "5px" }} src={place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="">
                        {place.photos?.[1] && (
                            <div className="image-2">
                                <Images onClick={() => setShowAllImg(true)} style={{ width: "400px", height: "225px", borderRadius: "5px" }} src={place.photos[1]} alt="" />
                            </div>
                        )}
                        <div className="">
                            {place.photos?.[2] && (
                                <div className="image-3">
                                    <Images onClick={() => setShowAllImg(true)} style={{ width: "400px", height: "225px", borderRadius: "5px" }} src={place.photos[2]} alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="btn-login pad-mar">
                    <button onClick={() => setShowAllImg(true)} className="btn-show">
                        <FontAwesomeIcon icon={faEllipsisVertical} />&nbsp;&nbsp;Show all Images
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlaceGallery;