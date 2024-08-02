interface IHttpError extends Error{
    status:number;
}

export const HttpError = (status:number, message:string) :IHttpError => {
    const error = new Error(message) as IHttpError;
    error.status = status;
    return error;
}