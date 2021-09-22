import React from 'react';
import PasswordFieldComponent from './PasswordFieldComponent';


export default {
  title: 'Form/Password Field',
  component: PasswordFieldComponent,
  args: {}
}

const Template = (args) => <PasswordFieldComponent {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {};