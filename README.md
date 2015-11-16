# Angular JSPM Seed

[![Build Status](https://travis-ci.org/davinkevin/angularjs-jspm-seed.svg)](https://travis-ci.org/davinkevin/angularjs-jspm-seed)

Seed project using AngularJS 1.x, Babel and SystemJS, with preconfigured text and css plugins.
Preconfigured unit tests with Karma / Jasmine and coverage report. Include SASS support, AngularJS annotations,
and bundling using JSPM.

# Get started

1. `git clone https://github.com/davinkevin/angularjs-jspm-seed.git`
2. `npm start`

# Scripts

- `npm run build` generates prod ready source files in ./dist
- `npm run release --type "major|minor|patch"` bumps version in package.json, updates CHANGELOG.md, git tag and push
- `npm run sass` transpiles sass source files to css
- `npm run serve` starts browser-sync and serves dev files
- `npm run serve-prod` serves files in ./dist folder
- `npm run test-tdd` starts karma and watch for changes to play tests
- `npm run test` installs dependencies and executes unit tests

# Resources

- https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md

# License

http://www.apache.org/licenses/LICENSE-2.0
