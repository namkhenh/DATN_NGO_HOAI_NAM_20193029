const context: any = (window as any).context
export class Context {
    static get errorCode(): number {
        return context.code
    }

    static get api(): string {
        return context.api
    }

    static get jwt(): string {
        return context.token
    }

    static get accesstoken(): string {
        return context.accesstoken
    }

    static clear(): void {
        (window as any).localStorage.clear();
    }
}