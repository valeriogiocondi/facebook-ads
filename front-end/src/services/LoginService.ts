// CONFIG
import config from '../config';

// GRAPHQL RELAY
import { fetchQuery } from 'react-relay';
import environment from '../_view/relay/environment';
import LoginAuthQuery from '../_model/relay/query/LoginAuthQuery';

class LoginService  {

  async auth(username: string, password: string): Promise<boolean | void> {

		let data = { 
      username: username, 
      password: password 
    };

    return await fetchQuery(environment, LoginAuthQuery, data)
			.then((response: any) => {

        if (response.loginAuth) {

          localStorage.setItem('authToken', response.loginAuth);
          return true;
        }
        return false;

			}).catch((err) => {

				console.log(err);
			});
  }

  isAuth(): boolean {

    return (localStorage.getItem('authToken') ? true : false);
  }

  refreshToken(token: string): void {

    localStorage.setItem("authToken", token);
  }

  logout(): boolean {
    
    const authToken = localStorage.getItem("authToken");

    if (authToken) {

      localStorage.removeItem("authToken");

      let response = fetch(
        config.endpoints.auth + "logout/", 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(response => response.json());
       
      if (response) return true;
    }

    return false;
  }

}

// SINGLETON
// Export an instance of the class directly
export default new LoginService();