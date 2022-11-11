import { downloadCompiler } from './download-compiler';

downloadCompiler()
  .then(() => console.log('Successfully downloaded vuicc.exe'))
  .catch((err) => console.log('An error occured while downloading vuicc.exe:', err));
