import type { Compiler, WebpackPluginInstance } from 'webpack';

import { VuicCompiler } from '@vextjs/vuic-compiler';

export interface VextPackConfig {
  // Output path, defaults to the Webpack output path (required)
  outputPath: string;

  // Make a hot reloadable ui build, this creates a proxy ui that remotely loads the real ui
  hotReloadSupport: boolean;
}

export class VextPackPlugin implements WebpackPluginInstance {
  private _vuicc: VuicCompiler;
  private _options: VextPackConfig;

  constructor(options?: Partial<VextPackConfig>) {
    this._options = {
      outputPath: '../',
      hotReloadSupport: false,
      ...options,
    };

    this._vuicc = new VuicCompiler();
  }

  apply(compiler: Compiler) {
    if (process.platform !== 'win32') {
      console.error(
        'vuicc.exe currently only supports Windows, compiler disabled.'
      );
      return;
    }

    if (this._options.hotReloadSupport) {
      console.log('VextPack: Enabling Hot Reload Support');
      compiler.hooks.beforeRun
      compiler.hooks.afterPlugins.tap(VextPackPlugin.name, () => {
        // TODO: Get dev server port
        return this._vuicc.compileProxy(8080, this._options.outputPath);
      });
    } else {
      compiler.hooks.afterEmit.tapPromise(
        VextPackPlugin.name,
        (compilation) => {
          // Ignore child compilers
          if (compilation.compiler.isChild()) {
            return Promise.resolve();
          }

          // Ignore failed compilations
          if (compilation.errors.length > 0) {
            return Promise.resolve();
          }

          if (!compilation.outputOptions.path) {
            throw new Error('Failed to resolve output directory');
          }

          return this._vuicc.compile({
            sourcePath: compilation.outputOptions.path,
            outputPath: this._options.outputPath,
          });
        }
      );
    }
  }
}
