import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";
import NGOUploadDetails from "../../../../components/ngoBackend/profile/UploadDetails";

const Index = () => {

  return (
    <NgoDashboardFrame>
      <DetailsFrame>
        <NGOUploadDetails kyc={true} />
      </DetailsFrame>
    </NgoDashboardFrame>
  );
};

export default Index;
