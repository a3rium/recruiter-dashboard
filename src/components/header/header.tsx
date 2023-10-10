import Image from "next/image";
import { UserNav } from "../user-nav/user-nav";
const Header = () => {
  return (
    <header className="ml-20 flex h-20 w-auto flex-row bg-secondary">
      <Image
        className="px-5"
        src={"/logo-swan.svg"}
        alt="Swan Logo"
        width={250}
        height={80}
        priority
      />
      <h1 className="flex items-center p-4 text-3xl font-bold text-primary">
        Recruiter Dashboard
      </h1>
      <div className="ml-auto flex items-center px-4">
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
