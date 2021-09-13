import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ClassBinder } from '../../../../public-services';
import { fromEvent } from 'rxjs';

import anime from 'animejs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[trust-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  animations: [],
})
export class ButtonComponent implements OnInit {
  constructor(
    private classBinder: ClassBinder,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.classBinder.bind('button');
    this.classBinder.bind('button--fill');

    fromEvent(this.elementRef.nativeElement, 'click').subscribe(() => {
      const element = this.renderer.createElement('div');
      this.renderer.addClass(element, 'click-effect');

      this.renderer.appendChild(this.elementRef.nativeElement, element);

      anime({
        targets: element,
        scale: ['1', '5'],
        opacity: [0.25, 0],
        easing: 'easeOutQuad',
        duration: 500,
      });
    });
  }
}
