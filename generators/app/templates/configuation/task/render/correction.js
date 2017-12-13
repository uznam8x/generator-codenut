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

const correction = (str) => {
  'use strict';
  let el = str
    .replace(/data-server-rendered="true"/g, '')
    .replace(/[a-z]+="\s*"/g, '')
    .replace(/<!---->/g, '')

    .replace(/<br(.*?)>/g, '<br $1/>')
    .replace(/<hr(.*?)>/g, '<hr $1/>');

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
      /<a>/g,
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

module.exports = correction;
