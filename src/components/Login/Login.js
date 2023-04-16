import React, { useState } from "react";
import "./Login.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../pages/Redux/features/bazarSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(true);

  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user; //giriş yapan kullanıcıyi, userInfo reducer da depola
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        toast.success("Logged In Succesfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };

  const resetValues = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  //email-password sign in

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Kullanıcı giriş yaptıktan sonra yapılacak işlemler
        const user = userCredential.user;

        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        toast.success("Logged In Succesfully");
        resetValues();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        // Hata oluşursa yapılacak işlemler
        // console.log(error.message);
      });
  };

  const signUp = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        });
        toast.success("Sign Up Succesfully");
        resetValues();
      })
      .catch((error) => {
        // console.log(error.message);
      });
    setTimeout(() => {
      setLogin(true);
    }, 1000);
  };
  const handleCreateAccount = () => {
    setLogin(false);
    setEmail("");
    setPassword("");
    setUsername("");
  };
  const handleBackLogin = () => {
    setLogin(true);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login_container">
      <div>
        {login ? (
          <div className="login_div">
            <form
              className="form_field"
              onSubmit={(e) => signInWithEmailAndPasswordHandler(e)}
            >
              <h2>Sign In</h2>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  className="email_signIn"
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  className="password_signUp"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Login</button>
              <div>
                <button onClick={(e) => signInWithGoogle(e)}>
                  Sign In with Google
                </button>
              </div>
              <button onClick={handleCreateAccount}>
                Don't have a Account create one?
              </button>
            </form>
          </div>
        ) : (
          <div>
            <form className="form_field" onSubmit={signUp}>
              <h2>Sign Up</h2>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  className="username_signUp"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  className="email_signUp"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  className="password_signUp"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="signup_btn" type="submit">
                Sign Up
              </button>
              <button onClick={handleBackLogin}>Back to Login</button>
            </form>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={1000}
          draggable={false}
          closeButton={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </div>
  );
};
