import { ButtonComponent } from '../../projects/ng-trust/src/lib/modules/button/public-api';
import { Meta, Story } from '@storybook/angular/types-6-0';

export default {
  title: 'Trust/Button',
  component: ButtonComponent,
} as Meta;

const template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const primary = template.bind({});
