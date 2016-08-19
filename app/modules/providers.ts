import {provide} from '@angular/core';

export const GLOBAL_PROVIDERS: any[] = [
  provide(Window, {
    useValue: window
  })
];
