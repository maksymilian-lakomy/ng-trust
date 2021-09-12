import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ClassBinder, InteractionService } from '../../../../public-services';
import { TouchRecognizer } from '../../../device/services/touch-recognizer.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'lib-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder, InteractionService],
  animations: [
    trigger('menu', [
      state(
        'true',
        style({
          width: '200px',
          paddingRight: '0px',
        })
      ),
      state(
        'false',
        style({
          width: '56px',
        })
      ),
      transition('false => true', [
        group([
          query(
            ':self',
            animate('200ms', style({ width: '200px', paddingRight: '0px' }))
          ),
          query('@*', animateChild()),
        ]),
      ]),
      transition('true => false', [
        group([
          query(
            ':self',
            animate('200ms', style({ width: '56px', paddingRight: '16px' }))
          ),
          query('@*', animateChild()),
        ]),
      ]),
    ]),
    trigger('menuItem', [
      state(
        'true',
        style({
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        })
      ),
      state(
        'false',
        style({
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
        })
      ),
      transition('* => *', animate('200ms')),
    ]),
    trigger('menuItemLabel', [
      state(
        'true',
        style({
          width: '100%',
          opacity: 1,
        })
      ),
      state(
        'false',
        style({
          width: '0%',
          opacity: 0,
        })
      ),
      transition('* => *', animate('200ms')),
    ]),
  ],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuEl', { static: true })
  public menuElementRef!: ElementRef<HTMLElement>;

  public touchScreen$ = this.touchRecognizer.touchScreen$;

  public showFullMenu = false;

  private _completeSubject = new Subject<void>();

  constructor(
    private classBinder: ClassBinder,
    private interaction: InteractionService,
    private touchRecognizer: TouchRecognizer,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {}

  public ngOnInit(): void {
    this.classBinder.bind('side-menu');

    this.touchScreen$.subscribe(() => {});

    this.renderer2.setAttribute(
      this.elementRef.nativeElement,
      'role',
      'side-menu'
    );

    this.observeFullMenuDisplay()
      .pipe(takeUntil(this._completeSubject), distinctUntilChanged())
      .subscribe((value) => {
        this.showFullMenu = value;
        this.changeDetector.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._completeSubject.next();
    this._completeSubject.complete();
  }

  private observeFullMenuDisplay(): Observable<boolean> {
    return combineLatest([
      this.interaction.observeMouseOver(this.menuElementRef.nativeElement),
      this.interaction.observeFocusIn(this.menuElementRef.nativeElement),
    ]).pipe(map(([focusIn, mouseOver]) => focusIn || mouseOver));
  }
}
