import React from 'react';

function Images({src,...rest}) {

    return <img src={src} {...rest} alt={""} className=""/>
}

export default Images;