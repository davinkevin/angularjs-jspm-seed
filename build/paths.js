
import path from 'path';

/* All constant and location of the application */

const appName = 'app';
const root = path.dirname(__dirname);

export default {
  root : root,
  appName: appName,
  systemConfigJs : `${root}/system.config.js`,
  releaseDir: `${root}/dist`,
  app : {
    entryPoint : 'public/app',
    name: appName
  }
}
