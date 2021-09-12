import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';

@Injectable()
export class InteractionService {
  public observeFocusIn(element: HTMLElement): Observable<boolean> {
    return merge(
      fromEvent(element, 'focusin').pipe(mapTo(true)),
      fromEvent(element, 'focusout').pipe(
        map((event) => {
          const focusEvent = event as FocusEvent;
          const relatedTarget = focusEvent.relatedTarget as HTMLElement | null;

          return element.contains(relatedTarget);
        })
      )
    ).pipe(startWith(false));
  }

  public observeMouseOver(element: HTMLElement): Observable<boolean> {
    return merge(
      fromEvent(element, 'mouseenter').pipe(mapTo(true)),
      fromEvent(element, 'mouseleave').pipe(mapTo(false))
    ).pipe(startWith(false));
  }
}
