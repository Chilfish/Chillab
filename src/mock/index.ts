import { v4 as uuid } from 'uuid'
import type { User } from '~/types'

function genUser(i: number): User {
  const name = `user${i}`
  return {
    id: uuid(),
    name,
    nick_name: name,
    email: `${name}@localhost`,
    avatar: `https://avatars.dicebear.com/api/avataaars/${name}.svg`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function genPost(owner: User) {
  return {
    id: uuid(),
    title: `title ${uuid()}`,
    content: `content ${uuid()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner,
  }
}

export const users = Array.from({ length: 10 }, (e, i) => genUser(i))

export const posts = Array.from({ length: 20 },
  () => genPost(
    users[Math.floor(Math.random() * users.length)],
  ),
)
