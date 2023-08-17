export type ResponseService<T> = { status: number; data: T };

export type Erro = { message:string };
export type Token = { token:string };

export type Response<T> = Promise<ResponseService<T | Erro>>;