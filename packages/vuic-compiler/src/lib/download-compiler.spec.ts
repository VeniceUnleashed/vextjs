import { unlink, access } from 'fs/promises';
import { downloadCompiler } from './download-compiler';
import { distFile } from './constants';

describe('downloadCompiler', () => {
  it('should download vuicc.exe', async () => {
    // Prepare
    try {
      await unlink(distFile);
    } catch {
      // Ignore
    }

    // When
    await downloadCompiler();

    // Then
    await expect(access(distFile)).resolves.toBeUndefined();
  })
})
