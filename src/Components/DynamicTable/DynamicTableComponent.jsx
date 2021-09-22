import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DynamicTable.scss';

const DynamicTableComponent = ({headers, data, editAction, viewAction, deleteAction, ...props}) => {

  const [tableHeaders, setTableHeaders] = useState(headers);
  const [tableData, setTableData] = useState(data)

  useEffect(() => {
    if (editAction || deleteAction) {
      setTableHeaders([...headers, {
        label: 'Action',
        key: 'item_action'
      }])
    }
  }, [headers])

  


  const printColumnByDataType = (header, item) => {
    if (!item) {
      return '';
    }

    let formattedText = null;
    
    switch (header.dataType) {
      case 'bool':
        formattedText = item === true ? 'Yes' : 'No'
        break;
      case 'date':
        formattedText = item.toDateString();
        break;
      default:
        formattedText = item + '';
        break;
    }
    return formattedText;
  }

  return (
    <>
      <div className="dynamic-table">
        <div className="header-row">
          {
            tableHeaders.map((header, index) => {
              return (
                <div className="header-col" key={index}>
                  {header.label}
                </div>
              )
            })
          }
        </div>
        <div className="item-row-container">
          {
            tableData.map((item, index) => {
              return(
                <div className="item-row" key={index}>
                  {
                    tableHeaders.map((header, index1) => {
                      return (
                        <div className="item" key={index1}>
                          {printColumnByDataType(header, item[header.key])}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

DynamicTableComponent.propTypes = {
  /**
   * Headers for the table
   */
  headers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
    dataType: PropTypes.oneOf(['bool', 'string', 'number', 'date'])
  })),

  /**
   * Data for the table
   */
  data: PropTypes.array,

  /**
   * ID key for each record
   */
  idKey: PropTypes.string,

  /**
   * Url for edit item
   */
  editAction: PropTypes.string,

  /**
   * Url for view item
   */
  viewAction: PropTypes.string,

  /**
   * Url for delete item
   */
  deleteAction: PropTypes.string
}

export default DynamicTableComponent
