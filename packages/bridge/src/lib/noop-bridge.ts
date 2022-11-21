/* eslint-disable @typescript-eslint/no-unused-vars */

import { VextBridge } from './bridge';

/**
 * A no operation version of {@link VextBridge} to disable communication with VEXT
 *
 * This implementation can be used for in-browser development,
 * as it will not attempt to use WebUI.Call and thus not cause any errors
 */
export class VextNoopBridge implements VextBridge {
  Show(): boolean {
    return false;
  }
  Hide(): boolean {
    return false;
  }
  BringToFront(): boolean {
    return false;
  }
  BringToBack(): boolean {
    return false;
  }
  EnableKeyboard(): boolean {
    return false;
  }
  EnableMouse(): boolean {
    return false;
  }
  DisableKeyboard(): boolean {
    return false;
  }
  DisableMouse(): boolean {
    return false;
  }
  ResetKeyboard(): boolean {
    return false;
  }
  ResetMouse(): boolean {
    return false;
  }
  DispatchEvent<T>(_event: string, ..._args: T[]): boolean {
    return false;
  }
  DispatchEventLocal<T>(_event: string, ..._args: T[]): boolean {
    return false;
  }
}
