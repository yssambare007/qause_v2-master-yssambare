import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { getActiveCards } from "../../utils/apis/needsDash/Active";
import GetFeedbackPopup from "../feedbackCard/GetFeedbackPopup";
import LiveCard from "../needCards/LiveCard";

function Index() {
  const { data } = useQuery<any>("activeCards", getActiveCards);
  const [currentFeedbackGigId, setOpenFeedback] = useState<string | null>(null);
  const handleFeedback = useCallback((currentFeedbackGigId: string) => {
    setOpenFeedback(currentFeedbackGigId);
  }, []);

  const handleFeedbackClose = useCallback(() => {
    setOpenFeedback(null);
  }, []);
  return (
    <div className="p-8 px-10 pb-[100px]">
      <div className="mb-8 font-bold text-[#F79E09]">Feedback Awaited</div>
      <Grid container spacing={2}>
        {data &&
          data.feedbackAwaitedCards?.length > 0 &&
          data.feedbackAwaitedCards.map((item: any) => {
            return (
              <Grid item xl={4} lg={4} md={4} key={item}>
                <LiveCard
                  openFeedback={handleFeedback}
                  value={item}
                  type="feedback"
                />
              </Grid>
            );
          })}
        <GetFeedbackPopup
          currentGigId={currentFeedbackGigId}
          handleClose={handleFeedbackClose}
        />
      </Grid>
      <div className="my-8 font-bold text-[#F79E09]">Live Cards</div>
      <Grid container spacing={2}>
        {data &&
          data.liveCards?.length > 0 &&
          data.liveCards.map((item: any) => {
            return (
              <Grid item xl={4} lg={4} md={4} key={item}>
                <LiveCard value={item} type="live" />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default Index;
