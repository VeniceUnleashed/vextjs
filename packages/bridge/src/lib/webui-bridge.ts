import { VextBridge } from './bridge';

/**
 * WebUI implementation of {@link VextBridge} that communicates directly with Venice Unleashed
 *
 * This implementation is pretty much nothing more then a typesafe wrapper.
 * However the {@link DispatchEvent} and {@link DispatchEventLocal} make sure that the arguments
 * are stringified where needed (objects and arrays).
 *
 * @example
 * Say you have the following logic to kick a player:
 * ```lua
 * local function _OnKickPlayer(p_PlayerId, p_Reason)
 *    -- Logic to kick the player...
 * end
 *
 * Events:Subscribe('KickPlayer', _OnKickPlayer)
 * ```
 *
 * Then you could trigger this event with the following code:
 * ```
 * const bridge = new VextWebUIBridge();
 * bridge.DispatchEventLocal('KickPlayer', 5, 'Stop killing me');
 * ```
 */
export class WebUIVextBridge implements VextBridge {
  Show(): boolean {
    return WebUI.Call('Show');
  }

  Hide(): boolean {
    return WebUI.Call('Hide');
  }

  BringToFront(): boolean {
    return WebUI.Call('BringToFront');
  }

  BringToBack(): boolean {
    return WebUI.Call('BringToBack');
  }

  EnableKeyboard(): boolean {
    return WebUI.Call('EnableKeyboard');
  }

  EnableMouse(): boolean {
    return WebUI.Call('EnableMouse');
  }

  DisableKeyboard(): boolean {
    return WebUI.Call('DisableKeyboard');
  }

  DisableMouse(): boolean {
    return WebUI.Call('DisableMouse');
  }

  ResetKeyboard(): boolean {
    return WebUI.Call('ResetKeyboard');
  }

  ResetMouse(): boolean {
    return WebUI.Call('ResetMouse');
  }

  DispatchEvent<T>(event: string, ...args: T[]): boolean {
    return WebUI.Call('DispatchEvent', event, ...this.parseArgs(args));
  }

  DispatchEventLocal<T>(event: string, ...args: T[]): boolean {
    return WebUI.Call('DispatchEventLocal', event, ...this.parseArgs(args));
  }

  /**
   * Parses a list of arguments into a list of arguments that only contain primitives
   *
   * Arrays and objects are stringified using {@link JSON.stringify}
   *
   * @param args a list of arguments
   * @returns a list of primitive arguments
   */
  private parseArgs<T>(args: T[]) {
    return args.reduce((res, arg, index) => {
      if (typeof arg === 'object' || Array.isArray(arg)) {
        res[index] = JSON.stringify(arg) as T;
      }
      return res;
    }, args);
  }
}
