class ErrorHandler {
    private objectt;
    private errors;
    
    constructor(objectt: object, errors: string[] | string){
        this.objectt = objectt;
        this.errors = errors
    }

    handle(): object {
        return {
            error: true,
            fields: this.objectt,
            messages: this.errors
        };
    }
}

export {ErrorHandler};