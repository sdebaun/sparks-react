import React from 'react';

import NavTabs from 'components/NavTabs'
import Tab from 'material-ui/lib/tabs/tab'

class Main extends React.Component {
  
  render() {
    const baseUrl = '/project/'+this.props.params.projectKey + '/manage'
    return (
      <div>
        <NavTabs>
          <Tab label='Describe' route={baseUrl} />
          <Tab label='Exchange' route={baseUrl+'/exchange'} />
          <Tab label='Other' route={baseUrl+'/other'} />
        </NavTabs>
        {this.props.children}
      </div>
    );
  }

}

export default Main;
