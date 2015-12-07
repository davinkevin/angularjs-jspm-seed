
import path from 'path';

/* All constant and location of the application */

const appName = 'app';
const srcDirName = 'public';
const releaseDirName = 'dist';
const root = path.dirname(__dirname);
const fontsExtension = '{eot,woff2,woff,ttf,svg}';

export default {
  root : root,
  systemConfigJs : `${srcDirName}/config.js`,
  packageJson : `${root}/package.json`,
  changeLog : `${root}/CHANGELOG.md`,
  srcDir: `${root}/${srcDirName}`,
  releaseDir: `${root}/${releaseDirName}`,
  release : {
    root : `${root}/${releaseDirName}`,
    fonts : `${root}/${releaseDirName}/fonts`
  },
  releaseDirName: releaseDirName,
  jspm : {
    fonts : `${srcDirName}/jspm_packages/**/*.${fontsExtension}`
  },
  app: {
    entryPoint : `${appName}/${appName}`,
    name: appName
  },
  glob: {
    scss : `${root}/${srcDirName}/${appName}/**/*.scss`,
    js : `${root}/${srcDirName}/${appName}/**/!(*.spec).js`,
    fonts : `${root}/${srcDirName}/fonts/**/*.${fontsExtension}`,
    projectFonts : `${root}/${srcDirName}/**/*.${fontsExtension}`,
    html : `${root}/${srcDirName}/${appName}/**/*.html`
  }
}
