export const getImgPath = () =>
  process.env.NODE_ENV !== "production" ? "/assets/img" : ".";
