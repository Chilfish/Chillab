export interface todoItem {
  id: string
  content: string
  done: boolean
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  language?: string
  stargazers_count: number
  forks_count: number
  open_issues: number
  owner: {
    login: string
    avatar_url: string
  }
}

export type reqState = 'idle' | 'loading' | 'success' | 'error' | 'notFound'

export interface User {
  id: string
  nickname: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

export interface Post {
  id: string
  title: string
  content: string
  // createdAt: string
  owner: string

  likes: number
  photos: string[]
}
