import Cookies from "js-cookie";
import { HttpAuthHeaderBuilder } from "..";
import { ApiResultStatus } from "../../../model/IResponse";
import { errorPage, loadingPage } from "../../../structure/logout/Logout";
import { Context } from "../../../utils/context";

type ISendRequest = (
    path: string,
    method: string,
    body?: any,
    options?: any,
    token?: string) => Promise<any>;

const send: ISendRequest = (
    path,
    method,
    body,
    options,
    token) => {
    let requestOptions: any = {
        headers: {
            "Content-Type": "application/json",
            "Token": Cookies.get("Token")
        },
        // credentials: 'include',
        method,
    };
    if (body) {
        requestOptions = {
            ...requestOptions,
            body: JSON.stringify(body),
        };
    }
    if (options) {
        requestOptions = {
            ...requestOptions,
            ...options,
        };
    }
    return fetch(path, requestOptions).then(handleResponse).catch((response) => {
        if (response === 401) {
            //replace original component with loading
            //avoid js error
            handleUnAuthorizedPage();
        }
        if (!response.code) {
            //handleErrorPage(500);
        }
        return Promise.resolve({
            isSuccessful: false,
            status: ApiResultStatus.Failed
        });
    });
};

function handleResponse(response: Response): Promise<any> {
    return response.text().then((text) => {
        let data: any = text && JSON.parse(text);
        if (!response.ok) {
            let errorResult = {
                businessErrorCode: data[0]?.businessErrorCode,
                isSuccessful: false,
                status: ApiResultStatus.Failed,
                errorMessage: data[0]?.errorMessage,
                errorObject: {}
            }
            try {
                let errorObject = data[0] && JSON.parse(data[0]);
                errorResult.errorObject = { ...errorObject };
            } catch {
                errorResult.errorObject = {};
            }
            if (response.status === 401) {
                handleUnAuthorized();
            } else if (response.status === 400) {
                return Promise.resolve(errorResult);
            } else if (response.status === 504) {
                return Promise.resolve(errorResult);
            } else {
                handleErrorPage(response.status);
            }

            const error: any = data || response.status;
            return Promise.reject(error);
        } else {
            return Promise.resolve(data);
        }
    });
}

function commonFileRequestOptions(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return { headers: { ...HttpAuthHeaderBuilder.build() }, body: fd };
}

function handleUnAuthorized(): void {
    Context.clear();
    window.open("/not-permission", "_self")
}

function handleErrorPage(errorCode: number): void {
    errorPage(errorCode);
}

function handleUnAuthorizedPage(): void {
    loadingPage();
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary: string = "";
    const bytes: any = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b:any) => binary += String.fromCharCode(b));

    return window.btoa(binary);
}

export { send, handleUnAuthorized, arrayBufferToBase64, commonFileRequestOptions,  };