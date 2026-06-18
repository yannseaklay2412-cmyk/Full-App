export class AppError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export const notFound = (entity) => {
  throw new AppError(404, `${entity} not found`)
}

export const badRequest = (message) => {
  throw new AppError(400, message)
}
