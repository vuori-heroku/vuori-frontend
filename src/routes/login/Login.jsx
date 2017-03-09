import React, {PropTypes} from 'react'
import { withRouter } from 'react-router';
import auth from '../../AuthService';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(event) {
      event.preventDefault();

      auth
        .login(this.state.username, this.state.password)
        .then(() => {
          this.props.router.replace('/')
        })
        .catch(error => {
          this.setState({ error: true })
        });
    }

    render() {
        return (
            <div id="b" className="Login">
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                  <form onSubmit={this.handleSubmit} className="ui large form">
                    <div className="ui stacked segment">
                      <div className="field">
                        <div className="ui left icon input">
                          <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            ></input>
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input"> 
                          <input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          ></input>
                        </div>
                      </div>
                      <button type="submit" className="ui fluid large teal submit button">Login</button>
                    </div>
                    <div className="ui error message"></div>
                    {this.state.error && (
                    <p>Bad login information</p>
                )}
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

export default withRouter(Login);
