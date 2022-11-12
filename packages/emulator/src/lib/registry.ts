export interface VextEmulatorEventHandler {
  (...args: unknown[]): void;
}

export class VextEmulatorEventHandlerRegistry {
  private static handlers = new Map<string, VextEmulatorEventHandler[]>();
  private static localHandlers = new Map<string, VextEmulatorEventHandler[]>();

  /**
   * Registers a new event handler for the given event
   * @param event     The event name
   * @param handler   The event handler
   * @param thisArg   Optional reference to this
   */
  static registerEvent(
    event: string,
    handler: VextEmulatorEventHandler,
    thisArg?: any
  ) {
    const eventHandlers = this.handlers.get(event);

    if (!eventHandlers) {
      this.handlers.set(event, [handler.bind(thisArg)]);
    } else {
      eventHandlers.push(handler.bind(thisArg));
    }
  }

  /**
   * Registers a new local event handler for the given local event
   * @param event     The local event name
   * @param handler   The local event handler
   * @param thisArg   Optional reference to this
   */
  static registerLocalEvent(
    event: string,
    handler: VextEmulatorEventHandler,
    thisArg?: any
  ) {
    const eventHandlers = this.localHandlers.get(event);

    if (!eventHandlers) {
      this.localHandlers.set(event, [handler.bind(thisArg)]);
    } else {
      eventHandlers.push(handler.bind(thisArg));
    }
  }

  /** @internal */
  static getEventHandlers(
    event: string
  ): ReadonlyArray<VextEmulatorEventHandler> {
    return this.handlers.get(event) || [];
  }

  /** @internal */
  static getLocalEventHandlers(
    event: string
  ): ReadonlyArray<VextEmulatorEventHandler> {
    return this.localHandlers.get(event) || [];
  }
}
