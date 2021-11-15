import { Icon } from '@iconify/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import MainRouter from './MainRouter';

const Main = () => {
    const popUp = useSelector(state => state.popUp)
    return (
        <BrowserRouter>
            <Header />
            <div className="mainWrapper">
            <div className={popUp.error ? "popUpError show" : "popUpError"}><Icon icon="si-glyph:button-error" className="popUpIcon" style={{fontSize: "50px",marginRight: "5px"}}/>{popUp.content}</div>
            <div className={popUp.show ? "popUp show" : "popUp"}><Icon icon="flat-color-icons:ok" className="popUpIcon" style={{fontSize: "50px",marginRight: "5px"}}/>{popUp.content}</div>
                <MainRouter />
            </div>
        </BrowserRouter>
    );
};

export default Main;