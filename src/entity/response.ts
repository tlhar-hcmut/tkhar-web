export interface Action {
    id: number
    action: string
    confidence: number
}

export interface HarRes {
    predict: Action[]
    version: string
}

