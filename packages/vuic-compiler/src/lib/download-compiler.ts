import { createWriteStream } from 'fs';
import { unlink, mkdir } from 'fs/promises';
import { get } from 'https';

import { distDir, distFile } from './constants';

export async function downloadCompiler() {
  await mkdir(distDir, { recursive: true });

  const writeStream = createWriteStream(distFile);

  return new Promise<void>((resolve, reject) => {
    get('https://veniceunleashed.net/files/vuicc.exe', async (res) => {
      if (res.statusCode !== 200) {
          writeStream.close();
          await unlink(distFile);
          reject(new Error(`Server responded with ${res.statusCode}: ${res.statusMessage}`));
          return;
      }

      res.pipe(writeStream)
          .on('finish', () => {
              resolve();
          })
          .on('error', async (err) => {
              writeStream.close();
              await unlink(distFile);
              reject(err)
          });
    });
  });
}
