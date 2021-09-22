import React from 'react';
import tableData1 from '../../sample-data/table-data-1';
import tableHeaderData1 from '../../sample-data/table-header-1';
import DynamicTableComponent from './DynamicTableComponent';


export default {
  title: 'Table/Dynamic Table',
  component: DynamicTableComponent,
  args: {}
}

const Template = (args) => <DynamicTableComponent {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  headers: tableHeaderData1,
  data: tableData1
};