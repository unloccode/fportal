import React from 'react';
import AuthService from '../services/auth.service.js';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    handleLogin(e){
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });
        AuthService.login(this.state.username, this.state.password).then(()=>{
            this.props.history.push("/profile");
            window.location.reload();
        }, 
        error=>{
            const resMessage = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            this.setState({
                loading: false,
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
                    <form onSubmit={this.handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}