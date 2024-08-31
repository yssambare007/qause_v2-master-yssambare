/* eslint-disable @next/next/no-img-element */
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CopyrightIcon from "@mui/icons-material/Copyright";

interface FooterProps {
  className?: string;
}
function Footer(props: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <Box
      className={`relative pt-8 lg:h-auto xl:h-[500px] ${props.className}`}
      sx={{ width: "100%" }}
    >
      <div className="flex justify-end xs:justify-center">
        <Image
          width="1246"
          height="592"
          src="/images/footer-children-img.png"
          alt="Footer Children"
        />
      </div>

      <div className="relative bottom-16 flex h-full justify-start xl:bottom-64">
        <Box
          className="rounded-tr-[40px] p-[1.1rem] py-9 md:w-full lg:w-[81.25%]"
          sx={{ backgroundColor: "#253dc0" }}
        >
          <Grid container className="gap-y-12">
            <Grid
              item
              md={6}
              xs={6}
              lg={4}
              direction={"column"}
              className="flex gap-14 px-3"
            >
              <div className="flex flex-col gap-5">
                <p className="text-sm text-white">Email Us</p>
                <div className="text-sm text-[#f7a212]">
                  <Link href="mailto:support@qause.com">support@qause.com</Link>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-sm text-white">Address</p>
                <div className="text-xs font-light leading-[1.7] text-white">
                  <p>Mindism Tech Pvt. Ltd.</p>
                  <p>30, Arjun Marg, DLF Phase-1, Gurgaon, Haryana.</p>
                </div>
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={6}
              lg={4}
              direction={"column"}
              className="flex gap-14 px-3"
            >
              <div className="flex flex-col gap-5">
                <p className="text-sm text-white">Follow Us</p>
                <ul className="flex cursor-pointer flex-row gap-5">
                  <Link href="/">
                    <li
                      style={{
                        backgroundPositionX: "0",
                        transition: "0.3s linear all",
                      }}
                      className="h-5 w-6 bg-[url('/images/footer-social-icon.png')] bg-no-repeat hover:bg-[center_bottom_0]"
                    ></li>
                  </Link>
                  <Link href="/">
                    <li
                      className="h-5 w-6 bg-[url('/images/footer-social-icon.png')] bg-no-repeat hover:bg-[center_bottom_0]"
                      style={{
                        backgroundPositionX: "-48px",
                        transition: "0.3s linear all",
                      }}
                    ></li>
                  </Link>
                  <Link href="/">
                    <li
                      className="h-5 w-6 bg-[url('/images/footer-social-icon.png')] bg-no-repeat hover:bg-[center_bottom_0]"
                      style={{
                        backgroundPositionX: "-97px",
                        transition: "0.3s linear all",
                      }}
                    ></li>
                  </Link>
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-sm text-white">Quick Links</p>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">Home</Link>
                </div>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">About Us</Link>
                </div>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">Blogs</Link>
                </div>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">Grants</Link>
                </div>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">Frequently Asked Questions</Link>
                </div>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">Privacy Policy</Link>
                </div>
                <div className="text-sm text-[#f7a212]">
                  <Link href="/">Terms & Conditions</Link>
                </div>
              </div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              lg={4}
              direction={{ lg: "column" }}
              className="flex flex-wrap items-center gap-14 px-3 xl:flex-nowrap xl:items-start"
            >
              <div className="w-2/4 flex-1 gap-5 xl:w-auto xl:flex-none">
                <Image
                  width={150}
                  height={0}
                  src="/images/footer-logo.png"
                  alt="Footer Children"
                />
              </div>
              <div className="w-2/4 gap-5 xl:w-auto xl:pr-[4.8rem]">
                <p className="text-xs font-light leading-5  text-white">
                  Qause aims to strengthen the social sector by providing a
                  digital experience to non profits volunteers and donors. Our
                  vision is to give digital experience to nonprofits to help
                  them access ample volunteer talent and raise funds for their
                  causes. We serve with passion!
                </p>
              </div>
              <div className="flex h-auto w-full flex-col justify-center gap-5 pr-[5.5rem] xl:h-full xl:w-auto">
                <p className="flex items-center text-sm font-bold text-[#6d84ff]">
                  <CopyrightIcon sx={{ fontSize: "16px" }} />
                  {year} - Qause India
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default Footer;
