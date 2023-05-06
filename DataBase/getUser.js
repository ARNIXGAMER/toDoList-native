import { getAuth } from "firebase/auth";

const getUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
};
export default getUser;
