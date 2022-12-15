import React from 'react';
import loader from './loader.module.css';

const Loader = () => {
	return (
        <div className = {loader.container}>
            <div className={`${loader.spinner}`}></div>
        </div>
    )
}

export default Loader;