import Gallery from "../../../../components/gallery/Gallery";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import { getGalleryData } from "../../../../utils/apis/gallery/Index";
import { useQuery } from "react-query";
import SeoHeadComponent from "../../../../components/common/SeoHeadComponent";
import { seoContext } from "../../../../utils/seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Index() {
  const router = useRouter();
  const { isLoading, data, refetch } = useQuery("gallery", getGalleryData);
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  return (
    <>
      <SeoHeadComponent {...seoContext.Gallery} />
      <NgoDashboardFrame>
        <>
          {isLoading && <div>Loading...</div>}
          {data && <Gallery images={data} onImageChange={refetch} />}
        </>
      </NgoDashboardFrame>
    </>
  );
}
export default Index;
