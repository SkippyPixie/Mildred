type PagesFunction<Env = Record<string, unknown>, Params = unknown, Data = unknown> = (context: {
  request: Request;
  env: Env;
  params: Params;
  data: Data;
  next(): Promise<Response>;
}) => Response | Promise<Response>;

export {};
