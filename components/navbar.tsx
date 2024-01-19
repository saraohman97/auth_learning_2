import Link from "next/link";
import UserMenu from "./user-menu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NavbarCart from "./navbar-cart";

const Navbar = async () => {
  //Hydration
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  // if (!isMounted) {
  //   return null;
  // }

  const currentUser = await getCurrentUser();

  return (
    <div className="shadow-md shadow-black/5 top-0 w-full p-4 space-x-4 flex items-center justify-center bg-white">
      <Link href="/">Home</Link>
      <NavbarCart />
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <UserMenu currentUser={currentUser} />
    </div>
  );
};

export default Navbar;
