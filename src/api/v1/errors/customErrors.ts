// Custom error classes

// ValidationError class
export class ValidationError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
  }
}

// permission class
export class permissionError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'permissionError';
  }
}

// AppError class with status
export class AppError extends Error {
  public status: number;

  constructor(message: string, status: number = 500) {
      super(message);
      this.status = status;
      this.name = 'AppError';
  }
}
