import { Alert, CircularProgress, Grid, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type {
  ExtendCardType,
  FulfilledCardType,
} from "../../services/types/needs";
import { getHistoryCards } from "../../utils/apis/needsDash/Active";
import ExtendCard from "../needCards/ExtendCard";
import FulfilledCard from "../needCards/FulfilledCard";
import { useCallback, useState } from "react";
import YouSureModal from "../common/YouSureModal";
import { extendNeed } from "../../utils/apis/needs/Index";
import QauseDoIt from "./QauseDoIt";

const NeedsHistory = () => {
  const { data, status, error, refetch } = useQuery<{
    extendCards: ExtendCardType[];
    fulfilledCards: FulfilledCardType[];
  }>("historyCards", getHistoryCards);

  const { mutate: extendNeedCard } = useMutation(extendNeed, {
    onError: (error) => {
      setMessage({
        msg: error + "",
        severity: "error",
        show: true,
      });
      setShowExtendCard({
        gigId: null,
        showConfirmation: false,
      });
    },
    onSuccess: () => {
      setMessage({
        msg: "Need has been extended successfully.",
        severity: "success",
        show: true,
      });
      setShowExtendCard({
        gigId: null,
        showConfirmation: false,
      });
      refetch();
    },
  });

  const [showExtendCard, setShowExtendCard] = useState<{
    gigId: string | null;
    showConfirmation: boolean;
  }>({
    gigId: null,
    showConfirmation: false,
  });

  const [showLetQauseDoIt, setLetQauseDoIt] = useState<{
    gigId: string | null;
    open: boolean;
  }>({
    gigId: null,
    open: false,
  });

  const [message, setMessage] = useState<{
    show: boolean;
    msg: string;
    severity: "error" | "info" | "warning" | "success";
  }>({
    msg: "",
    show: false,
    severity: "info",
  });

  const handleExtendCard = useCallback((gigId: string) => {
    setShowExtendCard((prev) =>
      prev.gigId
        ? prev
        : {
            gigId: gigId,
            showConfirmation: true,
          }
    );
  }, []);

  const handleLetQauseDoit = useCallback((gigId: string) => {
    setLetQauseDoIt({ gigId: gigId, open: true });
  }, []);

  const handleCloseQauseDoit = useCallback(() => {
    setLetQauseDoIt({
      gigId: null,
      open: false,
    });
  }, []);

  const handleLetQauseDoItSuccess = useCallback(() => {
    setLetQauseDoIt({
      gigId: null,
      open: false,
    });
    setMessage({
      msg: "Request Created Successfully",
      show: true,
      severity: "success",
    });
  }, []);

  const handleCloseMessage = useCallback(() => {
    setMessage((prev) => ({ ...prev, show: false }));
  }, []);

  const cancelExtendCard = useCallback(() => {
    setShowExtendCard({
      gigId: null,
      showConfirmation: false,
    });
  }, []);

  const extendTheCard = useCallback(() => {
    if (showExtendCard.gigId) extendNeedCard(showExtendCard.gigId);
    setShowExtendCard((prev) => ({ ...prev, showConfirmation: false }));
  }, [extendNeedCard, showExtendCard.gigId]);

  if (status == "loading") {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <CircularProgress />
      </div>
    );
  } else if (status != "success") {
    return <div className="text-red-600">Error : {error + ""}</div>;
  }

  return (
    <div className="p-8 px-10 pb-[100px]">
      <div className="mb-8 font-bold text-qause-yellow">Extends Cards</div>
      <Grid container rowSpacing={4}>
        {data.extendCards?.length > 0 ? (
          data.extendCards.map((card) => {
            return (
              <Grid item xl={4} lg={4} md={6} xs={12} key={card._id}>
                <ExtendCard
                  onQauseDoIt={handleLetQauseDoit}
                  onExtendCard={handleExtendCard}
                  data={card}
                />
              </Grid>
            );
          })
        ) : (
          <div className="my-4">No Gigs found</div>
        )}
      </Grid>
      <div className="my-8 font-bold text-qause-yellow">Fulfilled</div>

      {data.fulfilledCards?.length > 0 ? (
        <Slider
          arrows={true}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          nextArrow={
            <div>
              <div
                style={{
                  top: "-50%",
                  left: -10,
                  position: "relative",
                }}
              >
                <ArrowForwardIosIcon className="!h-10 !w-10 rounded-full border-2 border-solid border-gray-200 pl-2 pr-2 text-[#f79e09]" />
              </div>
            </div>
          }
          prevArrow={
            <div>
              <div
                style={{
                  top: "-50%",
                  left: -10,
                  position: "relative",
                }}
              >
                <ArrowBackIosIcon className="!h-10 !w-10 rounded-full border-2 border-solid border-gray-200 pl-3 pr-1 text-[#f79e09]" />
              </div>
            </div>
          }
          dots={false}
          slidesToShow={3}
          slidesToScroll={3}
          infinite={false}
          speed={500}
        >
          {data.fulfilledCards.map((card) => {
            return (
              <div key={card._id}>
                <FulfilledCard data={card} />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="my-4">No Gigs found</div>
      )}
      <QauseDoIt
        askSupport={false}
        open={showLetQauseDoIt.open}
        gigId={showLetQauseDoIt.gigId || ""}
        handleClose={handleCloseQauseDoit}
        onSuccess={handleLetQauseDoItSuccess}
      />
      <YouSureModal
        open={showExtendCard.showConfirmation}
        handleClose={cancelExtendCard}
        handleYes={extendTheCard}
      />
      <Snackbar
        open={message.show}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alert
          onClose={handleCloseMessage}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NeedsHistory;
