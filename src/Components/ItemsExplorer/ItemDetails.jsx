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
  levelKey,
  listLevel1Icon,
  listLevel2Icon,
  ...props
}) => {

  

  const [currentItem, setCurrentItem] = useState(item);
  const [subItems, setSubItems] = useState([]);
  const [hasDetails, setHasDetails] = useState(
    ItemHelper.itemHasDetails(currentItem, detailsDisplayKeys)
  );

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  useEffect(() => {
    if (levelKey && currentItem && (currentItem[levelKey] === 0 || currentItem[levelKey] === 1)) {
      getSubitems();
    } else {
      setSubItems([]);
    }

    setHasDetails(ItemHelper.itemHasDetails(currentItem, detailsDisplayKeys));
  }, [currentItem, detailsDisplayKeys, levelKey])

  const getSubitems = async () => {
    const data = await ItemHelper.getSubitems(
      fetchSubitemsUrl.replace("{id}", currentItem.id)
    );
    setSubItems(data);
  };

  return (
    <div className={"item-details-container "}>
      {item && (
        <>
          <h3 className="item-title">
          {
            ItemHelper.getItemIcon(currentItem, levelKey, listLevel1Icon, listLevel2Icon) && 
            <span className="list-icon">
              {ReactHtmlParser(ItemHelper.getItemIcon(currentItem, levelKey, listLevel1Icon, listLevel2Icon))}
            </span>  
          }
          {ItemHelper.getTitle(currentItem, titleDisplayKeys)}
          </h3>
          <div className="item-content">
            {subItems.length > 0 && (
              <div className="subitems-container">
                <ul className="subitems-list">
                  {subItems.map((subItem) => {
                    return (
                      <div className="sub-item" key={subItem.id}>
                        <ItemComponent
                          item={subItem}
                          titleDisplayKeys={titleDisplayKeys}
                          levelKey={levelKey}
                          listLevel1Icon={listLevel1Icon}
                          listLevel2Icon={listLevel2Icon}
                          onClick={(item) => setCurrentItem(item)}
                        ></ItemComponent>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
            {hasDetails && (
              <div className="item-details">
                <div className="item-description">
                  {ReactHtmlParser(currentItem.description)}
                </div>
              </div>
            )}
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
  /**
   * Item object to display
   */
  item: PropTypes.object,

  /**
   * Url to fetch sub items. Add identifier {id} in url. This identified will be replaced by item id
   */
  fetchSubitemsUrl: PropTypes.string,

  /**
   * Array of item object keys that will be used to display item title
   */
  titleDisplayKeys: PropTypes.arrayOf(PropTypes.string),

  /**
   * Array of item object keys that will be used to display item details
   */
  detailsDisplayKeys: PropTypes.arrayOf(PropTypes.string),

  /**
   * Items Level Key
   */
  levelKey: PropTypes.string,

  /**
   * Icon to display level 1 items list
   */
  listLevel1Icon: PropTypes.string,

  /**
   * Icon to display for level 2 items list
   */

  listLevel2Icon: PropTypes.string,
};

ItemDetails.defaultProps = {
  fetchSubitemsUrl: "",
  titleDisplayKeys: [],
  detailsDisplayKeys: [],
  listLevel1Icon: "",
  listLevel2Icon: "",
  levelKey: "",
};

export default ItemDetails;
