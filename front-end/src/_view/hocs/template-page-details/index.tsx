import React from 'react';

import Menu from '../../components/Menu/Menu';

// STYLE
import './template-page-details.less';
import { KeyboardBackspace as KeyboardBackspaceIcon } from '@material-ui/icons';


export default (Component: any, title: string): any => {

  return class extends React.Component<{}, {}> {

    render() {
      return (
				<div 
          id="main-article" 
          className="container"
        >
          <div id="template-page-details">
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