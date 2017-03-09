import axios from 'axios';
import qs from 'qs';
import { hashHistory } from 'react-router';

module.exports = {
    login(username, pass) {
        return new Promise((fulfill, reject) => {
            if (localStorage.token) {
                this.onChange(true)
                return fulfill();
            } else {
                axios
                    .post('http://localhost:3010/users/login', qs.stringify({
                        username: username,
                        password: pass
                    }))
                    .then((response) => {
                        localStorage.token = response.data.token;
                        fulfill();
                        this.onChange(true);
                    })
                    .catch((error) => {
                        this.onChange(false);
                    });
            }
        });
    },

    getToken() {
        return localStorage.token
    },

    logout() {
        delete localStorage.token
        hashHistory.push('/login')
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange() {}
}
