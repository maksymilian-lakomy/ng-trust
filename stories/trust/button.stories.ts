import { ButtonComponent } from '../../projects/ng-trust/src/lib/modules/button/public-api';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ClickEffectModule } from '../../projects/ng-trust/src/lib/modules/click-effect/click-effect.module';

export default {
  title: 'Trust/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ClickEffectModule],
    }),
  ],
  args: {
    test: 'Przejdź dalej',
  },
} as Meta;

const template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
  template: `
    <button trust-button [fill]="fill" [color]="color" trustClickEffect>{{test}}</button>
  `,
});

export const primary = template.bind({});
