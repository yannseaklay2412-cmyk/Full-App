if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET in environment variables')
  process.exit(1)
}

export const jwtConfig = {
  secret:        process.env.JWT_SECRET,
  expiresIn:     process.env.JWT_EXPIRES_IN || '7d',
}