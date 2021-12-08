import React from 'react'
import PropTypes from 'prop-types'

const itemsExplorerComponent = (
  fetchItemsUrl,
  icons,
  titleKeys,
  detailsKeys,
  idKeys,
  ...props
) => {
  return (
    <div>
      
    </div>
  )
}

itemsExplorerComponent.propTypes = {
  fetchItemsUrl: PropTypes.arrayOf(PropTypes.string),
  icons: PropTypes.arrayOf(PropTypes.string),
  titleKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  detailsKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  idKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default itemsExplorerComponent
