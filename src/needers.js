import React from 'react'
import needful from 'lib/react-needful'
import { partialRight } from 'ramda'

import PageLoadSpinner from 'components/PageLoadSpinner'
import ListItemLoadSpinner from 'components/ListItemLoadSpinner'

export const needfulPage = partialRight(needful,[<PageLoadSpinner/>])

export const needfulListItem = partialRight(needful,[<ListItemLoadSpinner/>])
