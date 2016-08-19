import {Injectable, Provider} from '@angular/core'
import {OpaqueToken} from '@angular/core';
import {unimplemented} from '@angular/core/src/facade/exceptions';

function _window(): any {
  return window;
}

export const Window: OpaqueToken = new OpaqueToken('WindowToken');

export abstract class WindowRef {
  get nativeWindow(): any {
    return unimplemented();
  }
}

export class WindowRef_ extends WindowRef {
  constructor() {
    super();
  }

  get nativeWindow(): any {
    return _window();
  }
}

export const WINDOW_PROVIDERS = [
  new Provider(WindowRef, {useClass: WindowRef_}),
  new Provider(Window, {useFactory: _window, deps: []}),
];
