import Link from "next/link"
import React, { useState } from "react"
import { Poppins } from "next/font/google";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const poppins = Poppins({ weight: ["400", "500"], subsets: ["latin"] });

const Login = () => {
  const [isUserInput, setUserInput] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({
    status: false,
    message: ""
  })

  const { query, push } = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const callbackUrl: string = Array.isArray(query.callbackUrl)
        ? query.callbackUrl[0]
        : query.callbackUrl || "/";
      const res = await signIn("credentials", {
        redirect: false,
        email: isUserInput.email,
        password: isUserInput.password,
        callbackUrl
      });
      if (!res?.error) {
        setTimeout(() => {
          setLoading(false);
          push("/");
        }, 2000);
      } else {
        setLoading(false);
        setError({ status: true, message: res.error });
      }
    } catch (error: unknown) {
      setLoading(false);
      setError({ status: true, message: `${error}` });
    }
  }

  return (
    <div className={`w-full h-screen flex items-center justify-center px-5`} style={{ backgroundImage: `url("/assets/images/background.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className={`w-full max-w-md shadow-lg py-6 px-5 rounded-3xl h-fit backdrop-blur-lg ${isError.status ? "bg-red-200/50" : "bg-white/50"}`}>
        <div className="w-full mb-2 pb-2 text-neutral-800 border-neutral-800">
          <h1 className={`text-2xl font-medium ${poppins.className}`}>Login</h1>
        </div>
        <div className="w-full">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="w-full relative flex items-center">
              <label className="font-semibold bg-white px-2 pt-0.5 pb-1 flex items-center justify-center rounded-full absolute left-1.5" htmlFor="email">@</label>
              <input
                onChange={(e) => setUserInput({ ...isUserInput, email: e.target.value })}
                type="email"
                id="email" placeholder="Your email" className="py-2 pl-11 pr-4 rounded-full w-full h-fit bg-white/30 outline-none focus:border-2 placeholder:text-black" />
            </div>
            <div className="w-full relative flex items-center">
              <label className="font-semibold bg-white px-2 pt-1 pb-1.5 flex items-center justify-center rounded-full absolute left-1.5 text-sm" htmlFor="password">🗝️</label>
              <input
                onChange={(e) => setUserInput({ ...isUserInput, password: e.target.value })}
                type="password"
                id="password"
                placeholder="Your Password" className="py-2 pl-11 pr-4 rounded-full w-full h-fit bg-white/30 outline-none focus:border-2 placeholder:text-black" />
            </div>
            <button type="submit" className="py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
        {isError.status && <div className="py-1 px-2 my-2 bg-white rounded-md"><p className=" text-red-500">Incorrect email or password</p></div>}
        <div className="w-full flex mt-2 items-center gap-2">
          <p>
            <span className="mr-2">Do not have an Account yet?</span>
            <Link href="/register" className="text-blue-600">Create Account here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;