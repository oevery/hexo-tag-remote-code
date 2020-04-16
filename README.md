# hexo-tag-remote-code

![GitHub release (latest by date)](https://img.shields.io/github/v/release/moonbegonia/hexo-tag-remote-code)
![npm](https://img.shields.io/npm/v/hexo-tag-remote-code)
![npm](https://img.shields.io/npm/dt/hexo-tag-remote-code)

[中文介绍](./README_zh-CN.md)

Fork from [hexo-tag-github-code](https://github.com/itpropro/hexo-tag-ghcode).

Insert code from remote website when static files are generated.

## install

``` bash
npm install hexo-tag-remote-code
```

or

``` bash
yarn add hexo-tag-remote-code
```

## usage

``` bash
{% remote_code [lang:language] [url] [link text] %}
```

## support url

### GitHub

- <https://github.com/MoonBegonia/hexo-tag-remote-code/blob/master/index.js>
- <https://github.com/MoonBegonia/hexo-tag-remote-code/blob/master/index.js#L1-L10>

### GitHub Gists

- <https://gist.github.com/MoonBegonia/01a94921655acf525afb718db8ee4181>
- <https://gist.github.com/MoonBegonia/01a94921655acf525afb718db8ee4181#file-test-md>

### Other raw url

Some examples:

- <https://cdn.jsdelivr.net/gh/MoonBegonia/hexo-tag-remote-code@latest/index.js>
