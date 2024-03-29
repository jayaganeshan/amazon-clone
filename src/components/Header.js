import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    //complete header
    <header>
      {/* 1/2 header */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* logo  */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* input and searchIcon */}
        <div className=" hidden sm:flex   items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md px-4 focus:outline-none "
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* order deatils and sign In */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 ">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hey, ${session.user.name}` : "SignIn"}</p>
            <p className="font-extrabold md:text-sm">Account and Lists</p>
          </div>
          <div className=" link" onClick={() => router.push("/orders  ")}>
            <p>Orders</p>
            <p className="font-extrabold md:text-sm">&returns</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className=" relative link flex items-center"
          >
            <span className="absolute  top-0 right-0 sm:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-8" />
            <p className="hidden sm:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* 2/2 header */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link"> Amazon Business</p>
        <p className="link">Today's Deal</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
