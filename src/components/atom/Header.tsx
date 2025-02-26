import AvatarIcon from "@/assets/icons/avatar.svg";
import CartIcon from "@/assets/icons/cart.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="">
      {isOpen && <div className="fixed inset-0 backdrop-blur-md z-40"></div>}

      <div className="fixed h-20 w-full max-w-[1360px] inset-0 mx-auto backdrop-blur-md z-50">
        <div className="w-full h-full py-2 flex justify-between items-center">
          <div className="flex items-center  md:space-x-4">
            <Link href={"/"} className="hidden md:flex">
              <Image src="/logo.webp" alt="Apple Logo" width={24} height={24} />
            </Link>

            <nav className="hidden md:flex space-x-6 text-xl text-gray-700">
              <Link href={"/newProduct"}>
                <span>신상품</span>
              </Link>
              <Link href={"/bestProduct"}>
                <span>베스트</span>
              </Link>
            </nav>

            <nav className={clsx("md:hidden")}>
              <MenuIcon onClick={() => setIsOpen(!isOpen)} />
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href={"/user/login"}>
              <span>로그인</span>
            </Link>

            <Link href={"/bucket"}>
              <CartIcon className="w-10 h-10" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "fixed top-12 left-0 right-0 h-1/2 bg-white z-50 origin-top transition-transform duration-500 ease-out transform",
          {
            "scale-y-0 ": !isOpen,
            "scale-y-100": isOpen,
          }
        )}
      >
        {isOpen && (
          <nav className="flex flex-col px-8 h-full space-y-6 text-lg">
            <Link href={"/"} className="text-black hover:text-gray-700">
              신상품
            </Link>
            <Link href={"/"} className="text-black hover:text-gray-700">
              베스트
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
