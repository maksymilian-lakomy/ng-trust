import { Injectable } from '@angular/core';

interface Test {
  xd: number;
  test: string;
}

@Injectable()
export class NgTrustService {
  private _testt = true;

  constructor() {}

  public test(): void {
    const test = () => console.log('xd');
  }

  private xd(): void {}

  public test2(): void {}
}
