const baseUrl = 'http://localhost:3001/api/search';

export async function getUserResults(query: string) {
  const res = await fetch(`${baseUrl}/?q=${query}`);

  if (!res.ok) {
    throw new Error('Failed to fetch results');
  }

  const searchResults = await res.json();
  return searchResults;
}
