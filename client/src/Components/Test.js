import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Test = () => {
    const [imageData, setImageData] = useState(null);

    const getImageData = async () => {
        // Make a request to the backend server to get the image data.
        const response = await axios.get('http://localhost:5000/users/64d3b611dd4732d80a717608/profile')
        // Convert the image data to Latin1.
     };

    useEffect(() => {
        getImageData()
    }, [])

    const img = (
        <img
            alt="Profile image"
            src={imageData}
            width="100"
            height="100"
        />
    );

    if(imageData) return (
        <>
         {img}
         Hello
        </>
    );
}

export default Test