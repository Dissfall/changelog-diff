# chagngelog-diff

[![build status](https://img.shields.io/travis/com/dissfall/chagngelog-diff.svg)](https://travis-ci.com/dissfall/chagngelog-diff)
[![code coverage](https://img.shields.io/codecov/c/github/dissfall/chagngelog-diff.svg)](https://codecov.io/gh/dissfall/chagngelog-diff)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/dissfall/chagngelog-diff.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/chagngelog-diff.svg)](https://npm.im/chagngelog-diff)

> Generate changelog from difference of changelog files


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install chagngelog-diff
```

[yarn][]:

```sh
yarn add chagngelog-diff
```


## Usage

```js
const ChagngelogDiff = require('chagngelog-diff');

const chagngelogDiff = new ChagngelogDiff();

console.log(chagngelogDiff.renderName());
// script
```


## Contributors

| Name                |
| ------------------- |
| **George Lukyanov** |


## License

[MIT](LICENSE) © George Lukyanov


##

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
