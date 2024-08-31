import AddCircleIcon from "@mui/icons-material/AddCircle";
import ADD_MORE_IMAGE from "../../../public/images/add-more-event-img.png";
import Image from "next/image";
import ExistingEvents from "./ExistingEventComponent";
import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import { fetchEventRequest } from "../../utils/apis/event/Index";

function EventDash(props: any) {
  const router = useRouter();
  const onClickEvent = (event: any) => {
    router.push(
      {
        pathname: END_POINTS.EVENT_VIEW,
        query: { event: JSON.stringify(event) },
      },
      END_POINTS.EVENT_VIEW
    );
  };

  const { data, refetch } = useQuery<any[], Error>(
    USE_QUERY_KEYS.fetchEvent,
    fetchEventRequest
  );
  const events = data ?? [];
  return (
    <>
      <Grid item xl={8.5} lg={8} md={8} sm={12} xs={12}>
        {/* add event section */}
        <div className="z-0 p-2 py-8 text-center">
          <p className="w-full text-center text-sm font-extrabold text-orange-600">
            You can add {6 - events?.length} more events.
          </p>
          <Link href={END_POINTS.EVENT_CREATE}>
            <button
              disabled={6 - events?.length === 0}
              className="m-8 justify-self-center rounded-md border bg-sky-900 px-8 py-4 text-base font-extrabold text-white hover:bg-orange-600 disabled:cursor-not-allowed lg:px-16 lg:text-2xl"
            >
              Add Event <AddCircleIcon />
            </button>
          </Link>
          <Image
            alt="add more event"
            width={600}
            height={0}
            className=" m-auto"
            src={ADD_MORE_IMAGE}
          />
        </div>
      </Grid>
      <Grid item xl={3.5} lg={4} md={4} sm={12} xs={12} className="mt-2">
        <ExistingEvents onClickEvent={onClickEvent} reloadParent={refetch} />
      </Grid>
    </>
  );
}
export default EventDash;
