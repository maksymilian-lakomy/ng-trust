import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ClassBinder } from '../../../../public-services';

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
  }
}
