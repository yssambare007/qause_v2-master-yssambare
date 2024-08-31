import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
function SignupNavbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div className="sticky top-0 z-50 border-b-4 border-[#f5ad00] bg-[#eaeaea] px-[1.5rem] py-[1rem] xs:px-[20px] ">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between">
        <div className="relative h-[40px] w-[140px]">
          <Image
            fill
            src={Logo}
            className="mb-2 object-contain md:mb-0 lg:mb-0 xl:mb-0"
            alt="image"
          />
        </div>
        <div className="flex cursor-pointer items-center">
          <a href="tel:9119333999" className="mr-[2rem] flex items-center">
            <CallIcon sx={{ mt: "3px", fontSize: "1.3rem", mr: "5px" }} />{" "}
            <div className="hidden text-[17px] font-medium text-[#272727] sm:block">
              +91 9119333999
            </div>
          </a>
          <a
            href="mailto:support@qause.com"
            className="mr-[2rem] flex cursor-pointer items-center"
          >
            <MailIcon sx={{ mt: "3px", fontSize: "1.3rem", mr: "5px" }} />{" "}
            <div className="hidden text-[17px]  font-medium text-[#272727] sm:block">
              support@qause.com
            </div>
          </a>
          <div className="flex cursor-pointer items-center">
            <Logout sx={{ mt: "3px", fontSize: "1.3rem", mr: "5px" }} />{" "}
            <button
              onClick={logout}
              className="hidden text-[17px] font-medium text-[#272727] sm:block"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupNavbar;
