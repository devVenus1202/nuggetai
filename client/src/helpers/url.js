export function json2Params(params) {
  const path = Object.keys(params)
    .map(k => {
      return `${encodeURIComponent(params[k])}`;
    })
    .join('&');
  return path;
}
