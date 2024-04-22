export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Org already exists')
  }
}
