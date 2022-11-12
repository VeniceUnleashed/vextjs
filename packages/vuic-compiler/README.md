# @vextjs/vuic-compiler [![npm](https://img.shields.io/npm/v/@vextjs/vuic-compiler.svg)](https://npmjs.com/package/@vextjs/vuic-compiler)

A simple Node.js wrapper for the [Venice Unleashed WebUI compiler](https://docs.veniceunleashed.net/modding/custom-ui/#compiling-a-webui-package). It also has build-in support for making a [proxy ui](#compile-a-proxy-ui)

## Installation

With npm

```
npm i -D @vextjs/webpack-plugin
```

With yarn

```
yarn -D @vextjs/webpack-plugin
```

## Compile your UI

This package will automatically download the latest version of the WebUI compiler during installation.

Using the compiler is fairly simple. Provider the source path that contains your compiled WebUI HTML, JavaScript and CSS files. And provide the output path where the compiler should put `the ui.vuic` file

```ts
import { VuicCompiler } from '@vextjs/vuic-compiler';

const vuicc = new VuicCompiler();
const sourcePath = '/path/to/my/ui/dist';
const outputPath = '/path/to/my/mod';

vuicc
  .compile(sourcePath, outputPath)
  .then(() => console.log(`Successfully compiled ui`))
  .catch((err) => console.error(`Failed to compile ui: ${err}`));
```

## Compile a proxy UI

A proxy UI can be useful during UI development. The proxy UI redirects Venice Unleashed to your local development server hosted by Webpack, Vite or something else.

We added extra information to the proxy UI to display an error if your development server is not online.

```html
<!-- index.html -->
<script>
  (async () => {
    try {
      console.info('[Bootstrap] Loading development WebUI...');
      await fetch('http://localhost:<proxyPort>', {
        mode: 'no-cors',
        method: 'HEAD',
      });
      console.info('[Bootstrap] Development WebUI is online!');
      window.location.href = 'http://localhost:<proxyPort>';
    } catch (err) {
      console.error('[Bootstrap] Development WebUI is not online!', err);
      const div = document.createElement('h1');
      div.style.margin = 0;
      div.style.display = 'flex';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.height = '100%';
      div.innerHTML = 'Failed to load development WebUI, reason: UI_OFFLINE';
      document.body.appendChild(div);
    }
  })();
</script>
```

### Usage

```ts
import { VuicCompiler } from '@vextjs/vuic-compiler';

const vuicc = new VuicCompiler();
const devServerPort = 8080;
const outputPath = '/path/to/my/mod';

vuicc
  .compileProxy(devServerPort, outputPath)
  .then(() =>
    console.log(`Successfully compiled proxy ui to port ${devServerPort}`)
  )
  .catch((err) => console.error(`Failed to compile proxy ui: ${err}`));
```

## Development

### Building

Run `nx build vuic-compiler` to build the library.

### Running unit tests

Run `nx test vuic-compiler` to execute the unit tests via [Jest](https://jestjs.io).
