import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            error:''
        };
    }

    // componentWillMount() {
    //     if (Meteor.userId())
    //         {alert(this.props.location);
    //             //this.props.history.replace('/link')};
    // }}

    onSubmit(e){
        e.preventDefault();
        let email=this.refs.email.value.trim();
        let password = this.refs.pass.value.trim();

        Meteor.loginWithPassword({email},password,(err)=>{
            if(err){
                this.setState({
                    error: 'Unable to login, check email and password'
                });
            }
            else {
                this.setState({
                    error: ''
                });

            }
        });
    }
    
    render(){ 
          return (
           <div className="boxed-view">
           <div className="boxed-view__box">
           <h1>Log in here</h1>
           {this.state.error ? <p>{this.state.error}</p> : undefined}
           <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
               <input type="email" ref="email" name="email" placeholder="Email" />
               <input type="password" ref="pass" name="password" placeholder="Password" />
               <button className="button">Login</button>
           </form>
            <Link to="/signup">Need to create an account</Link>
            </div>
            </div>
          )}
  
  }