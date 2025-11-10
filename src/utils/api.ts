import type {Story} from "@/utils/types.ts";

const baseUrl = import.meta.env.VITE_HOST_URL;

const checkResponse = (res: Response) => {
  if (res.ok)
    return res.json();
  return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
}

const request = async <T>(endpoint: string, options?: Object): Promise<T> => {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse);
}

export const getNewStories = () => request<number[]>(`newstories.json?print=pretty`);
export const getStory = (id: number) => request<Story>(`item/${id}.json?print=pretty`);
export const getComment = (id: number) => request<Comment>(`item/${id}.json?print=pretty`);
