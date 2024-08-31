import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import NeedPreviewCard from "./NeedPreviewCard";
import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
import { useMutation } from "react-query";
import { cancelNeed } from "../../utils/apis/needs/Index";

function ConfirmNeedCardCancellation({
  handleClose,
  cancelNeedCard,
  card,
}: any) {
  return (
    <>
      <div className="text-center text-qause-blue-dark">
        This will cancel your need card and no volunteer will be able to see
        your need request.
      </div>
      <div className="flex w-full justify-between px-4 py-2">
        <div className="w-1/4">
          <NeedPreviewCard card={card} />
        </div>
        <div className="flex h-full w-2/4 flex-col justify-between gap-y-20">
          <div className="px-5 text-center text-lg text-qause-yellow-light">
            Also, the credits once deducted will not be refunded
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="text-medium text-center text-qause-blue-dark">
              Are you sure you want to cancel your need card?
            </div>
            <Stack justifyContent="center" direction="row" spacing={2}>
              <Button
                sx={{ textTransform: "none" }}
                className="transform-none border-gray-600 text-qause-yellow"
                variant="outlined"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                className="border-gray-600 text-qause-yellow"
                variant="outlined"
                onClick={cancelNeedCard}
              >
                Yes
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

function CancelledNeedCard({ card, handleClose }: any) {
  const cancelledStatus = { label: "Cancelled", color: "#F14444" };

  return (
    <>
      <div className="flex flex-col items-center gap-y-8">
        <NeedPreviewCard card={{ ...card, status: cancelledStatus }} />
        <div className="flex w-full flex-col items-center justify-center gap-y-1">
          <div className="w-full text-center text-sm">
            Hey! Your Need Card has been cancelled.
          </div>
          <div className="w-full text-center text-sm">
            There are experienced volunteers waiting to serve your needs. Get in
            touch with them by adding new Need Cards.
          </div>
          <Link href={END_POINTS.NEEDS}>
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              className="my-2 bg-qause-yellow-light text-white shadow-none hover:bg-qause-yellow-light"
            >
              Add New Need Card
            </Button>
          </Link>
          <Button
            sx={{ textTransform: "none" }}
            variant="text"
            className="text-qause-blue-dark"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
}

interface StatusProps {
  label: string;
  color: string;
}

interface Props {
  show: boolean;
  onClose: any;
  card: any;
  status?: StatusProps;
}

export default function CancelNeedCardModal(props: Props) {
  const { show, onClose, card, status } = props;
  const mutation = useMutation(() => cancelNeed(card._id), {
    onSuccess: (data, variables, context) => {
      if (data.success) {
        setCancelled(true);
      }
    },
  });
  const [cancelled, setCancelled] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };
  const handleClose = useCallback(() => {
    setCancelled(false);
    onClose();
  }, [cancelled]);

  const cancelNeedCard = useCallback(() => mutation.mutate(), [mutation]);

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-cancelNeedCard"
      aria-describedby="modal-modal-cancelNeedCard"
    >
      <Box
        sx={style}
        className="active rounded-xl bg-white active:outline-none xs:w-full md:w-[750px]"
      >
        <div className="flex items-center justify-end">
          <button
            className="rounded-tr-xl bg-black text-white"
            onClick={handleClose}
          >
            <ClearIcon />
          </button>
        </div>
        <div
          key="content"
          className="flex max-h-[90vh] flex-col items-center gap-y-3 overflow-y-auto p-8"
        >
          {!cancelled ? (
            <div className="w-full">
              <ConfirmNeedCardCancellation
                handleClose={handleClose}
                cancelNeedCard={cancelNeedCard}
                card={{ ...card, status }}
              />
            </div>
          ) : (
            <div className="min-w-[45%]">
              <CancelledNeedCard
                handleClose={handleClose}
                card={{ ...card, status }}
              />
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}
