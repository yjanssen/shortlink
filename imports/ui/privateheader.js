import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    
    const onLogout = ()=>{
        Accounts.logout();
    }

    return (
        <div className="header">
            <div className="header__content">
            <h1 className="header__title">{props.title}</h1>
            <button className="button button--link-text" onClick={onLogout}>Log out</button>
            </div>
        </div>);
};    

//PLayers is required
PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default PrivateHeader;



