export const CreateError = (errorStatus,msg)=>{
    const err = new Error();
    err.status = errorStatus;
    err.message = msg;
    return err;
}