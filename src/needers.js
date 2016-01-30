import React from 'react'
import needful from 'lib/react-needful'
import { partialRight } from 'ramda'

import PageLoadSpinner from 'components/PageLoadSpinner'

export const needfulPage = partialRight(needful,[<PageLoadSpinner/>])
