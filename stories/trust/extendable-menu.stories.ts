import { ExtendableMenuComponent } from '../../projects/ng-trust/src/lib/modules/extendable-menu/components/extendable-menu/extendable-menu.component';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

export default {
  title: 'Trust/Extendable Menu',
  component: ExtendableMenuComponent,
  decorators: [moduleMetadata({})],
} as Meta;

const template: Story<ExtendableMenuComponent> = (
  args: ExtendableMenuComponent
) => ({
  props: args,
});

export const primary = template.bind({});
