import dayjs from "dayjs";
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
    "[object FormData]": "formdata",
  };
  return map[toString.call(obj)];
}

/**
 * 深拷贝
 * @param {Array} obj 被拷贝对象
 */
const deepClone = (obj) => {
  if (obj === null) {
    return null;
  }
  const clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeOf(obj[key]) === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const dateFormat = (value, formatStr = "YYYY-MM-DD") => {
  return dayjs(value).format(formatStr);
};
const dateTimeFormat = (value, formatStr = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value).format(formatStr);
};

export { deepClone, dateFormat, dateTimeFormat };
