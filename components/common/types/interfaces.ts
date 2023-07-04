export interface INotification {
    type: 'success' | 'error' | 'info';
    message: any;
    description?: string;
}

export interface ApiResponse {
    [x: string]: any;
    success: boolean;
    code: number;
    message: string;
}
