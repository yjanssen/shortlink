import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';
import {LinksDB} from '../api/links';
import LinkListItem from './linklistitem';


export default class LinksList extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            links: []
        };
    }

    componentDidMount() {
        console.log('Component Did Mount / LinksList');
        this.linksTracker = Tracker.autorun(()=>{
            Meteor.subscribe('linksPub');
            const links = LinksDB.find({
                visible:Session.get('showVisible')
            }).fetch();
            this.setState({links});
          });
    }
    componentWillUnmount() {
        console.log('Component Will UnMount / LinkList');
        this.linksTracker.stop();
    }

    renderLinkListItems(){
        if(this.state.links.length === 0){
            return (<div className="item"><p className="item__status-message">No links found</p></div>)
        } else {
            return this.state.links.map((object)=>{
                const shortUrl = Meteor.absoluteUrl(object._id)
               return <LinkListItem key={object._id} shortUrl = {shortUrl} {...object}/>;
                //return (<p key={object._id}>{object.url}</p>);
        });
        }
    }

    render() {
        return (
                <div>
                <FlipMove maintainContainerHeight={true}>
                {this.renderLinkListItems()}
                </FlipMove>
                </div>
        );
    }

};


