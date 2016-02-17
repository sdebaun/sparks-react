import React, {Children, cloneElement} from 'react';
import DropDownHeader from 'components/DropDownHeader'

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
        child.props.value &&
        cloneElement(child,{open:showDialog==child.props.value,onRequestClose:this.closeDialog}) ||
        child
      ) }
    </div>
  }
}

