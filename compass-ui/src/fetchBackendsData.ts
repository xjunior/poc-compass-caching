export type MenuItem = {
  label: string
  url?: string
  items?: MenuItem[]
}

export async function fetchServiceData(backend: string) {
  return await fetch(backend, { cache: 'default' })
    .catch(() => fetch(backend, { cache: "force-cache" }))
    .then((response) => response.json());
}
export async function fetchBackendsData(backends: string[]) {
  const updatedMenu = backends.map(fetchServiceData);

  return Promise.all(updatedMenu);
}
