export class NoPermissionToUpdateError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "NoPermissionToUpdateError"
    }
}