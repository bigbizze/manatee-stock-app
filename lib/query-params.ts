export function objToQueryParams<T extends object>(obj: T) {
  const parts: string[] = [];
  let isStart = false;
  for (const [ key, value ] of Object.entries(obj)) {
    if (value != null) {
      parts.push(`${!isStart ? "?" : "&"}${key}=${encodeURIComponent(value)}`);
      isStart = true;
    }
  }
  return parts.join("");
}
