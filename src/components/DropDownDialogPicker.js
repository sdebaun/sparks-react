import React, {Children, cloneElement} from 'react';
import DropDownHeader from 'components/DropDownHeader'
import Dialog from 'components/styled/Dialog'

export default class DropDownDialogPicker extends React.Component {
  state = { showDialog: false }

  openDialog = (key) => this.setState({showDialog:key})

  closeDialog = (data)=> {
    data && this.props.create && this.props.create(data)
    this.setState({showDialog:false})
  }

  render() {
    const {props: {primaryText,items,dialogs}, state:{showDialog}} = this
    return <div>
      <DropDownHeader {...{primaryText,onTouchTap:this.openDialog}}>
        { Children.map(items, (child)=>
            cloneElement(child,{key:child.props.value})
        )}
      </DropDownHeader>
      { Children.map(dialogs, (child)=>
        <Dialog open={showDialog==child.props.value} onRequestClose={this.closeDialog}
          title={child.props.title} leftIcon={child.props.leftIcon}
          >
        { cloneElement(child,{onSubmit:(data)=>this.closeDialog({...data,party:child.props.party,code:child.props.value})}) }
        </Dialog>
      ) }
    </div>
  }
}

