import React from 'react';

import MainBar from 'components/MainBar'
import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    return (
      <div className="index">
        <MainBar/>
        <NavTabs>
          <Tab label='Finding' route='/dash' />
          <Tab label='Doing' route='/dash/doing' />
        </NavTabs>
        {this.props.children}
      </div>
    );
  }

}

export default Main;
