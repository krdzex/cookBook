import React from 'react';
import AllRecipes from './AllRecipes';
import LatestRecipes from './LatestRecipes';
import TopRatingsRecipes from './TopRatingsRecipes';

const HomePage = () => {
    return (
        <div className="middleOfScreen">
            <AllRecipes />
            <div className="rightSplitSide">
                <TopRatingsRecipes />
                <LatestRecipes />
            </div>

        </div>
    );
};

export default HomePage;