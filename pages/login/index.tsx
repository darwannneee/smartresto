import BgLogin from "@/public/assets/img/bg-resto.jpg";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface DecodedToken {
  userType: string;
}

function parseJwt(token: string): DecodedToken {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = parseJwt(token);
        switch (decodedToken.userType) {
          case "pelayan":
            router.push("/pelayan");
            break;
          case "kasir":
            router.push("/kasir");
            break;
          case "koki":
            router.push("/koki");
            break;
          case "manager":
            router.push("/manager");
            break;
          default:
            console.error("Unknown user type");
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://api.smartresto.xyz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      switch (data.userType) {
        case "pelayan":
          router.push("/pelayan");
          break;
        case "kasir":
          router.push("/kasir");
          break;
        case "koki":
          router.push("/koki");
          break;
        case "manager":
          router.push("/manager");
          break;
        default:
          console.error("Unknown user type");
      }
    } else {
      setShowErrorModal(true);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <main>
      <div className="flex min-h-screen">
        <div className="flex flex-1 items-center justify-center bg-white p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please enter your details
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember for 30 days
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#5a4fcf] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gray-50">
          <img src={BgLogin.src} alt="Clock" className="max-w-full h-auto" />
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Login Failed</h2>
            <p className="text-gray-700 mb-4">Email dan password salah, coba lagi!</p>
            <div className="text-right">
              <button 
                onClick={closeModal} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
