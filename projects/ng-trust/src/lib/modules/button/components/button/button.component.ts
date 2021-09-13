import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ClassBinder } from '../../../../public-services';
import { ClickEffectDirective } from '../../../click-effect/directives/click-effect.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[trust-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  animations: [],
})
export class ButtonComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public fill: boolean = true;
  @Input() public color: string = 'var(--palette-9)';

  constructor(
    private classBinder: ClassBinder,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Host() @Optional() private clickEffect: ClickEffectDirective
  ) {}

  public ngOnInit(): void {
    this.classBinder.bind('button');
  }

  public ngOnChanges({ fill, color }: SimpleChanges): void {
    fill && this.classBinder.bindByBoolean('button--fill', fill.currentValue);
    color && this.bindMainColorCSSVariable(color.currentValue);
  }

  public ngOnDestroy(): void {}

  private bindMainColorCSSVariable(color: string): void {
    const element = this.elementRef.nativeElement;
    this.renderer.setStyle(element, '--main-color', color, 1);
    this.clickEffect.trustClickEffectColor = color;
  }
}
