export interface Action {
    id: number
    action: string
    confidence: number
}

export interface HarResponse {
    code: number
    message: string
    data: Action[]
}