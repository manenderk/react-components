import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemComponent from "./ItemComponent";
import ItemDetails from "./ItemDetails";
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
  const [currentDocument, setCurrentDocument] = useState(null);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    if (!currentItem) {
      return;
    }
    if (currentItem.ilevel === 0) {
      setCurrentDocument(currentItem);
    } else if (currentItem.ilevel === 1) {
      const document = itemsList.find(i => i.id === currentItem.document_id);
      setCurrentDocument(document);
    }
  }, [currentItem])

  const getItems = async () => {
    let itemData = await ItemHelper.getItems(fetchItemsUrl);

    itemData = itemData.map(item => {
      if (!item[levelKey]) {
        item[levelKey] = 0;
      }
      return item;
    })

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
            {itemsList.map((item, index) => {
              return (
                <ItemComponent
                  key={index}
                  item={item}
                  fetchSubitemsUrl={fetchSubitemsUrl}
                  titleDisplayKeys={titleDisplayKeys}
                  listLevel1Icon={listLevel1Icon}
                  listLevel2Icon={listLevel2Icon}
                  levelKey={levelKey}
                  level={1}
                  onItemClick={(selectedItem) => {
                    setCurrentItem(selectedItem);
                    if (props.onItemClick) {
                      props.onItemClick(selectedItem);
                    }
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
          document={currentDocument}
          fetchSubitemsUrl={fetchSubitemsUrl}
          titleDisplayKeys={titleDisplayKeys}
          detailsDisplayKeys={detailsDisplayKeys}
          levelKey={levelKey}
          listLevel1Icon={listLevel1Icon}
          listLevel2Icon={listLevel2Icon}
          onItemClick={(selectedItem) => {
            setCurrentItem(selectedItem);
            if (props.onItemClick) {
              props.onItemClick(selectedItem);
            }
          }}
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
