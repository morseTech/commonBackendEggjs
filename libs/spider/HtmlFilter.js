'use strict';
const cheerio = require('cheerio');
class Filter {
  #txt = null;
  #$ = null;
  constructor(txt) {
    if(txt && typeof txt === 'string'){
      this.#txt = txt;
      try {
        this.#$ = cheerio.load(txt);
        return this.#$('*').length > 0;
      } catch (error) {
        return null;
      }
    }
  }

  // o = {
  //   selector: null,
  //   attr: null,
  // }
  find(o = {}) {
    const selector = o?.selector || false;
    const attr = o?.attr || false;
    if (!selector) return false;
    try {
      const element = this.#$(selector);
      if (element.length) {
        if (attr) return element.attr(attr).trim();
        return element.text().trim();
      }
      return null;
    } catch (error) {
      return false;
    }
  }

  match(reg = '') {
    if (!reg || !(reg instanceof RegExp)) return false;
    const match = this.#txt.match(reg);
    if (match && match[1]) return match[1];
    return null;
  }
}

module.exports = Filter;
