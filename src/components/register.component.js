import React from 'react';

import AuthService from '../services/auth.service';

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    handleRegister(e){
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });
        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
        ).then(response=>{
            this.setState({
                message: response.data.message,
                successful: true
            });
        },
        error=>{
            const resMessage = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            this.setState({
                successful: false,
                message: resMessage
            });
        }
        );
    }
    render(){
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <form onSubmit={this.handleRegister}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" valuee={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" valuee={this.state.email} onChange={this.onChangeEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" valuee={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}