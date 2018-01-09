const mixed = (attr, value) => {
  'use strict';
  const match = value.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
  if (match !== null) {
    for (let i = 0, len = match.length; i < len; i++) {
      let prop = match[i].replace(/'/g, '').replace(/"/g, '').split('=');
      attr[prop[0]] = prop[1];
    }
  }

  return attr;
};

const attribute = (obj) => {
  'use strict';
  let prop = '';
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      prop += key + '="' + obj[key] + '" ';
    }
  }

  return prop;
};

const closeTag = (el) => {
  const tag = ['img', 'br', 'hr', 'meta', 'link'];
  el = el.replace(/<(\w+)[^>]*\/>/g, (match, capture) => {
    if (tag.indexOf(capture) === -1) {
      match = match.replace('/>', '></' + capture + '>');
    }

    return match;
  });
  return el;
};

const singleTag = (el) => {
  return el
    .replace(/<br(.*?)>/g, '<br $1/>').replace(/\/\//g, '/')
    .replace(/<hr(.*?)>/g, '<hr $1/>').replace(/\/\//g, '/')
    .replace(/<img(.*?)>/g, '<img $1/>').replace(/\/\//g, '/')
    .replace(/<link(.*?)>/g, '<link $1/>').replace(/\/\//g, '/')
    .replace(/<meta(.*?)>/g, '<meta $1/>').replace(/\/\//g, '/');
};

const correction = (str) => {
  'use strict';

  let el = str
    .replace(/data-server-rendered="true"/g, '')
    .replace(/[a-z]+="\s*"/g, '')
    .replace(/<!---->/g, '')
    .replace(/>\s</g, '><');
  el = singleTag(el);
  el = closeTag(el);
  el = el
    .replace(
      /<img[^>]*>/g,
      (value) => '<img {{attr}}/>'.replace('{{attr}}', attribute(mixed({ src: '', alt: '' }, value)))
    )
    .replace(
      /<input[^>]*>/g,
      (value) => '<input {{attr}}/>'.replace('{{attr}}', attribute(mixed({
        type: 'text',
        name: '',
        value: '',
      }, value)))
    )
    .replace(
      /<textarea[^>]*>/g,
      (value) => '<textarea {{attr}}>'.replace('{{attr}}', attribute(mixed({ name: '', value: '' }, value)))
    )
    .replace(
      /<select[^>]*>/g,
      (value) => '<select {{attr}}>'.replace('{{attr}}', attribute(mixed({ name: '' }, value)))
    )
    .replace(
      /<option[^>]*>/g,
      (value) => '<option {{attr}}>'.replace('{{attr}}', attribute(mixed({ value: '' }, value)))
    )
    .replace(
      /<iframe[^>]*>/g,
      (value) => '<iframe {{attr}}>'.replace('{{attr}}', attribute(mixed({ src: '', frameborder: '0' }, value)))
    )
    .replace(
      /<main[^>]*>/g,
      (value) => '<main {{attr}}>'.replace('{{attr}}', attribute(mixed({ role: 'main' }, value)))
    )
    .replace(
      /<button[^>]*>/g,
      (value) => '<button {{attr}}>'.replace('{{attr}}', attribute(mixed({ type: 'button' }, value)))
    )
    .replace(
      /<a\s[^>]*>/g,
      (value) => '<a {{attr}}>'.replace('{{attr}}', attribute(mixed({ href: '#' }, value)))
    )
    .replace(
      /<form[^>]*>/g,
      (value) => '<form {{attr}}>'.replace('{{attr}}', attribute(mixed({
        name: '',
        method: 'get',
        action: '',
      }, value)))
    );

  return el.replace(/\/\s\//g, '/').replace(/\/\/>/g, '/>');
};

module.exports = {
  render: correction,
  singleTag: singleTag,
};
