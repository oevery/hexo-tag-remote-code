# hexo-tag-remote-code

Fork 自 [hexo-tag-github-code](https://github.com/itpropro/hexo-tag-ghcode).

当生成静态文件时从网页插入代码块。

## 安装

``` bash
npm install hexo-tag-remote-code
```

或者

``` bash
yarn add hexo-tag-remote-code
```

## 使用

``` bash
{% remote_code [lang:language] [url] [link text] %}
```

## 支持的链接

### GitHub

- <https://github.com/MoonBegonia/hexo-tag-remote-code/blob/master/index.js>
- <https://github.com/MoonBegonia/hexo-tag-remote-code/blob/master/index.js#L1-L10>

### GitHub Gists

- <https://gist.github.com/MoonBegonia/01a94921655acf525afb718db8ee4181>
- <https://gist.github.com/MoonBegonia/01a94921655acf525afb718db8ee4181#file-test-md>

### 其他的链接

一些例子:

- <https://cdn.jsdelivr.net/gh/MoonBegonia/hexo-tag-remote-code@latest/index.js>

## 注意事项

**国内用户在插入 GitHub 代码时可能因为网络问题造成错误，此时可以使用类似于 jsdelivr 的 GitHub 文件加速服务解决。**
