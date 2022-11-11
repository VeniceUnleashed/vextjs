import { spawn } from 'child_process';
import { accessSync, constants } from 'fs';
import { join } from 'path';

import { distFile } from './constants';
import { generateProxyFiles } from './proxy';

export interface CompilerOptions {
  sourcePath: string;
  outputPath: string;
}

export class VuicCompiler {
  constructor() {
    try {
      accessSync(distFile, constants.R_OK | constants.X_OK);
    } catch (err) {
      throw new Error(
        `Failed in initiate VuicCompiler, does vuicc.exe exist?: ${err}`
      );
    }
  }

  /**
   * Compiles the source path into a ui.vuic file at the output path
   * @param options compiler options
   */
  compile(options: CompilerOptions): Promise<void> {
    const child = spawn(
      distFile,
      [options.sourcePath, join(options.outputPath, 'ui.vuic')],
      {
        stdio: 'inherit',
        cwd: process.cwd(),
      }
    );

    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code !== 0) {
          reject(`vuicc exited with unexpected exit code: ${code}`);
        }
        resolve();
      });
    });
  }

  async compileProxy(proxyPort: number, outputPath: string) {
    const proxyPath = await generateProxyFiles(proxyPort);

    return this.compile({
      sourcePath: proxyPath,
      outputPath,
    });
  }
}
