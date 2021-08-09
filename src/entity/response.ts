export interface Action {
    key: number
    id: number
    action: string
    confidence: number
}

export interface HarResponse {
    code: number
    message: string
    data: Action[]
}