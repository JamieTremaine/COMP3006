export class InvalidArgumentError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, InvalidArgumentError.prototype);
    }

}