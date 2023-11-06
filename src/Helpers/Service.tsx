// const baseURL = "https://sumr-app-api-production.up.railway.app";
const baseURL = "http://127.0.0.1:3000";
export async function apiGETCall(path: string) {
  const res = await fetch(baseURL + path);
  return await res.json();
}

export async function apiPOSTCall(path: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "React POST Request Example" }),
  };
  const res = await fetch(baseURL + path, requestOptions);
  return await res.json();
}
