import { useQuery } from '@tanstack/react-query';
import { getUserResults } from '../app/pages/api/search';

export function useUserResults(query: string) {
  return useQuery(['userResults', query], () => getUserResults(query), {
    enabled: query.length >= 3,
  });
}
