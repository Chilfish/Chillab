import { HttpClient } from '@ngify/http'
import { map } from 'rxjs/operators'
import type { GithubRepo } from '~/types'

const api = 'https://api.github.com'

export class GithubService {
  private http: HttpClient

  constructor() {
    this.http = new HttpClient()
  }

  getRepos(input: string) {
    return this.http
      .get<{ items: GithubRepo[] }>(`${api}/search/repositories?q=${input}`)
      .pipe(
        map(res => res.items),
      )
  }
}
