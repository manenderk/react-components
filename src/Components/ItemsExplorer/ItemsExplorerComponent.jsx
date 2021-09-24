import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ItemsExplorer.scss";

import ItemComponent from "./ItemComponent";
import ItemDetails from "./ItemDetails";

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
  items: PropTypes.array,
  titleDisplayKeys: PropTypes.arrayOf(PropTypes.string),
  detailsDisplayKeys: PropTypes.arrayOf(PropTypes.string),
  fetchSubitemsUrl: PropTypes.string,
};

ItemsExplorerComponent.defaultProps = {
  fetchSubitemsUrl: "",
  titleDisplayKeys: [],
  detailsDisplayKeys: []
};

export default ItemsExplorerComponent;
