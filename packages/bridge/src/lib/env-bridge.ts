import { VextEmulatorBridge } from '@vextjs/emulator';
import { VextBridge } from './bridge';
import { isVextEnvironment } from './env';
import { WebUIVextBridge } from './webui-bridge';

/**
 * Will wait till document is done loading
 */
const isDocumentReady = (): Promise<void> => {
  if (document.readyState === 'complete') return Promise.resolve();

  return new Promise<void>((resolve) => {
    document.addEventListener('DOMContentLoaded', () => {
      resolve();
    });
  });
};

export class EnvVextBridge implements VextBridge {
  private delegate: VextBridge | undefined;

  constructor() {
    if (__DEV__)
    isDocumentReady().then(() => {
      if (isVextEnvironment()) {
        this.delegate = new WebUIVextBridge();
      } else {
        this.delegate = new VextEmulatorBridge();
      }
    });
  }

  Show(): boolean {
    return this.delegate?.Show() ?? false;
  }
  Hide(): boolean {
    return this.delegate?.Hide() ?? false;
  }
  BringToFront(): boolean {
    return this.delegate?.BringToFront() ?? false;
  }
  BringToBack(): boolean {
    return this.delegate?.BringToBack() ?? false;
  }
  EnableKeyboard(): boolean {
    return this.delegate?.EnableKeyboard() ?? false;
  }
  EnableMouse(): boolean {
    return this.delegate?.EnableMouse() ?? false;
  }
  DisableKeyboard(): boolean {
    return this.delegate?.DisableKeyboard() ?? false;
  }
  DisableMouse(): boolean {
    return this.delegate?.DisableMouse() ?? false;
  }
  ResetKeyboard(): boolean {
    return this.delegate?.ResetKeyboard() ?? false;
  }
  ResetMouse(): boolean {
    return this.delegate?.ResetMouse() ?? false;
  }
  DispatchEvent<T>(event: string, ...payload: T[]): boolean {
    return this.delegate?.DispatchEvent(event, ...payload) ?? false;
  }
  DispatchEventLocal<T>(event: string, ...payload: T[]): boolean {
    return this.delegate?.DispatchEventLocal(event, ...payload) ?? false;
  }
}
