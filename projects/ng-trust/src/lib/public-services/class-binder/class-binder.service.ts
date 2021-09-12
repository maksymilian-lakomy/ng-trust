import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { WarningsUtils } from '../../utils';

@Injectable()
export class ClassBinder {
  private readonly _element: HTMLElement;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this._element = elementRef.nativeElement;
  }

  public bind(className: string): void {
    if (this.hasClass(className)) {
      WarningsUtils.ClassBinder.ClassIsAlreadyBound(className, this._element);
      return;
    }

    this.renderer.addClass(this._element, className);
  }

  public unbind(className: string): void {
    if (!this.hasClass(className)) {
      WarningsUtils.ClassBinder.ClassIsNotBound(className, this._element);
      return;
    }

    this.renderer.removeClass(this._element, className);
  }

  private hasClass(className: string): boolean {
    return this._element.classList.contains(className);
  }
}
