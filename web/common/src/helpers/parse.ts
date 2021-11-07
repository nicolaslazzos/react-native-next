export const parseParams = (params: any | string) => {
  if (typeof params === "string") {
    const body: any = {};

    params.split("&").map((param) => {
      const [key, value] = param.split("=");
      body[key] = value;
    });

    return body;
  } else {
    const body = [];

    for (let param in params) {
      var key = encodeURIComponent(param);
      var value = encodeURIComponent(params[param]);
      body.push(`${key}=${value}`);
    }

    return body.join("&");
  }
};
