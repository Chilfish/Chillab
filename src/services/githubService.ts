import { HttpClient } from '@ngify/http'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import type { GithubRepo } from '~/types'

const http = new HttpClient()
const api = 'https://api.github.com'

export class GithubService {
  private reposSubject = new BehaviorSubject<GithubRepo[]>([])
  repos$ = this.reposSubject.asObservable()

  getRepos(input: string) {
    http.get<{ items: GithubRepo[] }>(`${api}/search/repositories?q=${input}`)
      .pipe(
        map(res => res.items),
      ).subscribe((data) => {
        this.reposSubject.next(data)
      })
  }
}
