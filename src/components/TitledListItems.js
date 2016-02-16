import React from 'react'
import ListItemHeader from 'components/styled/ListItemHeader'

export default ({primaryText,items,mapper})=>
  <div>
    { (items.length > 0) && <ListItemHeader {...{primaryText}}/> }
    { items.map( mapper ) }
  </div>
