import { format } from 'timeago.js';

export const helpers = {};

helpers.timeago = (timestamp) => {
  return format(timestamp);
};
