import Link from "next/link"
import React, { useState } from "react"
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

const poppins = Poppins({weight: ["400", "500"], subsets: ["latin"]});

const Register = () => {
  const [isUserInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setError] = useState({
    status: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();

  const confirmPasswordCheck = () => {
    if(isUserInput.confirmPassword !== isUserInput.password){
      setError({...isError, status: true, confirmPassword: true});
    } else {
      setError({...isError, status: false, confirmPassword: false});
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({...isError, status: false});
    console.log(isUserInput);
    const data = {
      username: isUserInput.username,
      email: isUserInput.email,
      password: isUserInput.password,
    };
    if(isError.confirmPassword){
      return false
    }
    try {
      const result = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if(result.status === 200){
        router.push("/dashboard");
      } else {
        // const errorData = await result.json();
        setError({...isError, email: true, status: true});
      }
    } catch (error) {
      console.log("catch: ", error);
      setError({...isError, status: true});
    }
  };

  return (
    <div className={`w-full h-screen flex items-center justify-center`} style={{ backgroundImage: `url("/assets/images/background2.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="w-full max-w-md shadow-lg p-8 rounded-3xl h-fit bg-white/50 backdrop-blur-lg">
        <div className="w-full mb-4 pb-2 text-neutral-800 border-neutral-800">
          <h1 className={`text-4xl font-medium ${poppins.className}`}>Register</h1>
        </div>
        <div className="w-full mb-6">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col gap-3">
            <div className="w-full relative flex flex-col justify-center">
              <label className="font-semibold bg-white px-2 pt-0.5 pb-0.5 flex items-center justify-center rounded-full absolute left-1.5 top-1.5" htmlFor="username">U</label>
              <input
                required
                onChange={e => setUserInput({...isUserInput, username: e.target.value})}
                type="text" id="username" placeholder="Username" className="py-2 pl-11 pr-4 rounded-full w-full h-fit bg-white/30 outline-none focus:border-2 placeholder:text-black" />
            </div>
            <div className="w-full relative flex flex-col justify-center">
              <label className="font-semibold bg-white px-2 pt-0.5 pb-1 flex items-center justify-center rounded-full absolute left-1.5 top-1.5" htmlFor="email">@</label>
              <input
                required
                onChange={e => setUserInput({...isUserInput, email: e.target.value})}
                type="email" id="email" placeholder="Your email" className="py-2 pl-11 pr-4 rounded-full w-full h-fit bg-white/30 outline-none focus:border-2 placeholder:text-black" />
              { isError.email && <p className="text-red-600 mt-2">* Email already exist</p> }
            </div>
            <div className="w-full relative flex flex-col justify-center">
              <label className="font-semibold bg-white px-2 pt-1 pb-1.5 flex items-center justify-center rounded-full absolute left-1.5 top-1.5 text-sm" htmlFor="password">🗝️</label>
              <input
                required
                onChange={e => setUserInput({...isUserInput, password: e.target.value})}
                type="password" id="password" placeholder="Your Password" className="py-2 pl-11 pr-4 rounded-full w-full h-fit bg-white/30 outline-none focus:border-2 placeholder:text-black" />
            </div>
            <div className="w-full relative flex flex-col justify-center">
              <label className="font-semibold bg-white px-1.5 pt-1 pb-1.5 flex items-center justify-center rounded-full absolute left-1.5 top-1.5 text-sm" htmlFor="confirmPassword">🔐</label>
              <input
                required
                onBlur={confirmPasswordCheck}
                onChange={e => setUserInput({...isUserInput, confirmPassword: e.target.value})}
                type="password" id="confirmPassword" placeholder="Confirm Password" className="py-2 pl-11 pr-4 rounded-full w-full h-fit bg-white/30 outline-none focus:border-2 placeholder:text-black" />
              { isError.confirmPassword && <p className="text-red-600 mt-2">* Invalid Password</p> }
            </div>
            <button type="submit" className={`py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95`}>Submit</button>
          </form>
        </div>
        <div className="w-full flex items-center gap-2">
          <p>Have an Account?</p>
          <Link href="/login" className="text-blue-600">Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register