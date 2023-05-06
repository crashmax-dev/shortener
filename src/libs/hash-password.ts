import { createHmac } from 'node:crypto'

export function hashPassword(password: string, token: string): string {
  const hash = createHmac('sha256', token).update(password).digest('hex')
  return hash
}
