import { type NextPage } from "next";
import Layout from "../components/layouts/defaultPages/Index";
import ForNonProfitsSection from "../components/home/ForNonProfitsSection";
import ForVolunteersSection from "../components/home/ForVolunteersSection";
import ForDonorsSection from "../components/home/ForDonorsSection";
import ForCorporatesSection from "../components/home/ForCorporatesSection";
import IntroCard from "../components/home/IntroCard";
import SeoHeadComponent from "../components/common/SeoHeadComponent";
import { seoContext } from "../utils/seo";

const Home: NextPage = () => {
  return (
    <>
      <SeoHeadComponent {...seoContext.landing}></SeoHeadComponent>
      <Layout className="flex min-h-screen flex-col">
        <IntroCard />
        <ForNonProfitsSection />
        <ForVolunteersSection />
        <ForDonorsSection />
        <ForCorporatesSection />
      </Layout>
    </>
  );
};

export default Home;
