export async function apiGETCall(path: string) {
  const res = await fetch("http://127.0.0.1:3000" + path);
  return await res.json();
}
