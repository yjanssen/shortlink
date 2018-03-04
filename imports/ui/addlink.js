import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component{
    constructor(props){
    super(props)
        this.state={
            url:'Yannick was here',
            isOpen:false,
            error:''
        };
    }
    onSubmit(e){
        const {url} = this.state;
        e.preventDefault();
        if(url){
            Meteor.call('links.insert',url, (err,res)=>{
                if(!err){
                    this.setState({url:'',isOpen:false, error:''});
                }else{
                    this.setState({error:err.reason});
                }
            });
            //LinksDB.insert({url, userId:Meteor.userId()});
        }
    }

    onChange(e){
        this.setState({
            url:e.target.value
        });
    }
    handleModalClose(){
        this.setState({isOpen:false, url:'', error:''});
    }

    render() {
        return (<div>

            <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
            <Modal
                isOpen={this.state.isOpen}
                contentLabel="Add Link"
                ariaHideApp={false}
                onAfterOpen={() => this.refs.url.focus()}
                onRequestClose={this.handleModalClose.bind(this)}
                className="boxed-view__box"
                overlayClassName="boxed-view boxed-view--modal">
                <h1>Add a link</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)} />
                    <button className="button">Add link</button>
                    <button type="button" className="button button--secondary" onClick={() => this.setState({ isOpen: false, url: '', error: '' })}> Cancel </button>
                    </form>
            </Modal>
            
        </div> 
        )
    }

}
