import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

const Navbar = (loginuser:any) => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("Token")
      router.push("/login");
      toast.success('you have successfully logged out.')
    } catch (error: any) {
      toast.error(error.message)
    }
  };
  return (
    <>
      <header className="flex flex-wrap container mx-auto max-w-full items-center p-6 justify-between bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center text-blue-900 hover:text-blue-800 cursor-pointer transition duration-150 ">
          <Link href="/">
            <span className="font-semibold text-lg font-sans">
              Firebase Authentication with Next.js
            </span>
          </Link>
        </div>

        <nav className={`md:flex md:items-center font-title w-full md:w-auto`}>
          <ul className="text-lg inline-block">
            <>
                  <li className="my-3 md:my-0 items-center mr-4 md:inline-block block ">
                    <Link href="/" className="text-blue-800 hover:text-blue-900 transition">
                      Welcome {loginuser?.user}!
                    </Link>
                  </li>
                  <li className="my-3 md:my-0 items-center mr-4 md:inline-block block ">
                    <a
                      onClick={handleLogout}
                      className="text-blue-800 hover:text-blue-900 transition cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;