import type { Compiler, WebpackPluginInstance } from 'webpack';

import { VuicCompiler } from '@vextjs/vuic-compiler';

export interface VextPackPluginOptions {
  // Specify the location where the ui.vuic should be placed, defaults to '../'
  outputPath?: string;

  // Make a hot reloadable ui build, this creates a proxy ui that remotely loads the real ui
  hotReloadSupport?: boolean;
}

export class VextPackPlugin implements WebpackPluginInstance {
  private _vuicc: VuicCompiler;
  private _outputPath: string;
  private _hotReloadSupport: boolean;

  constructor(options?: VextPackPluginOptions) {
    this._outputPath = options?.outputPath ?? '../';
    this._hotReloadSupport = options?.hotReloadSupport ?? false;
    this._vuicc = new VuicCompiler();
  }

  apply(compiler: Compiler) {
    if (process.platform !== 'win32') {
      console.error(
        'vuicc.exe currently only supports Windows, compiler disabled.'
      );
      return;
    }

    if (this._hotReloadSupport) {
      console.log('VextPack: Enabling Hot Reload Support');
      compiler.hooks.beforeRun;
      compiler.hooks.afterPlugins.tap(VextPackPlugin.name, () => {
        // TODO: Get dev server port
        return this._vuicc.compileProxy(8080, this._outputPath);
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

          return this._vuicc.compile(
            compilation.outputOptions.path,
            this._outputPath
          );
        }
      );
    }
  }
}
