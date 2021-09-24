import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ItemHelper from "./ItemHelper";
import ItemComponent from "./ItemComponent";
import ReactHtmlParser from "react-html-parser";
import "./ItemDetails.scss";

const ItemDetails = ({
  item,
  fetchSubitemsUrl,
  titleDisplayKeys,
  detailsDisplayKeys,
  ...props
}) => {

  useEffect(() => {
    if (item?.ilevel === 0 || item?.ilevel === 1) {
      getSubitems();
    } else {
      setSubItems([]);
    }

    setHasDetails(ItemHelper.itemHasDetails());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  

  const [subItems, setSubItems] = useState([]);
  const [hasDetails, setHasDetails] = useState(ItemHelper.itemHasDetails());
  

  const getSubitems = async () => {
    const data = await ItemHelper.getSubitems(
      fetchSubitemsUrl.replace("{id}", item.id)
    );
    setSubItems(data);
  };

  
  return (
    <div className={"item-details-container "}>
      {item && (
        <>
          <h3 className="item-title">
            {ItemHelper.getTitle(item, titleDisplayKeys)}
          </h3>
          <div className="item-content">
            {subItems.length > 0 && (
              <div className="subitems-container">
                <ul className="subitems-list">
                  {subItems.map((subItem) => {
                    return (
                      <div className="sub-item" key={subItem.id}>
                        <ItemComponent item={subItem}></ItemComponent>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
            {
              hasDetails &&
              <div className="item-details">
                <div className="item-description">
                  {ReactHtmlParser(item.description)}
                </div>
              </div>
            }
            
          </div>
        </>
      )}
      {!item && (
        <h2 className="blank-content-title">Select an item from sidepanel</h2>
      )}
    </div>
  );
};

ItemDetails.propTypes = {
  item: PropTypes.object,
  fetchSubitemsUrl: PropTypes.string,
  titleDisplayKeys: PropTypes.arrayOf(PropTypes.string),
  detailsDisplayKeys: PropTypes.arrayOf(PropTypes.string),
};

ItemDetails.defaultProps = {
  fetchSubitemsUrl: '',
  titleDisplayKeys: [],
  detailsDisplayKeys: []
}

export default ItemDetails;
