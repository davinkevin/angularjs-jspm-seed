/**
  * angularjs-jspm-seed
  * Created by kdavin on 22/10/2015.
  */
import gulp from "gulp";
import fs from 'fs';
import cg from 'conventional-changelog';
import util from 'gulp-util';
import paths from '../paths';

const argv = util.env;
const from = argv.from, to = argv.to;

// Conventional Changelog Generating Task
// Can be use with '--from START_COMMIT --to END_COMMIT --version RELEASED_VERSION_NAME'
// ex : gulp conventional-changelog --from 70a938f811256262b8411d9f05d91f600eac4123
// it generate all the changelog from the commit id to today, it is useful to use the last commit id of the changelog.md
gulp.task('conventional-changelog', function(cal){
  function changeParsed(err, log){
    if (err) {
      return cal(err);
    }
    fs.writeFile(paths.changeLog, log);
  }
  fs.readFile(paths.packageJson, 'utf8', function(err, data){
    var ref$, repository, version;
    ref$ = JSON.parse(data), repository = ref$.repository, version = argv.vname || ref$.version;
    cg({
      repository: repository.url,
      version: version,
      from: from,
      to: to
    }, changeParsed);
  });
});