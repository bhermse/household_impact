/**
 * Utility functions
 */

import React from 'react';
import numeral from 'numeral/min/numeral.min.js';

export const nextSection = (next_section_id, callback) => {
  $(next_section_id).removeClass('initially_hidden');
  $('html, body').animate({scrollTop: $($(next_section_id)).offset().top}, 
    {duration: 1800, easing: 'easeOutQuart', complete: callback});
}

export const nextAndHide = (e, next_section_id) => {
  $(e.target).fadeOut('fast');
  nextSection(next_section_id);
}

export const nextAndInvisible = (e, next_section_id) => {
  e.persist();
  $(e.target).animate({ opacity: 0 });
  nextSection(next_section_id);
}

export const toCurrency = (val, format = '$0,0') => {
  return numeral(val).format(format)
}

const range = (start, end) => { return [...Array(1+end-start).keys()].map(v => start+v) }

export const numberOptionList = (begin, end) => {
  return range(begin, end).map((val) =>
    <option key={val}>{val}</option>
  )
}
