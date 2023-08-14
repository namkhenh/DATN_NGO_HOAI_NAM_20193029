import { Context } from "../../../utils/context";

interface IAuthorizationHeader {
    Authorization: string;
}

export function build(): IAuthorizationHeader {
    return {
        Authorization: `Bearer `
    };
}

