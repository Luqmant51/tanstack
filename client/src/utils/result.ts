export interface ErrorDetail {
  code: string
  message: string
}

export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly error: ErrorDetail | null,
    private readonly _value: T | null,
  ) {}

  get value(): T {
    if (!this.isSuccess || this._value === null) {
      throw new Error("Can't access value of failure result.")
    }
    return this._value
  }

  static success<T>(value: T): Result<T> {
    return new Result<T>(true, null, value)
  }

  static failure<T>(error: ErrorDetail): Result<T> {
    return new Result<T>(false, error, null)
  }
}
