const isPrototypePolluted = function(key: string) {
  return ['__proto__', 'prototype', 'constructor'].indexOf(key) > -1;
}

export default function set(obj: Record<string, any> = {}, path: string, value: any) {
  const [key, ...keys] = path.split('.');
  if (isPrototypePolluted(key)) return obj;
  const pointer = obj[key] || {};
  obj[key] =
    keys.length < 1
      ? value
      : set(pointer.toString() === '[object Object]' || Array.isArray(pointer) ? pointer : {}, keys.join('.'), value);
  return obj;
}
