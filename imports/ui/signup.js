import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count:0,
            error:''
        };
    }
    
    increment(){
        this.setState({
            count: this.state.count + 1
        });
    }

    decrement(){
        this.setState({
            count:this.state.count - 1
        })
    }

    // componentWillMount() {
    //     if (Meteor.userId()){
    //     alert(this.props.location);    
    //     //this.props.history.replace('/link');
    // }}

    onSubmit(e){
        e.preventDefault();
        let email=this.refs.email.value.trim();
        let password = this.refs.pass.value;

        if (password.length<7){
            return this.setState({error:'Password not long my friend'});
        }

        Accounts.createUser({email,password},(err)=> {
            if (err) {
                this.setState({
                    error: err.reason
                })}
            else {
                this.setState({
                        error: ''
                    })
                }
            }
        )
        // this.setState({
        //     error: 'Something went wrong!'
        // })
    }

    render(){ 
          return (
              <div className="boxed-view">
                  <div className="boxed-view__box">
                      <h1>Join Shortlink</h1>
                      {this.state.error ? <p>{this.state.error}</p> : undefined}
                      <p>{this.state.count}</p>
                      <button onClick={this.increment.bind(this)}>+1</button>
                      <button onClick={this.decrement.bind(this)}>-1</button>
                      <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                          <input type="email" ref="email" name="email" placeholder="Email" />
                          <input type="password" ref="pass" name="password" placeholder="Password" />
                          <button>Create account</button>
                      </form>
                      <Link to="/">Already have an account?</Link>
                  </div>
              </div>
           );
    };
}