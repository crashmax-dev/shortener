function getEnv(name: string): string {
  const envValue = process.env[name]

  if (!envValue) {
    throw new Error(`Missing env variable: ${name}`)
  }

  return envValue
}

export const env = {
  get githubClientId(): string {
    return getEnv('GITHUB_CLIENT_ID')
  },
  get githubClientSecret(): string {
    return getEnv('GITHUB_CLIENT_SECRET')
  }
}
