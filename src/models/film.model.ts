export interface Film {
  episode_id: string;
  title: string;
  opening_crawl: string;
}

export interface FilmsResponse {
  results: Film[];
}
