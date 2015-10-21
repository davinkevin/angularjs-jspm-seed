
import path from 'path';

/* All constant and location of the application */

const root = path.dirname(__dirname);

export default {
  root : root,
  systemConfigJs : `${root}/system.config.js`,
  app : {
    entryPoint : 'public/app'
  }
}
