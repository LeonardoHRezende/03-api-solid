export class LateCheckInValidateError extends Error {
  constructor() {
    super('Check in is expired, check in can only be validate in interval of 20 minutes');
  }
}