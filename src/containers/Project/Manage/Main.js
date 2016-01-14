import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    return (
      <div>
        <NavTabs baseUrl={'/project/'+this.props.params.projectKey + '/manage'}>
          <Tab label='Describe' route='' />
          <Tab label='Exchange' route='/exchange' />
          <Tab label='Other' route='/other' />
        </NavTabs>
        {this.props.children}
      </div>
    );
  }

}

export default Main;
