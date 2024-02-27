export interface GenericResponse<T> {
    isSuccessful: boolean;
    result?: T | undefined;
    errorMessage?: string;
}