
import path from 'path';

/* All constant and location of the application */

const appName = 'app';
const srcDirName = 'public';
const releaseDirName = 'dist';
const root = path.dirname(__dirname);

export default {
  root : root,
  systemConfigJs : `${root}/system.config.js`,
  srcDir: `${root}/${srcDirName}`,
  releaseDir: `${root}/${releaseDirName}`,
  releaseDirName: releaseDirName,
  app: {
    entryPoint : `${srcDirName}/app`,
    name: appName
  }
}
