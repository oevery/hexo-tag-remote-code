const https = require('https');
const path = require('path');

function getCode(url) {
  let data = '';
  https
    .get(url, (res) => {
      res.setEncoding('utf8');
      res.on('data', (d) => {
        data += d;
      });
      res.on('end', function () {
        return data;
      });
    })
    .on('error', (err) => {
      hexo.log.error(err);
    });
}

function getResult(data, lang, url, linkText, start, stop, codeTag) {
  let split_data = data
    .split(/\r\n|\r|\n/)
    .slice(start - 1, stop)
    .join('\n');
  let basename = path.basename(url);
  let arg = [basename, lang, url, linkText];
  return codeTag(arg, split_data);
}

async function getRawUrl(url) {
  if (url.search(/github\.com/) !== -1) {
    return url
      .replace(/github\.com/, 'raw.githubusercontent.com')
      .replace(/blob\//, '');
  }
}

async function remoteCode(args) {
  let codeTag = hexo.extend.tag.env.extensions.code.fn;
  let lang = args[0];
  let url = args[1];
  let linkText = args[3] || 'raw';
  let start, stop;
  let groups = url.match(/#(L(\d+))(-L(\d+))?/);
  if (groups && groups.length != -1) {
    if ((groups.length = 5)) {
      start = parseInt(groups[2], 10);
      stop = parseInt(groups[4], 10);
    } else if ((groups.length = 3)) {
      start = parseInt(groups[2], 10);
      stop = parseInt(groups[2], 10);
    } else {
      start = 1;
    }
  }

  let rawUrl = await getRawUrl(url);
  return new Promise(function (resolve, reject) {
    getCode(rawUrl, (data) => {
      resolve(getResult(data, lang, url, linkText, start, stop, codeTag));
    });
  });
}

hexo.extend.tag.register('remote_code', remoteCode, { async: true });
