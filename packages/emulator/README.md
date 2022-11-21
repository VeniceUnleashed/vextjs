# @vextjs/emulator [![npm](https://img.shields.io/npm/v/@vextjs/emulator.svg)](https://npmjs.com/package/@vextjs/emulator)

An extension for the [VextBridge](../bridge) that adds an emulator implementation. This emulator allows you to register local and global event listeners just like you can in VEXT itself. This allows you to directly test your WebUI in your own browser, without needing to start the game.

## Installation

With npm

```
npm i -D @vextjs/emulator
```

With yarn

```
yarn -D @vextjs/emulator
```

## Usage

This package allows you to register your own event handlers inside the browser itself.

```ts
import { isVextEnvironment, VextBridge, VextWebUIBridge } from '@vextjs/bridge';
import { VextEmulatorBridge, VextEmulatorRegistry } from '@vextjs/emulator';

let vext: VextBridge;
if (!isVextEnvironment()) {
  VextEmulatorRegistry.registerLocalEvent('KickPlayer', (playerId, reason) => {
    console.log(
      `Welp I guess we'll have to kick ${playerId} because: ${reason}`
    );
  });

  vext = new VextEmulatorBridge();
} else {
  vext = new VextWebUIBridge();
}

vext.DispatchEventLocal('KickPlayer', 5, 'Stop killing me');
```

## Development

### Building

Run `nx build emulator` to build the library.

### Running unit tests

Run `nx test emulator` to execute the unit tests via [Jest](https://jestjs.io).
