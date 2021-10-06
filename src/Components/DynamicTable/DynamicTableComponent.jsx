import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./DynamicTable.scss";

import ReactPaginate from 'react-paginate';
import moment from 'moment';


const DynamicTableComponent = ({
  headers,
  data,
  fetchUrl,
  idKey,
  editAction,
  viewAction,
  deleteAction,
  sortBy,
  sortDirection,
  ...props
}) => {
  const [tableHeaders, setTableHeaders] = useState(headers);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  useEffect(() => {

    if (!headers || headers.length === 0) {
      throw new Error('Headers not provided');
    }

    if (viewAction || editAction || deleteAction) {
      if (!idKey) {
        throw new Error(
          "idKey is not specified. To use edit/delete actions specify idKey"
        );
      }
    }

    if (editAction || deleteAction) {
      setTableHeaders([
        ...headers,
        {
          label: "Action",
          key: "item_action",
        },
      ]);
    }
  }, [viewAction, editAction, deleteAction, idKey, headers]);

  useEffect(() => {
    if (data && data.length > 0) {
      setTableData(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage))
    } else if (fetchUrl) {
      fetchTableData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fetchUrl])

  const fetchTableData = async () => {
    try {
      let url = fetchUrl.replace('{currentPage}', currentPage).replace('{perPage}', itemsPerPage);
      const resp = await fetch(url);
      const apiData = await resp.json();

      if (!apiData.data) {
        throw new Error("Data object doesn't exists in response");
      }
      if (!apiData.total_pages) {
        throw new Error("Total Pages doesn't exists in response");
      }

      setTableData(apiData.data);
      setTotalPages(apiData.total_pages);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTableData();
  }, [currentPage, itemsPerPage])

  const printColumnByDataType = (header, item) => {
    if (header.key === "item_action") {
      return (
        <>
          {editAction && (
            <a
              href={editAction.replace("{id}", item[idKey])}
              className="item-action"
            >
              Edit
            </a>
          )}
          {deleteAction && (
            <a
              href={deleteAction.replace("{id}", item[idKey])}
              className="item-action"
            >
              Delete
            </a>
          )}
        </>
      );
    }

    let col = item[header.key];

    if (!col) {
      return "";
    }

    let formattedText = null;

    switch (header.dataType) {
      case "bool":
        formattedText = col === true ? "Yes" : "No";
        break;
      case "date":
        if (typeof col === 'string') {
          col = moment(col);
        } else {

        }

        if(moment().diff(col, 'days') > 1)  {
          formattedText = col.format('lll');
        } else {
          formattedText = col.fromNow();
        }
         
        
        break;
      default:
        formattedText = col + "";
        break;
    }
    return formattedText;
  };

  return (
    <>
      <div className="dynamic-table">
        <div className="header-row">
          {tableHeaders.map((header, index) => {
            return (
              <div className="header-col" key={index}>
                {header.label}
              </div>
            );
          })}
        </div>
        <div className="item-row-container">
          {tableData.map((item, index) => {
            return (
              <div className="item-row" key={index}>
                {tableHeaders.map((header, index1) => {
                  return (
                    <div className="item" key={index1}>
                      {index1 === 0 && viewAction && (
                        <a href={viewAction.replace("{id}", item[idKey])}>
                          {printColumnByDataType(header, item)}
                        </a>
                      )}
                      {(index1 > 0 || !viewAction) &&
                        printColumnByDataType(header, item)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="bottom-action-row">
          <select id="perpage-dropdown" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={6}
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </>
  );
};

DynamicTableComponent.propTypes = {
  /**
   * Headers for the table
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      dataType: PropTypes.oneOf(["bool", "string", "number", "date"]),
    })
  ),

  /**
   * Data for the table
   */
  data: PropTypes.array,

  /**
   * Fetch url
   */
  fetchUrl: PropTypes.string,

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
  deleteAction: PropTypes.string,

  /**
   * Default Sort By Column
   */
  sortBy: PropTypes.string,

  /**
   * Default Sort By Direction
   */
  sortDirection: PropTypes.oneOf(["ASC", "DESC"]),
};

DynamicTableComponent.defaultProps = {
  sortBy: "",
  sortDirection: "ASC",
};

export default DynamicTableComponent;
