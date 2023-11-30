class CustomError extends Error {
     code: number;
     message: string;
  
    constructor(message: string, code: number, any= null) {
      super(message); 
      this.code = code; 
      this.message = message;
      this.name = 'CustomError'
    
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }

export default CustomError;