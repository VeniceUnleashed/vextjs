import { PluginOption } from 'vite';

import { VuicCompiler } from '@vextjs/vuic-compiler';

export interface VextPluginConfig {
  // Output path, defaults to the parent folder (../)
  outputPath?: string;
}

export default function vext(options?: VextPluginConfig): PluginOption {
  const outputPath = options?.outputPath || '../';
  const vuicc = new VuicCompiler();

  return {
    name: 'vite-plugin-vext',
    async configureServer(server) {
      if (process.platform !== 'win32') {
        console.warn(
          'vuicc.exe currently only supports Windows, compiler disabled.'
        );
        return;
      }

      server.httpServer?.once('listening', async () => {
        if (!server.config.server.port) {
          throw new Error('Failed to resolve dev server port');
        }

        await vuicc.compileProxy(server.config.server.port, outputPath);
      });
    },
    writeBundle(options) {
      if (process.platform !== 'win32') {
        this.warn(
          'vuicc.exe currently only supports Windows, compiler disabled.'
        );
        return;
      }

      if (!options.dir) {
        this.error('Failed to resolve output directory');
        return;
      }

      return vuicc.compile({
        sourcePath: options.dir,
        outputPath,
      });
    },
  };
}
