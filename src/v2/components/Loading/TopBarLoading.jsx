import React from 'react';
import { useSelector } from 'react-redux';

const TopBarLoading = () => {
    const loading = useSelector((state)=> (state.loadingTopBar))
    if(!loading.show){
        return
    }
    return (
        <div className="top-bar-loading absolute top-[88px]">
            <div className="spinner"></div>
        </div>
    );
};

export default TopBarLoading;
