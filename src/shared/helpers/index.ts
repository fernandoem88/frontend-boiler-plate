// import cookie from "cookie";
export const parseCookies = (req: any) => {
  //   const cookies = cookie.parse(req?.haders?.cookie || "") as {
  //     [K: string]: string;
  //   };

  return req.cookies;
};

export const normalize = <T = any, R = any>(
  array: T[],
  normalizer: (item: T) => void | { id: string; value: R }
) => {
  const normalizedValue = {
    ids: [] as string[],
    byId: {} as { [id: string]: R },
  };
  array.forEach((item) => {
    const data = normalizer(item);
    if (data) {
      normalizedValue.ids.push("" + data.id);
      normalizedValue.byId[data.id] = data.value;
    }
  });
  return normalizedValue;
};
