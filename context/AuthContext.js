import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";



  
  export const AuthContext = createContext();
  
  const AuthContextProvider = (props) => {
    const [error, setError] = useState(null);
    const [userGoogle, setUserGoogle] = useState(null);
    const [emailUser, setEmailUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
  
    const [userId, setUserId] = useState(null);

   
  
   
  
    const memoedValue = useMemo(() => ({
      emailUser,
      userId,
      loading,
      error,


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