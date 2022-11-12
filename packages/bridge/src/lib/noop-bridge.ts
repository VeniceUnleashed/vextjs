import { VextBridge } from './bridge';

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
  DispatchEvent(): boolean {
    return false;
  }
  DispatchEventLocal(): boolean {
    return false;
  }
}
