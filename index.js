const got = require('got');
const path = require('path');

async function getCode(url) {
  try {
    const res = await got(url);
    return res.body;
  } catch (err) {
    hexo.log.warn(err);
  }
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
  if (url.search(/\/github\.com/) !== -1) {
    return url
      .replace(/github\.com/, 'raw.githubusercontent.com')
      .replace(/blob\//, '');
  } else if (url.search(/\/gist\.github\.com/) !== -1) {
    if (url.search(/#file-/) !== -1) {
      const apiUrl = url
        .replace(/gist\.github\.com.*\//, 'api.github.com/gists/')
        .replace(/#file-.*/, '');
      const files = JSON.parse(await getCode(apiUrl)).files;
      hexo.log.info(files);
      const lowCaseFileName = url.match(/#file-([\w-]+)/)[1].replace(/-/, '.');
      for (let item in files) {
        if (lowCaseFileName === item.toLowerCase()) {
          return files[item].raw_url;
        }
      }
    } else {
      return (
        url.replace(/gist\.github\.com\//, 'gist.githubusercontent.com/') +
        '/raw/'
      );
    }
  } else {
    return url;
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

  const rawUrl = await getRawUrl(url);
  const data = await getCode(rawUrl);
  const result = await getResult(
    data,
    lang,
    url,
    linkText,
    start,
    stop,
    codeTag
  );
  return result;
}

hexo.extend.tag.register('remote_code', remoteCode, { async: true });
