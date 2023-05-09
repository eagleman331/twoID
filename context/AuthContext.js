import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import auth from "@react-native-firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [error, setError] = useState(null);
  const [userGoogle, setUserGoogle] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // const storeToken = async (user) => {
  //   try {
  //     await AsyncStorage.setItem("userData", JSON.stringify(user));
  //     await AsyncStorage.setItem("userEmail", user.email);
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // };
  // const getToken = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem("userData");
  //     let userDataEmail = await AsyncStorage.getItem("userEmail");
  //     let data = JSON.parse(userData);
  //     // const {email} = data
  //     setUserId(userDataEmail);
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // };

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setEmailUser(user);

      } else {
        setEmailUser(null);
      }
      setLoadingInitial(false);
    });
  }, []);

  const logout = () => {
    setLoading(true);
    auth()
      .signOut()
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(() => ({
    emailUser,
    userId,
    loading,
    error,
    logout,
  }));
  return (
    <AuthContext.Provider value={memoedValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

///

// .then(res => {
//   this.storeToken(JSON.stringify(res.user));
// })

//   componentDidMount() {
//     this.getToken();
//  }
