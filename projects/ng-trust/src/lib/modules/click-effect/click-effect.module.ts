import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickEffectDirective } from './directives/click-effect.directive';

@NgModule({
  declarations: [ClickEffectDirective],
  imports: [CommonModule],
  exports: [ClickEffectDirective],
})
export class ClickEffectModule {}
