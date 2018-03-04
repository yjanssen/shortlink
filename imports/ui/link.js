import React from 'react';
import LinksList from '../ui/linkslist';
import PrivateHeader from '../ui/privateheader';
import AddLink from '../ui/addlink';
import LinksListFilter from  './LinksListFilter';
// import createHistory from "history/createBrowserHistory";
// const history = createHistory();
// // Get the current location.
// const location = history.location.pathname;
// console.log(location);

// export default class Linka extends React.Component {
    
//     render(){
//         return (
//             <div>
//             {/*<p>Want to come back</p>
//             <button onClick={this.onLogout.bind(this)}>Log out</button>*/}
//             <PrivateHeader title="Your links"/>
//            <LinksList/>
//            <AddLink/>
//            </div>
//         );
//     }
// };

export default () => {
        return (
                <div>
                        <PrivateHeader title="Your links" />
                        {/*<p>Want to come back</p>
            <button onClick={this.onLogout.bind(this)}>Log out</button>*/}
                        <div className="page-content">

                                <LinksListFilter />
                                <AddLink />
                                <LinksList />
                        </div>
                </div>
        );
};