import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemComponent from "./ItemComponent";
import ItemDetails from "./ItemDetails";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./ItemsExplorer.scss";
import ItemHelper from "./ItemHelper";

const ItemsExplorerComponent = ({
  items,
  fetchItemsUrl,
  titleDisplayKeys,
  detailsDisplayKeys,
  fetchSubitemsUrl,
  levelKey,
  listLevel1Icon,
  listLevel2Icon,
  ...props
}) => {

  const [currentItem, setCurrentItem] = useState(null);
  const [itemsList, setItemsList] = useState([]);

  const getItems = async () => {
    const itemData = await ItemHelper.getItems(fetchItemsUrl);
    setItemsList(itemData);
  }

  useEffect(() => {
    if (items?.length > 0) {
      setItemsList(items);
    } else if (fetchItemsUrl) {
      getItems();
    } else {
      throw new Error('Items or Fetch Items url not provided');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, fetchItemsUrl])

  return (
    <div className="items-explorer row">
      <div className="sidebar col-4">
        {itemsList.length > 0 && (
          <ul className="items level1">
            {itemsList.map((item) => {
              return (
                <ItemComponent
                  key={item.id}
                  item={item}
                  fetchSubitemsUrl={fetchSubitemsUrl}
                  titleDisplayKeys={titleDisplayKeys}
                  listLevel1Icon={listLevel1Icon}
                  listLevel2Icon={listLevel2Icon}
                  levelKey={levelKey}
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
          levelKey={levelKey}
          listLevel1Icon={listLevel1Icon}
          listLevel2Icon={listLevel2Icon}
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
   * Url to fetch items
   */
  fetchItemsUrl: PropTypes.string,

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

  /**
   * Level Key
   */
  levelKey: PropTypes.string,

  /**
   * Icon to display level 1 items list
   */
  listLevel1Icon: PropTypes.string,

  /**
   * Icon to display for level 2 items list
   */

  listLevel2Icon: PropTypes.string
};

ItemsExplorerComponent.defaultProps = {
  fetchSubitemsUrl: "",
  fetchItemsUrl: '',
  titleDisplayKeys: ['code', 'title'],
  detailsDisplayKeys: ['description'],
  levelKey: 'ilevel',
  listLevel1Icon: '',
  listLevel2Icon: ''
};

export default ItemsExplorerComponent;
