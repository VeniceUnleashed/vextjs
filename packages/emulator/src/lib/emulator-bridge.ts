import { VextBridge } from '@vextjs/bridge';
import { VextEmulatorEventHandlerRegistry } from './registry';

export class VextEmulatorBridge implements VextBridge {
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

  DispatchEvent(event: string, ...args: unknown[]): boolean {
    VextEmulatorEventHandlerRegistry.getEventHandlers(event).forEach(
      (handler) => {
        requestAnimationFrame(() => handler(...args));
      }
    );
    return true;
  }

  DispatchEventLocal(event: string, ...args: unknown[]): boolean {
    VextEmulatorEventHandlerRegistry.getLocalEventHandlers(event).forEach(
      (handler) => {
        requestAnimationFrame(() => handler(...args));
      }
    );
    return true;
  }
}
