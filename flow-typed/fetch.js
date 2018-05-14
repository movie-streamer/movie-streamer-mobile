declare class Response {
  ok: boolean;
  status: number;
  json(): Promise<any>;
  text(): Promise<string>;
}

declare function fetch(url: string, params?: Object): Promise<Response>;
