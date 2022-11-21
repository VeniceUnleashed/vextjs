# @vextjs/bridge [![npm](https://img.shields.io/npm/v/@vextjs/bridge.svg)](https://npmjs.com/package/@vextjs/bridge)

A typesafe extendable interface to [communicate with VEXT](https://docs.veniceunleashed.net/modding/custom-ui/#communicating-with-veniceext) and [manage input and display order](https://docs.veniceunleashed.net/modding/custom-ui/#communicating-with-veniceext)

## Installation

With npm

```
npm i -D @vextjs/bridge
```

With yarn

```
yarn -D @vextjs/bridge
```

## Usage

Usage of this package is fairly simple, most documentation can be found in the TSDocs. Below is an example on how to use Bridge to switch between implementations, depending whether you are running in a VEXT environment (in-game or in-browser)

```ts
import {
  isVextEnvironment,
  VextBridge,
  VextNoopBridge,
  VextWebUIBridge,
} from '@vextjs/bridge';

let vext: VextBridge;
if (isVextEnvironment()) {
  vext = new VextWebUIBridge();
} else {
  vext = new VextNoopBridge();
}

vext.DispatchEventLocal('KickPlayer', 5, 'Stop killing me');
```

We also have an emulator as extension on that you can check out [here](../emulator). This replaces the no operation implementation with one that allows you to register local and global event listeners, just like you would in VEXT itself.

## Development

### Building

Run `nx build bridge` to build the library.

### Running unit tests

Run `nx test bridge` to execute the unit tests via [Jest](https://jestjs.io).
