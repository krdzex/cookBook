import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../auth/authHelper';


const Header = () => {

    const onLogOut = (e) => {
        e.preventDefault();
        authHelper.signOut();
        window.location.reload()
    }

    return (
        <div className="headerWrapper">
            <Link to="/homePage"><div className="leftSide">
                <h2>Cook book</h2>
            </div></Link>

            <div className="rightSide">
                <div>
                    <div style={{ height: "65px", fontSize: "50px", marginRight: "20px", float: "left" }}>
                        <Link to="/addRecipe"><Icon icon="carbon:add-filled" /></Link>
                    </div>
                    <div className="avatar" tabIndex="0">
                        <Icon icon="bi:person-circle" />
                    </div>
                    <div className="nav-content">
                        <div className="nav-sub">
                            <ul>
                                <li><Link to="/myProfile">My Profile</Link></li>
                                <li><Link to="/myRecipes">My Recipes</Link></li>
                                <li><a href="/" onClick={(e) => onLogOut(e)}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;