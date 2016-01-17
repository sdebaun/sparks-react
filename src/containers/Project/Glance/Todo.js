import React from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import NavListItem from 'components/NavListItem'

import ForwardIcon from 'material-ui/lib/svg-icons/content/forward';

class Todo extends React.Component {
  
  render() {
    const baseUrl = '/project/'+this.props.params.projectKey
    return (
      <List>
        <NavListItem leftIcon={<ForwardIcon/>}
         primaryText="What's Your Project All About?" route={baseUrl + '/manage'}/>
        <ListItem leftIcon={<ForwardIcon/>}
         primaryText="Build Your First Team"/>
      </List>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Todo);