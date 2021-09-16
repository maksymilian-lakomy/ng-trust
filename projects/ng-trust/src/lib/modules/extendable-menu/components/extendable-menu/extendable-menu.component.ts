import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import anime, { AnimeAnimParams, AnimeTimelineInstance } from 'animejs';

type ExtensionState = 'MINIMIZED' | 'PREVIEW' | 'FULL';

interface ExtendableElements {
  parentElement: HTMLElement;
  wrapperElement: HTMLElement;
  headerElement: HTMLElement;
  contentElement: HTMLElement;
  trueContentElement: HTMLElement;
  labelElement: HTMLElement;
}

interface PreviewConfiguration {
  height: string;
}

@Component({
  selector: 'trust-extendable-menu',
  templateUrl: './extendable-menu.component.html',
  styleUrls: ['./extendable-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendableMenuComponent implements AfterViewInit, OnChanges {
  @ViewChild('wrapperEl') public wrapperEl!: ElementRef<HTMLElement>;
  @ViewChild('headerEl') public headerEl!: ElementRef<HTMLElement>;
  @ViewChild('contentEl') public contentEl!: ElementRef<HTMLElement>;
  @ViewChild('trueContentEl') public trueContentEl!: ElementRef<HTMLElement>;
  @ViewChild('labelEl') public labelEl!: ElementRef<HTMLElement>;

  public get elements(): ExtendableElements {
    const parentElement = this.wrapperEl.nativeElement.parentElement;

    if (!parentElement) {
      throw new Error('There is no parent element!');
    }

    return {
      parentElement,
      wrapperElement: this.wrapperEl.nativeElement,
      headerElement: this.headerEl.nativeElement,
      contentElement: this.contentEl.nativeElement,
      trueContentElement: this.trueContentEl.nativeElement,
      labelElement: this.labelEl.nativeElement,
    };
  }

  @Input() public duration: number = 250;

  @Input() public state: ExtensionState = 'PREVIEW';

  @Input() public preview: PreviewConfiguration = {
    height: '120px',
  };

  constructor() {}

  public ngAfterViewInit(): void {
    this.fullToPreview(true);
  }

  public ngOnChanges({ state }: SimpleChanges): void {
    console.log(state);

    if (state.firstChange) {
      return;
    }

    if (state?.currentValue === 'FULL') {
      this.previewToFull(false);
    } else if (
      state?.previousValue === 'FULL' &&
      state?.currentValue === 'PREVIEW'
    ) {
      this.fullToPreview(false);
    } else if (
      state?.previousValue === 'MINIMIZED' &&
      state?.currentValue === 'PREVIEW'
    ) {
      this.minimizedToPreview(false);
    } else if (state?.currentValue === 'MINIMIZED') {
      this.previewToMinimized(false);
    }
  }

  private minimizedToPreview(immediately: boolean = false): void {
    const {
      wrapperElement,
      headerElement,
      contentElement,
      trueContentElement,
      labelElement,
    } = this.elements;

    headerElement.style.display = 'none';
    wrapperElement.style.position = 'relative';
    contentElement.style.top = '0px';
    wrapperElement.style.top = '0px';

    const timeline = anime.timeline({
      duration: immediately ? 0 : this.duration,
      easing: 'easeOutQuad',
      complete: () => {
        labelElement.style.display = 'none';
      },
    });

    this.addToTimeline(timeline, {
      targets: contentElement,
      height: ['30px', this.preview.height],
    });

    this.addToTimeline(timeline, {
      targets: trueContentElement,
      height: ['0px', this.preview.height],
    });
  }

  private previewToMinimized(immediately: boolean = false): void {
    const {
      wrapperElement,
      headerElement,
      contentElement,
      trueContentElement,
      labelElement,
    } = this.elements;

    labelElement.style.display = 'block';
    headerElement.style.display = 'none';
    wrapperElement.style.position = 'relative';
    contentElement.style.top = '0px';
    wrapperElement.style.top = '0px';

    const timeline = anime.timeline({
      duration: immediately ? 0 : this.duration,
      easing: 'easeOutQuad',
    });

    this.addToTimeline(timeline, {
      targets: contentElement,
      height: [this.preview.height, '30px'],
    });

    this.addToTimeline(timeline, {
      targets: trueContentElement,
      height: [this.preview.height, '0px'],
    });
  }

  private previewToFull(immediately: boolean = false): void {
    const {
      parentElement,
      wrapperElement,
      headerElement,
      contentElement,
      trueContentElement,
      labelElement,
    } = this.elements;

    trueContentElement.style.height = '100%';

    headerElement.style.display = 'none';
    labelElement.style.display = 'none';
    wrapperElement.style.position = 'relative';

    const parentDOMRect = parentElement.getBoundingClientRect();
    const contentDOMRect = contentElement.getBoundingClientRect();

    headerElement.style.display = 'block';
    const headerDOMRect = headerElement.getBoundingClientRect();

    wrapperElement.style.position = 'absolute';
    wrapperElement.style.top = '0px';

    const contentTopOffset =
      contentDOMRect.top - headerDOMRect.height - parentDOMRect.top + 'px';

    const timeline = anime.timeline({
      duration: immediately ? 0 : this.duration,
      easing: 'easeOutQuad',
    });

    this.addToTimeline(timeline, {
      targets: wrapperElement,
    });

    this.addToTimeline(timeline, {
      targets: headerElement,
      translateY: ['-100%', '0%'],
    });

    this.addToTimeline(timeline, {
      targets: contentElement,
      top: [contentTopOffset, `0px`],
      height: [this.preview.height, '600px'],
      complete: () => {
        contentElement.style.height = '100%';
      },
    });
  }

  private fullToPreview(immediately: boolean = false): void {
    const { parentElement, wrapperElement, headerElement, contentElement } =
      this.elements;

    headerElement.style.display = 'none';
    wrapperElement.style.position = 'relative';

    const parentDOMRect = parentElement.getBoundingClientRect();
    const contentDOMRect = contentElement.getBoundingClientRect();

    headerElement.style.display = 'block';
    const headerDOMRect = headerElement.getBoundingClientRect();

    wrapperElement.style.position = 'absolute';
    wrapperElement.style.top = '0px';

    const contentTopOffset =
      contentDOMRect.top - headerDOMRect.height - parentDOMRect.top + 'px';

    console.log(contentTopOffset);

    const timeline = anime.timeline({
      duration: immediately ? 0 : this.duration,
      easing: 'easeOutQuad',
    });

    this.addToTimeline(timeline, {
      targets: wrapperElement,
      complete: () => {
        wrapperElement.style.position = 'relative';
      },
    });

    this.addToTimeline(timeline, {
      targets: headerElement,
      translateY: ['0%', '-100%'],
      complete: () => {
        headerElement.style.display = 'none';
      },
    });

    this.addToTimeline(timeline, {
      targets: contentElement,
      top: ['0px', contentTopOffset],
      height: ['600px', this.preview.height],
      complete: () => {
        contentElement.style.top = '0px';
      },
    });
  }

  private addToTimeline(
    timeline: AnimeTimelineInstance,
    params: AnimeAnimParams
  ): void {
    timeline.add(params, 0);
  }
}
