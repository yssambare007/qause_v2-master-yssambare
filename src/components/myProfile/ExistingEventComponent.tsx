import { useState } from "react";
import YouSureModal from "../common/YouSureModal";
import { base_url } from "../../utils/utils";
import { useRouter } from "next/router";
import { TOKEN } from "../../constants/constants";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import { fetchEventRequest } from "../../utils/apis/event/Index";
import { useQuery } from "react-query";
import ViewStories from "../ngoBackend/ViewStories";
interface Props {
  onClickEvent: (event: any) => void;
  Events?: any[];
  redirectTo?: string;
  onSelectEvent?: (event: any) => void;
  reload?: boolean;
  reloadParent?: () => void;
}
export default function ExistingEvents(props: Props) {
  const router = useRouter();
  const [eventsBar, setEventsBar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState("");
  const [reload, setReload] = useState(false);

  const { data } = useQuery<any[], Error>(
    USE_QUERY_KEYS.fetchEvent,
    fetchEventRequest
  );
  const events = data ?? [];

  const handleModalOpen = (id: string) => {
    setDeleteEventId(id);
    setModalOpen(!modalOpen);
  };
  const handleModalClose = () => {
    setModalOpen(!modalOpen);
  };

  const deleteRequest = async (id: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    await fetch(base_url + "ngo/event/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (props.redirectTo) {
          if (props.redirectTo === "reload") {
            router.reload();
          } else {
            router.push({ pathname: props.redirectTo });
          }
        }
        if (props.reloadParent) {
          props.reloadParent();
        }
        setReload(!reload);
      })
      .catch((error) => console.log("error", error));
  };
  const handleDeleteEvent = () => {
    deleteRequest(deleteEventId);
    handleModalClose();
  };

  return (
    <>
      <ViewStories
        Events={events}
        onClickEvent={props.onClickEvent}
        onDeleteEvent={(id) => handleModalOpen(id)}
        event
      />

      <YouSureModal
        open={modalOpen}
        handleClose={handleModalClose}
        handleYes={handleDeleteEvent}
      ></YouSureModal>
    </>
  );
}
