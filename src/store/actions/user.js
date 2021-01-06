export const SET_USER = "SET_USER";

export const setuser = (name, profileurl) => {
  return {
    type: SET_USER,
    payload: {
      name: name,
      profileurl: profileurl,
    },
  };
};
