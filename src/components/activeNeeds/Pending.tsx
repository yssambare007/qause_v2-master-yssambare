import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { getPendingCards } from "../../utils/apis/needsDash/Active";
import LiveCard from "../needCards/LiveCard";

function Pending() {
  const { data } = useQuery<any>("pendingCards", getPendingCards);
  return (
    <div className="p-8 px-10 pb-[100px]">
      <div className="mb-8 font-bold text-[#F79E09]">Pending for Approval</div>
      <Grid container spacing={2}>
        {data &&
          data.data?.length > 0 &&
          data.data.map((item: any) => {
            return (
              <Grid item xl={4} lg={4} md={4} key={item}>
                <LiveCard value={item} type="pending" />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default Pending;
