import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DeviceModule } from '../device.module';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: DeviceModule,
})
export class TouchRecognizer {
  public get touchScreen$(): Observable<boolean> {
    return this._touchScreen$;
  }

  private readonly _touchScreen$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const window = document.defaultView;

    if (!window) {
      this._touchScreen$ = new BehaviorSubject(false);
      return;
    }

    this._touchScreen$ = fromEvent(window || null, 'resize').pipe(
      startWith(this.hasTouchScreen(window)),
      map(() => this.hasTouchScreen(window))
    );
  }

  private hasTouchScreen(window: Window): boolean {
    const navigator = window?.navigator;

    if (!navigator) {
      return false;
    }

    return navigator.maxTouchPoints > 0;
  }
}
