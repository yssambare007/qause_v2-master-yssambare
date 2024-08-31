import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Layout from "../../components/layouts/defaultPages/Index";
import Slider from "react-slick";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useQuery } from "react-query";
import { aboutDetails } from "../../utils/apis/details/Index";

import CircularProgress from "@mui/material/CircularProgress";
import { S3Bucket } from "../../utils/utils";
import SeoHeadComponent from "../../components/common/SeoHeadComponent";
import { seoContext } from "../../utils/seo";

const mediaCoverage: any = [
  {
    title: "Creating a Generation of Limitless Curious Minds",
    date: "28th March, 2021",
    content:
      "Qause aims to bridge that gap by hand-holding and providing them phone assistance in their regional language to bring their presence online and enable them to take donations online as well.",
    image: "28th-March,-2021-media.jpg",
    link: "https://www.theweek.in/theweek/cover/2021/03/18/lessons-in-humanity.html",
  },
  {
    title:
      "CREATING  AN ECOSYSTEM TO NURTURE THE TALENT OF UNDERPRIVILEGED KIDS ",
    date: "30th June, 2020",
    content:
      "“A nationwide project that aims to nurture the unexplored talents of these young kids. It has talent-focused online video classes for underprivileged kids. The classes have mentoring sessions for singing, dancing, taekwondo, and other art forms. <br/> Article Password: toc47",
    image: "media-creating-eco-system.jpg",
    link: "https://www.theoptimistcitizen.com/wp-content/uploads/2020/07/TOC-JUNE-2020.pdf",
  },
  {
    title:
      "An Entrepreneur’s Passion of Accelerating a Social Change Through Technology ",
    date: "24th September, 2020",
    content:
      "Idea is to bridge the gap between donors and NGOs, to build a community which has its foundations on aspirations, positivity, and compassion and bring the passion back into learning for less-fortunate kids with our initiative PassionGuru.",
    image: "media-higher-education.jpg",
    link: "https://www.highereducationdigest.com/an-entrepreneurs-passion-of-accelerating-a-social-change-through-technology/",
  },
  {
    title:
      "There’s only one thing more colorful than art. Their dreams. PassionGuru is here to give wings to their dreams.",
    date: "4th November, 2020",
    content:
      "Every evening between 4-6 pm, up to a 1000 children around the country in various orphanages, shelter homes and slum clusters gather around small screens and pay rapt attention to the day's lesson in dance, theatre, taekwondo and other art forms.",
    image: "media-4nov-2020.jpg",
    link: "https://www.newindianexpress.com/cities/delhi/2020/nov/04/this-delhi-based-platform-offers-online-passion-based-classes-for-ngo-kids-2218960.html",
  },
  {
    title:
      "The Financial Express - NGOs in India need more visibility, better representation: Avneesh Chhabra, founder, Qause",
    date: "30th November 2020",
    content:
      "Qause aims to bridge that gap by hand-holding and providing them phone assistance in their regional language to bring their presence online and enable them to take donations online as well.",
    image: "thefinancial-express.jpg",
    link: "https://www.financialexpress.com/education-2/ngos-in-india-need-more-visibility-better-representation-avneesh-chhabra-founder-qause/2139492/",
  },
  {
    title: "Creating a Generation of Limitless Curious Minds",
    date: "28th March, 2021",
    content:
      "Qause aims to bridge that gap by hand-holding and providing them phone assistance in their regional language to bring their presence online and enable them to take donations online as well.",
    image: "28th-March,-2021-media.jpg",
    link: "https://www.theweek.in/theweek/cover/2021/03/18/lessons-in-humanity.html",
  },
  {
    title:
      "CREATING  AN ECOSYSTEM TO NURTURE THE TALENT OF UNDERPRIVILEGED KIDS ",
    date: "30th June, 2020",
    content:
      "“A nationwide project that aims to nurture the unexplored talents of these young kids. It has talent-focused online video classes for underprivileged kids. The classes have mentoring sessions for singing, dancing, taekwondo, and other art forms. <br/> Article Password: toc47",
    image: "media-creating-eco-system.jpg",
    link: "https://www.theoptimistcitizen.com/wp-content/uploads/2020/07/TOC-JUNE-2020.pdf",
  },
];

