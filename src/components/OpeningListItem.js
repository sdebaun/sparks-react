import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item'

import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
import AddAPhotoIcon from 'material-ui/lib/svg-icons/image/add-a-photo';

class OpeningListItem extends React.Component {
  state = { isOpen: false }

  toggle = ()=>{ this.setState({isOpen:!this.state.isOpen})}

  render() {
    const {props:{children, ...props}, state:{isOpen}} = this
    return <div>
      <ListItem onTouchTap={this.toggle} {...props}/>
      {isOpen && <div>{children}</div>}
    </div>
  }
}

export default OpeningListItem