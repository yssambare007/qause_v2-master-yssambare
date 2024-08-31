import { useState } from "react";
import Box from "@mui/material/Box";
import logo from "../../../public/images/logo.png";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import LoginSignModal from "../loginSignUpModal/LoginSignModal";
import { myProfileLinks } from "../../constants/constants";
import { useRouter } from "next/router";
const style = {
  position: "absolute",
  top: "0px",
  left: "0px",
  width: 300,
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function Sidebar(props: any) {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Modal
        open={props.state}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="flex border-b-2 border-b-gray-200 pb-3">
              <CloseIcon
                sx={{ fontSize: "3rem", mr: "10px", color: "#002DC9" }}
                onClick={props.onClose}
              />
              <Image
                src={logo}
                width={130}
                alt="logo"
                className="mr-8 cursor-pointer"
              />
            </div>
          </div>
          <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
            <Link href={"/"}>Home</Link>
          </div>
          <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
            <Link
              href="/about"
              className="border-b-2 border-b-gray-200 py-3 text-[20px]"
            >
              About Us
            </Link>
          </div>
          <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
            <Link
              href="#"
              className="border-b-2 border-b-gray-200 py-3 text-[20px]"
            >
              Blogs
            </Link>
          </div>
          <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
            <Link
              href="#"
              className="border-b-2 border-b-gray-200 py-3 text-[20px]"
            >
              Volunteer Now
            </Link>
          </div>
          {!props.data && (
            <>
              <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
                <button
                  onClick={() => {
                    setLoginModal(true);
                    props.onClose();
                  }}
                  className="mr-4 w-[45%] rounded-md border border-[#002DC9] px-[15px] py-[5px] text-[#002DC9]"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setSignUpModal(true);
                    props.onClose();
                  }}
                  className="w-[45%] rounded-md border border-[#002DC9] bg-[#002DC9] px-[15px] py-[5px] text-white"
                >
                  Sign up
                </button>
              </div>
            </>
          )}
          {props.data && (
            <>
              <Link href="/ngobackend/dashboard">
                <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
                  My Dashboard
                </div>
              </Link>
              <Link href="/ngobackend/profile">
                <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
                  My Profile
                </div>
                <div className="flex flex-col pl-[.7rem]">
                  {Object.entries(myProfileLinks).map(([name, secPath]) => (
                    <Link
                      key={name}
                      className={` 
                  border-b-2 border-b-gray-200 py-3 text-[17px] text-black`}
                      href={`${secPath.secPath}`}
                    >
                      {secPath.name}
                    </Link>
                  ))}
                </div>
              </Link>
              <Link href="/ngobackend/needs/dashboard">
                <div className="border-b-2 border-b-gray-200 py-3 text-[20px]">
                  My Needs
                </div>
              </Link>
            </>
          )}
        </Box>
      </Modal>
      {loginModal && (
        <LoginSignModal
          title="Login As"
          HandleFunction={setLoginModal}
        ></LoginSignModal>
      )}
      {signUpModal && (
        <LoginSignModal
          title="Join Us"
          HandleFunction={setSignUpModal}
          isSignUp={true}
        ></LoginSignModal>
      )}
    </div>
  );
}