function NextArrow(props: any) {
  const { style, className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        right: "-5px",
        fontSize: "2.2em",
        color: "black",
        display: "flex",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <ChevronRightRoundedIcon
        className="relative rounded-full border border-[rgba(178,193,205,0.64)]"
        fontSize="inherit"
      />
    </div>
  );
}

function PrevArrow(props: any) {
  const { style, className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        fontSize: "2.2em",
        color: "black",
        left: "-55px",
        display: "flex",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <ChevronLeftRoundedIcon
        className="relative rounded-full border border-[rgba(178,193,205,0.64)]"
        fontSize="inherit"
      />
    </div>
  );
}


function About() {
  const { data } = useQuery<any>("about", aboutDetails);

  console.log(data);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderSettings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }

    }],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slider = useRef<Slider | null>(null);
  return (
    <>
      <SeoHeadComponent {...seoContext.About} />
      <Layout className="mb-72" >
        {data ? (
          <>
            {data.aboutSlider && (
              <section className="mx-auto sm:my-[1rem] sm:mb-0 sm:px-6 md:container md:my-[4.4rem] lg:px-11 xl:max-w-screen-xl xl:px-16">
                <Grid
                  container
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                >
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    paddingX={{ xl: 3, lg: 2, md: 1, sm: 2, xs: 2 }}
                  >
                    <h1
                      dangerouslySetInnerHTML={{ __html: data.aboutSlider.title }}
                      className="my-[5.6rem] text-[2.4rem] xs:text-[2rem] font-extrabold leading-tight text-[#253dc0] lg:text-[2.75rem]"
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    className="relative"
                    padding={{ xl: 5, lg: 3, md: 5, sm: 5, xs: 2 }}
                  >
                    <Image
                      unoptimized
                      src={`${S3Bucket}about/${data.aboutSlider.image}`}
                      alt="About Slider"
                      width={"640"}
                      height={0}
                    />
                  </Grid>
                </Grid>
              </section>
            )}

            <section className="my-[4.4rem] xs:my-[1rem] mx-auto sm:my-2 sm:px-6 md:container lg:px-11 xl:max-w-screen-xl xl:px-16">
              {data.goodThings && (
                <Grid
                  container
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                >
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    paddingX={{ xl: 3, lg: 2, md: 1, sm: 2, xs: 2 }}
                  >
                    <div className="text-center xs:text-[1.1rem] xs:mb-12 sm:mb-12 sm:w-full md:max-w-[75%] md:text-left lg:text-[1.05rem]">
                      {data.goodThings.first}
                    </div>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    paddingX={{ xl: 2, lg: 2, md: 1, sm: 2, xs: 2 }}
                  >
                    <div className="text-center text-[2.4rem] xs:text-[2.25rem] font-extrabold leading-tight text-[#f7a212] sm:text-[2.2rem] md:pt-6 md:text-left lg:pt-5 lg:text-[2.75rem]">
                      {data.goodThings.second}
                    </div>
                  </Grid>
                </Grid>
              )}
              {data.howBegin.length > 0 && (
                <>
                  <Grid
                    container
                    className="relative mt-24 xs:mt-44"
                    flexDirection={"row"}
                  >
                    <Grid
                      item
                      paddingX={{ lg: 2, md: 1, sm: 2, xs: 2 }}
                      md={12}
                      lg={10}
                      xl={10}
                      sm={12}
                      xs={12}
                      marginLeft={"auto"}
                    >
                      <div className="z-10 h-[400px] xs:h-auto overflow-y-auto rounded-[10px] bg-[#f7a212] text-white xs:overflow-visible">
                        <div className="absolute -left-[10%] -top-[90px] z-20 h-[95%] w-[490px] xs:w-full xs:h-[270px] xs:-top-[10.5rem] xs:relative xs:left-0 xl:left-[90px]">
                          <Image
                            src={`${S3Bucket}about/${data.howBegin[0].image}`}
                            fill
                            alt="good-thing"
                          />
                        </div>
                        <div className="ps-0 ml-auto mt-0 px-0 pt-[50px] pb-[20px] pr-[30px] xs:p-[15px] text-center sm:max-w-[300px] md:max-w-[300px] lg:max-w-[490px] xl:max-w-[605px] xs:-mt-[185px]">
                          <h3 className="pb-[25px] text-left font-semibold xs:text-center sm:text-[1.95rem] xs:text-[1.8rem] sm:leading-tight xl:text-[2.2rem]">
                            {data.howBegin[0].title}
                          </h3>
                          <p className="mb-2.5 text-justify leading-normal sm:text-left sm:text-[0.85rem] xs:text-center xs:text-[0.78rem] sm:leading-normal xs:leading-7 xl:text-[0.975rem]">
                            {data.howBegin[0].title2}
                          </p>
                          <p className="mb-2.5 text-justify leading-normal sm:text-left sm:text-[0.85rem] xs:text-center xs:text-[0.78rem] sm:leading-normal xs:leading-7 xl:text-[0.975rem]">
                            {data.howBegin[0].title3}
                          </p>
                          <p className="mb-2.5 text-justify leading-normal sm:text-left sm:text-[0.85rem] xs:text-center xs:text-[0.78rem] sm:leading-normal xs:leading-7 xl:text-[0.975rem]">
                            {data.howBegin[0].content}
                          </p>
                          <p className="mb-2.5 text-justify leading-normal sm:text-left sm:text-[0.85rem] xs:text-center xs:text-[0.78rem] sm:leading-normal xs:leading-7 xl:text-[0.975rem]">
                            {data.howBegin[0].title4}
                          </p>
                          <p className="mb-2.5 text-justify leading-normal sm:text-left sm:text-[0.85rem] xs:text-center xs:text-[0.78rem] sm:leading-normal xs:leading-7 xl:text-[0.975rem]">
                            {data.howBegin[0].content2}
                          </p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className="relative mt-24"
                    flexDirection={"row"}
                  >
                    <Grid
                      item
                      paddingX={{ lg: 2, md: 1, sm: 2, xs: 2 }}
                      md={12}
                      lg={10}
                      xl={10}
                      sm={12}
                      xs={12}
                      width={"100%"}
                      sx={{ mr: "auto" }}
                    >

                      <div className="z-10 h-[400px] xs:mt-24 xs:h-auto overflow-y-auto rounded-[10px] bg-[#253dc0] text-white xs:overflow-visible">
                        <div className="absolute xl:bottom-0 md:h-[60%] xl:h-[80%] xs:w-full xs:h-[180px] xs:-top-[4.5rem] sm:h-[50%] sm:w-[400px] sm:-left-10 sm:-bottom-2 xs:relative xs:left-0 xl:-left-[58px] z-20 xl:w-[470px]">
                          <Image
                            className="md:hidden sm:hidden xl:block xs:hidden"
                            src={`${S3Bucket}about/${data.howBegin[1].image}`}
                            fill
                            alt="good-thing"
                          />
                          <Image
                            className="md:block sm:block xs:block xl:hidden"
                            src={`${S3Bucket}about/${data.howBegin[1].imageRes}`}
                            fill
                            alt="good-thing-2"
                          />
                        </div>
                        <div className="ps-0 ml-auto mt-0 px-0 pb-[20px] pt-[50px] pr-[30px] xs:p-[15px] xs:-mt-[70px] text-left text-[0.95rem] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[415px]">
                          <h3 className="pb-[35px] font-bold leading-tight xs:text-[1.78rem] xs:text-center sm:text-[1.95rem] xl:text-[2.2rem]">
                            {data.howBegin[1].title}
                          </h3>

                          <p className="mb-2.5 text-justify xs:leading-7 sm:text-[0.85rem] xs:text-[0.78rem] xs:text-center xl:text-[0.975rem]">
                            {data.howBegin[1].content}
                          </p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </>
              )}
            </section>
            {data.whoBenefit && (
              <section className="my-[4.8rem] xs:my-[3rem] mx-auto lg:px-11 xl:max-w-screen-xl xl:px-16">
                <header className="text-center text-[1.4rem] xs:text-[1.1rem] font-semibold uppercase text-[#253dc0]">
                  <h3>{data.whoBenefit.title}</h3>
                </header>
                <div className="h-[40px]"></div>
              </section>
            )}

            <section className="mx-auto py-[4.4rem]">
              <header className="mb-[50px] flex items-center whitespace-nowrap text-center text-[2.15rem] xs:text-[1.8rem] font-bold capitalize text-[#253dc0] before:mr-[10px] before:block before:h-[1px] before:w-[50%] before:bg-[#e1e1e1] after:ml-[10px] after:block after:h-[1px] after:w-[50%] after:bg-[#e1e1e1]">
                <h3>Media Coverage</h3>
              </header>
              <section className="mx-auto sm:px-6 xs:px-4 md:container lg:px-11 xl:max-w-[1235px] xl:px-16">
                <Slider ref={slider} {...sliderSettings}>
                  {mediaCoverage.map((element: any) => (
                    <Grid
                      container
                      key={element}
                      flexDirection={"row"}
                      sx={{ display: "flex !important" }}
                      alignItems="start"
                      className="max-h-[670px] xs:max-h-[700px] bg-[#f8f8f8]"
                    >
                      <Grid
                        item
                        xl={6}
                        lg={6}
                        sm={6}
                        sx={{ width: "100%" }}

                        padding={{ xl: 6, lg: 3, md: 6, sm: 4, xs: 4 }}
                        paddingX={{ xl: 4, lg: 4, md: 4, sm: 2, xs: 2 }}

                        className="relative h-full overflow-hidden xl:pr-12 xs:pb-4 rounded-r-[10px] border-r border-r-[#eee]"
                      >
                        <Image
                          src={`${S3Bucket}home/${element.image}`}
                          width={576}
                          height={0}
                          alt="media-4nov-2020"
                        />
                      </Grid>
                      <Grid
                        item
                        xl={6}
                        lg={6}
                        sm={6}
                        xs={12}
                        flexDirection="column"
                        justifyContent={"center"}
                        alignItems="center"
                        padding={{ xl: 6, lg: 3, md: 6, sm: 4, xs: 1 }}
                        paddingLeft={{ xl: 6, lg: 3, md: 6, sm: 0, xs: 2 }}
                        sx={{
                          maxWidth: "520px !important",
                          height: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <div className="h-full font-bold leading-tight text-[#253dc0] sm:text-[1.5rem] md:text-[1.6rem] xs:text-[1.3rem] xl:text-[1.6rem]">
                          <h3 className="mb-2.5">
                            {element.title}
                          </h3>
                          <span>{element.date}</span>
                          <hr className="border-black sm:my-7 md:my-[40px] xs:my-[25px] xl:my-[40px]" />
                          <p className="font-normal text-black sm:text-[0.85rem] xs:text-[0.78rem] xs:leading-normal sm:leading-normal md:text-[0.925rem] xl:text-[0.925rem] xl:leading-relaxed">
                            {element.content}
                          </p>
                          <div className="mt-[50px] xs:my-5 xs:text-[0.72rem] text-base font-extrabold text-[#f7a212] sm:text-[0.85rem] xl:text-[0.925rem]">
                            <Link target={"_blank"} href={element.link}>Read Full Article</Link>
                          </div>
                        </div>
                        <div></div>
                      </Grid>
                    </Grid>
                  ))}
                </Slider>

                <div className="my-10 flex-row justify-center gap-0 fill-[#f7a212] xs:hidden sm:hidden xl:flex">
                  <button onClick={() => slider?.current?.slickPrev()}>
                    <svg
                      className="w-[38px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                  </button>

                  <button onClick={() => slider?.current?.slickNext()}>
                    <svg
                      className="w-[38px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                  </button>
                </div>
              </section>
            </section>

            {data.ourFounder && (
              <section className="my-[4.4rem] xs:my-[2rem] mx-auto sm:px-6 md:container lg:px-11 xl:max-w-screen-xl xl:px-16">
                <Grid container alignItems={"start"}>
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    sm={6}
                    alignItems="start"
                    paddingX={{ xl: 5, lg: 2, md: 5, sm: 5, xs: 2 }}
                  >
                    <div className="h-full">
                      <Image
                        src={`${S3Bucket}about/${data.ourFounder.image}`}
                        width={500}
                        height={0}
                        alt="our-founder"
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    sm={6}
                    paddingX={{ xl: 3, lg: 2, md: 3, sm: 2, xs: 2 }}
                  >
                    <div className="my-[4.4rem] xs:my-[3rem] xs:text-center">
                      <h4 className="mb-8 xs:mb-4 font-extrabold xl:text-[1.1rem">
                        {data.ourFounder.title}
                      </h4>
                      <h1 className="mb-3 font-bold text-[#253dc0] sm:text-[2.35rem] xs:text-[1.8rem] xl:text-[2.7rem]">
                        {data.ourFounder.name}
                      </h1>
                      <p className="font-bold text-[#f7a212] xs:text-[0.875rem] sm:text-[0.875rem] xl:text-[0.95rem]">
                        {data.ourFounder.designation}
                      </p>
                      <hr className="my-10 xs:my-5" />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data.ourFounder.about,
                        }}
                        className="mb-10 xs:mb-5 xs:text-[0.75rem] sm:text-[0.75rem] xl:text-[0.85rem]"
                      />
                    </div>
                    <div className="text-[1.8rem] xs:text-center text-[#253dc1]">
                      <span className="mr-10">
                        <Link href={data.ourFounder.instagram}>
                          <InstagramIcon fontSize="inherit" />
                        </Link>
                      </span>
                      <span>
                        <Link href={data.ourFounder.linkedin}>
                          <LinkedInIcon fontSize="inherit" />
                        </Link>
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </section>
            )}
            {data.team && (
              <section className="my-[8.3rem] xs:my-[4rem] mx-auto md:container xs:px-4 lg:px-11 xl:max-w-screen-xl xl:px-16">
                <div className="mx-auto max-w-[500px] text-center text-[#253dc0]">
                  <h3 className="text-[1.9rem] xs:text-[1.6rem] font-extrabold">
                    {data.team.title}
                  </h3>
                  <p className="mt-1 text-[0.91rem] xs:text-[0.75rem] leading-snug text-black">
                    We are a team of changemakers who believe in putting
                    collaborative efforts to bring in the positive change that we
                    want to see in the world.
                  </p>
                </div>
                <div className="my-[6.5rem] xs:my-5 mb-0 px-16">
                  {data.team.teamMembers.length > 0 && (
                    <Slider {...sliderSettings2}>
                      {data.team.teamMembers.map((element: any) => (
                        <Grid
                          paddingX={{ xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                          xl={4}
                          key={element}
                          item
                        >
                          <div className="flex flex-col p-[10px] text-center">
                            <div className="border border-[#f7a212] px-[20px]">
                              <Image
                                width={267}
                                height={0}
                                src={`${S3Bucket}about/${element.image}`}
                                alt="vinay"
                              />
                            </div>
                            <div className="relative bottom-5 mb-1 rounded-[40px] bg-[#f7a212] px-[10px] py-[8px] text-[1.15rem] font-bold text-white">
                              <span>{element.name}</span>
                            </div>
                            <div className="mb-4 text-[1.15rem] font-bold text-[rgb(24,24,24)]">
                              <span>{element.designation}</span>
                            </div>
                            <div className="text=[#181818] mb-1 text-justify  text-[0.825rem]">
                              <span>{element.shortDesc}</span>
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </Slider>
                  )}
                </div>
              </section>
            )}

            <section className="border border-[#707070] p-[10px]">
              <div className="bg-[#0ECEDD] bg-[url(/images/passionguru.svg)] bg-cover sm:py-12 lg:py-8 xl:py-[50px]">
                <Grid
                  container
                  flexDirection={"row"}
                  alignItems="center"
                  paddingX={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 4 }}
                >
                  <Grid item xl={7} sm={7} lg={7} paddingTop={{ xs: 3 }} className="!xs:flex !xs:items-center xs:flex-col">
                    <h2 className="font-bold leading-tight xs:text-center text-white xs:text-[1.6rem] sm:text-[2.25rem] xl:text-[2.5rem]">
                      Giving free online classes to help the less fortunate kids
                      discover their passion.
                    </h2>
                    <p className="my-7 xs:mt-6 text-[1.6rem] xs:text-[1.3rem] text-[#141414] xs:text-center">
                      Get a glimpse of smiling faces learning what they love!{" "}
                    </p>
                    <div className="mt-8 xs:mt-0 w-fit rounded-[4px] xs:text-[1.3rem] bg-[#F2F2F2] py-[10px] px-[30px] text-[1.6rem] font-bold text-[#302F2F]">
                      <Link href="#">Learn more</Link>
                    </div>
                  </Grid>
                  <Grid item xl={5} lg={5} sm={5}>
                    <div className="relative xs:my-8">
                      <Image
                        src={"/images/passionguru-videoimg.svg"}
                        height={0}
                        width={700}
                        alt="videoimg"
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </section>
          </>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </Layout>
    </>

  );
}

export default About;
