import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Helpers/Firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../Helpers/FireStore";
import SumrLogo from "../assets/images/Sumr.png";

function Login() {
  const token: any = localStorage.getItem("token");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
      } else {
        setUserEmail("");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    setLoader(true);
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
      setLoader(false);
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character",
      );
      setLoader(false);
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/sumrs");
      setLoader(false);
    } catch (err: any) {
      CommonError(error);
    }
  };

  const handleGoogleLogin = async () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const user = result.user;
      await createUser(user.email ?? "", user.uid, "", "");
      localStorage.setItem("token", token);
      navigate("/sumrs");
      setLoader(false);
    } catch (error: any) {
      CommonError(error);
    }
  };

  const CommonError = (err: any) => {
    setError(err.message);
    setLoader(false);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return re.test(password);
  };

  return (
    <>
      {!token ? (
        <section className="bg-primaryDark">
          <div className="flex gap-5 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img src={SumrLogo} alt="Sumr" className="h-8 w-auto" />
            <div className="w-full border-primary border-2 bg-primaryDark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 border border-primary   rounded md:space-y-6 sm:p-8">
                {error && <span className="mt-10 text-red-600">{error}</span>}
                <h1 className="text-xl text-white font-bold leading-tight tracking-tight md:text-2xl">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary ">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-primaryDark border border-primary text-white sm:text-sm rounded-lg block w-full p-2.5"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-primaryDark border border-primary text-white sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      onClick={() => navigate("/forgotpassword")}
                      className="text-sm font-medium text-primary hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>
                  {!loader ? (
                    <button
                      type="submit"
                      onClick={(e) => handleLogin(e)}
                      className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                  ) : (
                    <button
                      disabled
                      type="button"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Sign in...
                    </button>
                  )}
                  <p className="text-sm font-light text-white">
                    Don’t have an account yet?{" "}
                    <a
                      onClick={() => navigate("/signup")}
                      className="font-medium hover:underline text-primary cursor-pointer"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
                <button
                  aria-label="Continue with google"
                  role="button"
                  onClick={handleGoogleLogin}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-white text-white flex items-center w-full mt-10"
                >
                  <svg
                    width={19}
                    height={20}
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                      fill="#EB4335"
                    />
                  </svg>
                  {userEmail ? (
                    <p className="text-primary-500 ml-4">{userEmail}</p>
                  ) : (
                    <p className="text-base font-medium ml-4 hover:text-primaryDark text-white">
                      Continue with Google
                    </p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/sumrs" />
      )}
    </>
  );
}

export default Login;
