import React from 'react';
import ItemsLevel1 from '../../sample-data/items-level-1';
import ItemsExplorerComponent from '../ItemsExplorer/ItemsExplorerComponent';


export default {
  title: 'Miscelleneous/Items Explorer',
  component: ItemsExplorerComponent,
  args: {}
}

const Template = (args) => <ItemsExplorerComponent {...args} />;

export const DemoState = Template.bind({});
DemoState.args = {
  items: ItemsLevel1,
  titleDisplayKeys: ['code', 'title'],
  detailsDisplayKeys: ['description'],
  fetchSubitemsUrl: `http://rails.docswiz.com:3333/projects/1/items/{id}/children.json`
};