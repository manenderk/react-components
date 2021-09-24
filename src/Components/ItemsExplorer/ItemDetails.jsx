import React from 'react'
import PropTypes from 'prop-types'

const ItemDetails = ({item, ...props}) => {
  return (
    <div>
      {item?.title}
    </div>
  )
}

ItemDetails.propTypes = {
  item: PropTypes.object
}

export default ItemDetails
