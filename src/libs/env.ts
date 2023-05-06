function getEnv(name: string): string {
  const envValue = process.env[name]

  if (!envValue) {
    throw new Error(`Missing env variable: ${name}`)
  }

  return envValue
}

export const ROOT_EMAIL = getEnv('ROOT_EMAIL')
export const ROOT_PASSWORD = getEnv('ROOT_PASSWORD')

export const SECRET_TOKEN = getEnv('NEXTAUTH_SECRET')

export const GITHUB_CLIENT_ID = getEnv('GITHUB_CLIENT_ID')
export const GITHUB_CLIENT_SECRET = getEnv('GITHUB_CLIENT_SECRET')
