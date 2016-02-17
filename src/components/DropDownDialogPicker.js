import React, {Children, cloneElement} from 'react';
import DropDownHeader from 'components/DropDownHeader'
import Dialog from 'components/styled/Dialog'

export default class DropDownDialogPicker extends React.Component {
  state = { showDialog: false }

  openDialog = (key) => this.setState({showDialog:key})

  closeDialog = (data)=> {
    data && this.props.save && this.props.save(data)
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
        <Dialog open={showDialog==child.props.value} onRequestClose={this.closeDialog}>
        {child}
        </Dialog>
      ) }
    </div>
  }
}

