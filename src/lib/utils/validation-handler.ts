export abstract class ValidationHandler {
  private nextHandler: ValidationHandler | undefined;

  public setNext(handler: ValidationHandler): ValidationHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(context: ValidationContext): Promise<void> {
    if (this.nextHandler) {
      return this.nextHandler.handle(context);
    }
  }
}

export abstract class ValidationContext {}
