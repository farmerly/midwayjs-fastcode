/**
 * 取最大值
 * @param a
 * @param b
 * @returns
 */
const max = (a: number, b: number) => {
  return a > b ? a : b;
};

/**
 * 取最小值
 * @param a
 * @param b
 * @returns
 */
const min = (a: number, b: number) => {
  return a < b ? a : b;
};

/**
 * 字符串补位
 * @param str
 * @param type prefix, 加前缀; suffix, 加后缀
 * @param char
 * @param length
 * @returns
 */
export default (
  str: string,
  type: 'prefix' | 'suffix',
  char = ' ',
  length = 24,
) => {
  if (type === 'prefix') {
    const complement = char.repeat(length) + str;
    return complement.substring(min(str.length, length), str.length + length);
  } else if (type === 'suffix') {
    const complement = str + char.repeat(length);
    return complement.substring(0, max(str.length, length));
  }
};
