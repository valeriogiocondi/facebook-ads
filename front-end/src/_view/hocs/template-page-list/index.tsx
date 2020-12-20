import React, { ClassType } from 'react';

import Menu from '../../components/Menu/Menu';

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

  return class extends React.Component<{}, {}> {

    render() {
      return (
				<div 
          id="main-article" 
          className="container"
        >
          <div id="template-page-list">
            <header>
              <Menu />
            </header>
            <article>
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
            </article>
          </div>
        </div>
      );
    }
  };

};