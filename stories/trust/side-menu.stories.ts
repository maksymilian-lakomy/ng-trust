import { SideMenuComponent } from '../../projects/ng-trust/src/lib/modules/side-menu/components/side-menu/side-menu.component';
import { Meta } from '@storybook/angular/types-6-0';
import { Story } from '@storybook/angular/dist/ts3.4/client';
import { moduleMetadata } from '@storybook/angular';
import { DeviceModule } from '../../projects/ng-trust/src/lib/modules/device/device.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

export default {
  title: 'Trust/Side Menu',
  component: SideMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [DeviceModule, BrowserModule, BrowserAnimationsModule],
    }),
  ],
} as Meta;

const Template: Story<SideMenuComponent> = (args: SideMenuComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
