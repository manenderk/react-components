import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemComponent from "./ItemComponent";
import ItemDetails from "./ItemDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./ItemsExplorer.scss";

const ItemsExplorerComponent = ({
  items,
  titleDisplayKeys,
  detailsDisplayKeys,
  fetchSubitemsUrl,

  ...props
}) => {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="items-explorer row">
      <div className="sidebar col-4">
        {items.length > 0 && (
          <ul className="items level1">
            {items.map((item) => {
              return (
                <ItemComponent
                  key={item.id}
                  item={item}
                  fetchSubitemsUrl={fetchSubitemsUrl}
                  titleDisplayKeys={titleDisplayKeys}
                  onClick={(selectedItem) => {
                    setCurrentItem(selectedItem);
                  }}
                />
              );
            })}
          </ul>
        )}
      </div>
      <div className="content-container col-8">
        <ItemDetails
          item={currentItem}
          fetchSubitemsUrl={fetchSubitemsUrl}
          titleDisplayKeys={titleDisplayKeys}
          detailsDisplayKeys={detailsDisplayKeys}
        ></ItemDetails>
      </div>
    </div>
  );
};

ItemsExplorerComponent.propTypes = {
  /**
   * Array of items object to display
   */
  items: PropTypes.array,

  /**
   * Array of item object keys that will be used to display item title
   */
  titleDisplayKeys: PropTypes.arrayOf(PropTypes.string),

  /**
   * Array of item object keys that will be used to display item details
   */
  detailsDisplayKeys: PropTypes.arrayOf(PropTypes.string),

  /**
   * Url to fetch sub items. Add identifier {id} in url. This identified will be replaced by item id
   */
  fetchSubitemsUrl: PropTypes.string,
};

ItemsExplorerComponent.defaultProps = {
  fetchSubitemsUrl: "",
  titleDisplayKeys: [],
  detailsDisplayKeys: [],
};

export default ItemsExplorerComponent;
