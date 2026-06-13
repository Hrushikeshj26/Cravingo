import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        
        const loggedInUser = data.user;

        if(loggedInUser.email === 'admin@cravingo.com'){
          alert("Welcome back Admin!");
          navigate('/admin');
        }else{
          alert("Welcome back to Cravingo!");
        navigate('/');
        }
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "user",
            full_name: name,
          },
        },
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Account created successfully, You can Login now..");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-155 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-100 rounded-3xl shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500">
            Cravingo
          </h1>

          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Welcome back! Sign in to continue."
              : "Create your account and start ordering."}
          </p>
        </div>

        <form
          onSubmit={handleAuth}
          className="space-y-5"
        >

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading
              ? "Processing..."
              : isLogin
              ? "Log In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-orange-500 font-semibold hover:text-orange-600"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}