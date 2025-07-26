import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
    
    return (
    <div className='w-full h-screen flex justify-center items-center'><BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#949494"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </div>)
      
};

export default Loader;

