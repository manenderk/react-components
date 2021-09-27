import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Item.scss";
import ItemHelper from "./ItemHelper";
import striptags from "striptags";
import ReactHtmlParser from "react-html-parser";


const ItemComponent = ({
  item,
  fetchSubitemsUrl,
  titleDisplayKeys,
  listLevel1Icon,
  listLevel2Icon,
  levelKey,
  ...props
}) => {
  if (!item) {
    throw new Error("Item object is required");
  }

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    if (!isCollapsed && subItems.length === 0) {
      getSubitems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  const getSubitems = async () => {
    const data = await ItemHelper.getSubitems(
      fetchSubitemsUrl.replace("{id}", item.id)
    );
    setSubItems(data);
  };

  return (
    <li className="item-tile" key={item.id}>
      <div className="tile-title">
        {fetchSubitemsUrl && (
          <span
            className="collapse-action"
            onClick={(e) => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <i className="fas fa-chevron-right" />
            ) : (
              <i className="fas fa-chevron-down" />
            )}
          </span>
        )}
        {
          ItemHelper.getItemIcon(item, levelKey, listLevel1Icon, listLevel2Icon) && 
          <span className="list-icon">
            {ReactHtmlParser(ItemHelper.getItemIcon(item, levelKey, listLevel1Icon, listLevel2Icon))}
          </span>  
        }
        <span className="item-title-text" onClick={() => (props.onClick ? props.onClick(item) : null)}>
          {ItemHelper.getTitle(item, titleDisplayKeys)}
        </span>
      </div>
      {item.description && (
        <div className="item-description">
          {striptags(item.description).substr(0, 100)}
        </div>
      )}
      {subItems.length > 0 && !isCollapsed && (
        <ul className="subitems">
          {subItems.map((subItem) => {
            return (
              <ItemComponent
                item={subItem}
                onClick={(selectedItem) =>
                  props.onClick ? props.onClick(selectedItem) : null
                }
                key={subItem.id}
                titleDisplayKeys={titleDisplayKeys}
                levelKey={levelKey}
                listLevel1Icon={listLevel1Icon}
                listLevel2Icon={listLevel2Icon}
              ></ItemComponent>
            );
          })}
        </ul>
      )}
    </li>
  );
};

ItemComponent.propTypes = {
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

ItemComponent.defaultProps = {
  fetchSubitemsUrl: "",
  titleDisplayKeys: [],
  listLevel1Icon: '',
  listLevel2Icon: '',
  levelKey: ''
};

export default ItemComponent;
