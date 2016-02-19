import React from 'react';
import List from 'components/styled/List'
import ListItem from 'material-ui/lib/lists/list-item'
import Popover from 'material-ui/lib/popover/popover';

import ArrowDropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

export default class DropDownHeader extends React.Component {
  state = { open: false }

  open = (evt) => this.setState({open:true, anchorEl: evt.currentTarget})

  close = () => this.setState({open:false})

  action = value => () =>
    value && [this.props.onTouchTap(value), this.close()]

  render() {
    const {props: {primaryText, children}, state: {open, anchorEl} } = this
    // onTouchTap fails on mobile?? or just mobile emulator in chrome?
    return <div onClick={(evt)=>(children.length>0) && this.open(evt)}>
      <ListItem {...{primaryText:<span>{primaryText} {(children.length>0) && <ArrowDropDownIcon/>}</span>,style:{fontSize:'1.2em',fontWeight:'bold'}}}/>
      <Popover {...{open,anchorEl}} onRequestClose={this.close}>
        <List>
        { React.Children.map(children,(child)=>
          React.cloneElement(child,{key:child.props.value, onTouchTap:this.action(child.props.value)})
        )}
        </List>
      </Popover>
    </div>
  }
}

