import React from 'react';
import {Session } from 'meteor/session';
import {Tracker} from 'meteor/tracker';

export default class LinkListFilter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showVisible:true
        };
    }

    //listening session through Tracker
    componentDidMount(){
        this.filterTracker = Tracker.autorun(()=>{
            this.setState({showVisible:Session.get('showVisible')});
          });   
    }

    componentWillUnmount(){
        this.filterTracker.stop();
    }

    //example of controlled input, changed by code and user
    render(){
        return(
        <div>
        <label className="checkbox">
            <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e)=>{
                Session.set('showVisible', !e.target.checked);
            }}/>
            show hidden links
        </label>
        </div>)
        };
};