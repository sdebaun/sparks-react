import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress'

export default class PageLoadSpinner extends React.Component {
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',paddingTop:'2em'}}>
        <CircularProgress mode='indeterminate' size={3}/>
      </div>
    );
  }
}