import React from 'react';

import FAB from 'material-ui/lib/floating-action-button'
import ListItem from 'material-ui/lib/lists/list-item'

import Dialog from 'components/styled/Dialog'
import TeamForm from 'containers/Team/TeamForm'
import FlatButton from 'material-ui/lib/flat-button'
import AddIcon from 'material-ui/lib/svg-icons/content/add';

class Container extends React.Component {
  state = { isOpen: false }

  open = ()=> this.setState({isOpen:true})

  close = ()=> this.setState({isOpen:false})

  save = data => {
    if (data) {
      this.props.create({...data, ...{projectKey:this.props.projectKey}})
      // .then( ()=> console.log("completed push") )
    }      
    this.close()
  }

  render() {
    const {state:{isOpen}, props:{title,secondaryText,leftIcon}} = this
    return (
      <Dialog modal={false} open={isOpen} onRequestClose={this.close} leftIcon={<AddIcon/>} {...{title}}>
        WTF
      </Dialog>
    );
  }

}

import { connect } from 'react-redux';
import { Teams } from 'remote'

const mapStateToProps = ()=>{ return {} }

const mapDispatchToProps = {
  create: Teams.actions.create
}

// export default connect(mapStateToProps, mapDispatchToProps)(Container);
export default Container