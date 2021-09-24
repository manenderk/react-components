import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Item.scss';
import ItemHelper from './ItemHelper';

const ItemComponent = ({item, fetchSubitemsUrl, ...props}) => {

  if (!item) {
    throw new Error('Item object is required');
  }

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [subItems, setSubItems] = useState([]);

  useEffect( () => {
    if (!isCollapsed && subItems.length === 0) {
      getSubitems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  const getSubitems = async () => {
    const data = await ItemHelper.getSubitems(fetchSubitemsUrl);
    setSubItems(data);
  }

  return (
    <li className="item-tile" key={item.id}>
      <div className="tile-title">  
        {
          fetchSubitemsUrl &&
          <span className="collapse-action" onClick={(e) => setIsCollapsed(!isCollapsed)}>
            {
              isCollapsed ? <i className="fas fa-chevron-right" /> : <i className="fas fa-chevron-down" />
            }
          </span>
        }       
        <span onClick={props.onClick}>
          {item.code} - {item.title}
        </span>   
        
      </div>
      {
        item.description &&
        <div className="item-description">
          {item.description}
        </div>
      }
      {
        subItems.length > 0 &&
        <ul className="subitems">
          {
            subItems.map(subItem => {
              return <ItemComponent item={subItem}></ItemComponent>
            })
          }
        </ul>  
      }
      
    </li>
  )
}

ItemComponent.propTypes = {
  item: PropTypes.object,
  fetchSubitemsUrl: PropTypes.string
}

ItemComponent.defaultProps = {
  fetchSubitemsUrl: ''
}

export default ItemComponent
