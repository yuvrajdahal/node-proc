const HIDE_ITEMS = ["password"];

export const goodResponse = (object: any) => {
  const hideKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(hideKeys);
    } else if (typeof obj === "object" && obj !== null) {
      HIDE_ITEMS.forEach((item) => {
        delete obj[item];
      });

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = hideKeys(obj[key]);
        }
      }
    }
    return obj;
  };

  return { success: true, data: hideKeys(object) };
};
