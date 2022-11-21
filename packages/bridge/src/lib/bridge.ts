export interface VextBridge {
  /**
   * Shows the WebUI
   */
  Show(): boolean;

  /**
   * Hides the WebUI
   */
  Hide(): boolean;

  /**
   * Brings the WebUI to the front
   */
  BringToFront(): boolean;

  /**
   * Brings the WebUI to the back
   */
  BringToBack(): boolean;

  /**
   * Enables the keyboard on WebUI
   */
  EnableKeyboard(): boolean;

  /**
   * Enables the mouse on WebUI
   */
  EnableMouse(): boolean;

  /**
   * Disables the keyboard on WebUI
   */
  DisableKeyboard(): boolean;

  /**
   * Disables the mouse on WebUI
   */
  DisableMouse(): boolean;

  /**
   * Resets the keyboard state to default on WebUI
   */
  ResetKeyboard(): boolean;

  /**
   * Resets the mouse state to default on WebUI
   */
  ResetMouse(): boolean;

  /**
   * Dispatches an event
   * @param event Event to dispatch
   * @param payload Optional event payload
   */
  DispatchEvent<T>(event: string, ...payload: T[]): boolean;

  /**
   * Dispatches an local event
   * @param event Event to dispatch
   * @param payload Optional event payload
   */
  DispatchEventLocal<T>(event: string, ...payload: T[]): boolean;
}
