import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item'

class OpeningListItem extends React.Component {
  state = { isOpen: false }

  open = ()=>{ this.setState({isOpen:true})}
  close = ()=>{ this.setState({isOpen:false})}
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