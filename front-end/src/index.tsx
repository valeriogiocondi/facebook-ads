import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// REDUX
import { Provider } from 'react-redux'

// REDUX - STORE
import store from './_model/redux/redux-store';

// ROUTER
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// STYLE
import './index.less';

// PAGES
import AdsList from './_view/pages/ads-list/AdsList';
import Ads from './_view/pages/ads/Ads';
import BatchJobList from './_view/pages/batch-job-list/BatchJobList';
import BatchJobExecutedList from './_view/pages/batch-jobs-executed-list/BatchJobsExecutedList';
import BatchJob from './_view/pages/batch-job/BatchJob';
import BatchJobExecuted from './_view/pages/batch-job-executed/BatchJobExecuted';
import PageSocialList from './_view/pages/page-social-list/PageSocialList';
import PageSocial from './_view/pages/page-social/PageSocial';
import Login from './_view/pages/login/Login';
import Logout from './_view/pages/logout/Logout';
import Page404 from './_view/pages/error/error-404/Error404';

const Index = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/logout" component={ Logout } />
        <Route exact path="/" component={ PageSocialList } />
        <Route exact path="/page-social/" component={ PageSocialList } />
        <Route exact path="/page-social/:id/:internalID" component={ PageSocial } />
        <Route exact path="/batch-job-list/" component={ BatchJobList } />
        <Route exact path="/batch-job/:type/:id" component={ BatchJob } />
        <Route exact path="/batch-job-executed-list/" component={ BatchJobExecutedList } />
        <Route exact path="/batch-job-executed/:id" component={ BatchJobExecuted } />
        <Route exact path="/ads/:id" component={ Ads } />
        <Route component={ Page404 } />
      </Switch>
    </Router>
  </Provider>
)
  
ReactDOM.render(<Index store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
