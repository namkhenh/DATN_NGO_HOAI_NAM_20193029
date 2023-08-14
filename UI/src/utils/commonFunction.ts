export const validateRequireLimitCharacter = (value: any) => {
    if (isStringEmpty(value) || value === undefined || (Array.isArray(value) && value.length === 0)) {
        return "Trường này là bắt buộc"
    }
    else if (value.match(/[!@#$%^*()=/\\[{}:;?<>+']/g) || value.includes("]")) {
        return "Trường này không thể chứa các kí tự: ! @ # $ % ^ & * ( ) = / \\ [ ] { } : ; ? < > + '"
    }
    else if (containsNumber(value)) {
        return "Trường này không thể chứa số"
    }
    else {
        return "";
    }
}

export const validateRequireLimitCharacterForm = (value: any) => {
    if (value.match(/[!@#$%^*()=/\\[{}:;?<>+']/g) || value.includes("]")) {
        return "Trường này không thể chứa các kí tự: ! @ # $ % ^ & * ( ) = / \\ [ ] { } : ; ? < > + '"
    }
    else if (containsNumber(value)) {
        return "Trường này không thể chứa số"
    }
    else {
        return "";
    }
}

export const validateRequire = (value:any) => {
    if (isStringEmpty(value) || value === undefined || (Array.isArray(value) && value.length === 0)) {
        return "Trường này là bắt buộc"
    }
    else {
        return "";
    }
}

export const validateMaxLength = (value:any, maxLength: number) => {
    if (!isStringEmpty(value) && value.length > maxLength) {
        return `Nhập tối đa ${maxLength} kí tự`;
    }
    else {
        return "";
    }
}

export const validateNumberField = (value:any, length: number) => {
    if (!isNumber(value) && !isStringEmpty(value)) {
        return "Vui lòng nhập số"
    }
    else if (!isStringEmpty(value) && value.length !== length) {
        return `Nhập đúng ${length} kí tự`;
    }
    else {
        return "";
    }
}

export const isStringEmpty = (obj: any): boolean => {
    return isUndefined(obj) || isNull(obj) || (isString(obj) && obj.trim() === "")
} 

export const isUndefined = (o: any):boolean => {
    if (Object.prototype.toString.call(o).slice(8, -1) === "Undefined")
        return true
    return false
} 

export const isNull = (o: any):boolean => {
    if (Object.prototype.toString.call(o).slice(8, -1) === "Null")
        return true
    return false
}

export const isString = (o: any):boolean => {
    if (Object.prototype.toString.call(o).slice(8, -1) === "String")
        return true
    return false
}

export const isNumber = (o: any):boolean => {
    var reg = new RegExp("^([0-9])([0-9]|[.])*$");
        return reg.test(o)
}

export const containsNumber = (o: any) => {
    return /[0-9]/.test(o);
}

export const onEnterKeyDownAction = (e: any, action: () => void) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
        action();
    }
}

export const convertTZ = (date: string | Date) => {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: "Asia/Bangkok"}));
}