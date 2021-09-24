import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ItemsExplorer.scss";

import ItemComponent from "./ItemComponent";
import ItemDetails from "./ItemDetails";

const ItemsExplorerComponent = ({
  items,
  itemsDisplayKeys,
  idkey,
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
                  fetchSubitemsUrl={`http://rails.docswiz.com:3333/projects/1/items/${item.id}/children.json`}
                  onClick={(e) => { setCurrentItem(item) }}
                />
              );
            })}
          </ul>
        )}
      </div>
      <div className="content-container col-8">
        <ItemDetails item={currentItem}></ItemDetails>
      </div>
    </div>
  );
};

ItemsExplorerComponent.propTypes = {
  items: PropTypes.array,
  itemsDisplayKeys: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
  idkey: PropTypes.string,
};

export default ItemsExplorerComponent;
