import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import anime from 'animejs';
import { WarningsUtils } from '../../../utils';

@Directive({
  selector: '[trustClickEffect]',
})
export class ClickEffectDirective implements OnInit, OnDestroy {
  @Input() public trustClickEffectColor?: string;

  private readonly _element: HTMLElement;

  private readonly _completeSubject = new Subject<void>();

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this._element = elementRef.nativeElement;
  }

  public ngOnInit(): void {
    fromEvent(this._element, 'click')
      .pipe(takeUntil(this._completeSubject))
      .subscribe(() => {
        const backgroundColor =
          this.trustClickEffectColor ||
          getComputedStyle(this._element).backgroundColor;

        if (!backgroundColor) {
          WarningsUtils.ClickEffectDirective.ColorWasNotProvided();
          return;
        }

        const elementRect = this._element.getBoundingClientRect();
        const size = Math.max(elementRect.height, elementRect.width);

        const element = this.renderer.createElement('div');

        const halfSize = `${size / 2}px`;

        this.renderer.setStyle(element, 'width', halfSize);
        this.renderer.setStyle(element, 'height', halfSize);

        this.renderer.setStyle(element, 'left', `calc(50% - ${size / 4}px)`);
        this.renderer.setStyle(element, 'top', `calc(50% - ${size / 4}px)`);

        this.renderer.setStyle(element, 'position', 'absolute');
        this.renderer.setStyle(element, 'border-radius', '50%');
        this.renderer.setStyle(element, 'pointer-events', 'none');

        this.renderer.setStyle(element, 'background-color', backgroundColor);

        this.renderer.appendChild(this._element, element);

        anime({
          targets: element,
          scale: ['1', '5'],
          opacity: [0.25, 0],
          easing: 'easeOutQuad',
          duration: 500,
          complete: () => {
            this.renderer.removeChild(this._element, element);
          },
        });
      });
  }

  public ngOnDestroy(): void {
    this._completeSubject.next();
    this._completeSubject.complete();
  }
}
