import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ItemHelper from "./ItemHelper";
import ItemComponent from "./ItemComponent";
import ReactHtmlParser from "react-html-parser";
import "./ItemDetails.scss";

const ItemDetails = ({
  item,
  document,
  fetchSubitemsUrl,
  titleDisplayKeys,
  detailsDisplayKeys,
  levelKey,
  listLevel1Icon,
  listLevel2Icon,
  ...props
}) => { 
  const [image, setImage] = useState(null);
  const [isPageDisplayed, setIsPageDisplayed] = useState(false)
  const [currentItem, setCurrentItem] = useState(item);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    setCurrentItem(item)
  }, [item]);
  
  useEffect(() => {
    if (!currentItem) {
      return;
    }
    if (currentItem.claim_id) {
      getSubitems(currentItem.id);
      setIsPageDisplayed(false);
    } else if (currentItem.document_id) {
      getSubitems(currentItem.document_id);
      getImage(currentItem.file);
      setIsPageDisplayed(true);
    }
  }, [currentItem]);

  useEffect(() => {
    if (!currentItem?.document_id) {
      return;
    }

    if (!subItems || subItems.length == 0) {
      setCurrentItemIndex(null);
      return;
    }

    for (let i = 0; i < subItems.length; i++) {
      if (subItems[i].id === currentItem.id) {
        setCurrentItemIndex(i);
        break;
      }
    }
  }, [subItems])

  const getSubitems = async (itemId) => {
    let data = await ItemHelper.getSubitems(
      fetchSubitemsUrl.replace("{id}", itemId)
    );
    data = data.map(subItem => {
      if (!subItem[levelKey]) {
        subItem[levelKey] = 1;
      }
      if (subItem.pgno && document.filename) {
        subItem.pgno = subItem.pgno.replace(`${rData.claim.file_no}/${document.filename}-`, '');
      }
      return subItem;
    })
    setSubItems(data);
  };
  
  const getImage = async (path) => {

    const sizes = [
      'sml',
      'med',
      'lrg'
    ];

    for (let i = 1; i < sizes.length; i++) {
      path = path.replace(`/${sizes[i-1]}/`, `/${sizes[i]}/`);
      const resp = await fetch('/pages/file?file_path=' + path)
      const image = await resp.blob();
      setImage(URL.createObjectURL(image));
    }

    
  }

  const handleNavigate = (direction) => {
    let newItemIndex = null;
    if (direction === 'left' && currentItemIndex > 0) {
      newItemIndex = currentItemIndex - 1;
    } else if (direction === 'right' && currentItemIndex < (subItems.length - 1)){
      newItemIndex = currentItemIndex + 1;
    }

    if (newItemIndex !== null) {
      setCurrentItem(subItems[newItemIndex]);
      setCurrentItemIndex(newItemIndex);

      if (props.onItemClick) {
        props.onItemClick(subItems[newItemIndex]);
      }
    }
  }

  
  return (
    <div className={"item-details-container "}>
      {item && (
        <>
          <h3 className="item-title">
            <span>
            {
              ItemHelper.getItemIcon(currentItem, levelKey, listLevel1Icon, listLevel2Icon) && 
              <span className="list-icon">
                {ReactHtmlParser(ItemHelper.getItemIcon(currentItem, levelKey, listLevel1Icon, listLevel2Icon))}
              </span>  
            }
            {ItemHelper.getTitle(currentItem, titleDisplayKeys)}
            </span>
            {
              isPageDisplayed &&
              <span className="action-items">
                <i className="pg-icon" 
                  onClick={() => handleNavigate('left')}
                >arrow_left</i>
                <i className="pg-icon"
                  onClick={() => handleNavigate('right')}
                >arrow_right</i>
              </span>
            }
          </h3>
          <div className="item-content">
            
            {isPageDisplayed && image && (
              <div className="item-details">
                <div className="item-description">
                  <img src={image} />
                </div>
              </div>
            )}
            {!isPageDisplayed && subItems.length > 0 && (
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
                          onItemClick={(selectedItem) => {
                            setCurrentItem(selectedItem);
                            if (props.onItemClick) {
                              props.onItemClick(selectedItem);
                            }
                          }}
                        ></ItemComponent>
                      </div>
                    );
                  })}
                </ul>
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
