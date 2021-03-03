import React, { ClassType } from 'react';

import Menu from '../../components/Menu/Menu';

// REDUX - STORE
import reduxStore from '../../../_model/redux/redux-store';

// STYLE
import './template-page-list.less';
import { 
	History as HistoryIcon, 
  Home as HomeIcon, 
  KeyboardBackspace as KeyboardBackspaceIcon,
	Schedule as ScheduleIcon, 
	Undo as UndoIcon 
} 
from '@material-ui/icons';


export default (Component: any, title: string): any => {

  type props = {
    themeClass: string
  };
  type state = { };

  return class extends React.Component<state, props> {

    constructor(props: props) {
      
      super(props);
      this.state = { 
        themeClass: reduxStore.getState().themeReducer.value
      };
      reduxStore.subscribe((newState) => {
        this.setState({ themeClass: newState.themeReducer.value });
      });
    }

    render() {
      return (
				<div id="main-article" className={ this.state.themeClass }>
          <div id="template-page-list">
            <header>
              <Menu />
            </header>
            <article>
              <div className="container">
                <header>
                  <a href="/">
                    <KeyboardBackspaceIcon />
                  </a>
                  <h1 className="page-title">{ title }</h1>
                </header>
                <section className="template-container">
                  <Component />
                </section>
                <footer></footer>
              </div>
            </article>
          </div>
        </div>
      );
    }
  };

};