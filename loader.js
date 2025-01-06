export function load(url, context, defaultLoad) {
  if (url.endsWith('.md')) {
    return {
      format: 'module',
      source: '',
    };
  }
  return defaultLoad(url, context, defaultLoad);
}
