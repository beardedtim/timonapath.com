export class BadRequest extends Error {
  status = 400

  constructor(reason: string) {
    super()

    this.message = `Bad Request: ${reason}`
  }
}

export class MissingResource extends Error {
  status = 404

  constructor(missing: string) {
    super()

    this.message = `Missing Resource: ${missing}`
  }
}
