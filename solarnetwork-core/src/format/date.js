import { utcFormat, utcParse, isoParse } from 'd3-time-format';

export const dateTimeFormat = utcFormat("%Y-%m-%d %H:%M");

export const timestampFormat = utcFormat("%Y-%m-%d %H:%M:%S.%LZ");

export const dateFormat = utcFormat("%Y-%m-%d");

export const dateTimeFormatURL = utcFormat("%Y-%m-%dT%H:%M");

export { isoParse as dateParse } from 'd3-time-format';

export const dateTimeParse = utcParse("%Y-%m-%d %H:%M");

export const timestampParse = utcParse("%Y-%m-%d %H:%M:%S.%LZ");

/**
 * Parse a UTC date string, from a variety of supported formats.
 * 
 * @param {String} str the string to parse into a date
 * @returns {Date} the parsed {@code Date}, or {@code null} if the date can't be parsed
 */
export function dateParser(str) {
	var date = isoParse(str)
		|| timestampParse(str)
		|| dateTimeParse(str);
	return date;
}
