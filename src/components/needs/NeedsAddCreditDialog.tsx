import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import Zoom from "@mui/material/Zoom";
import { CloseCircleFilled } from "@ant-design/icons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Add from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";
import { TOKEN } from "../../constants/constants";
import useRazorpay from "react-razorpay";
import { getProfileDashboardData } from "../../utils/apis/profile/Index";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import { useQuery } from "react-query";
import { base_url } from "../../utils/utils";

interface DATA {
  ngo: any;
}
function NeedsAddCreditDialog(props: {
  availableCredits?: number;
  children?: JSX.Element;
}) {
  const Razorpay = useRazorpay();
  const [creditRequested, setCreditRequested] = useState(1);
  const [open, setOpen] = useState(false);
  const toggleDialogOpen = useCallback(() => setOpen((prev) => !prev), []);
  const increment = useCallback(
    () => setCreditRequested((prev) => prev + 1),
    []
  );
  const decrement = useCallback(
    () => setCreditRequested((prev) => (prev > 1 ? prev - 1 : prev)),
    []
  );
  const cost = 10;

  const createOrderRequest = async (credit: number) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      credit: credit,
      ngoId: ngo._id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const res = await fetch(base_url + "v2/credit", requestOptions);
    const data = await res.json();
    return data.data;
  };
  async function handleAddCredit() {
    const order = await createOrderRequest(creditRequested);
    const options = {
      key: "" + process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Mindism Tech Private",
      description: "Credit Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response: any) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: ngo.founder,
        email: ngo.email,
        contact: ngo.mobile,
      },
      notes: {
        address: `{${ngo.address?.street}, ${ngo.address?.city}, ${ngo.address?.zip}, ${ngo.address?.state}, ${ngo.address?.country}}`,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  }
  const { data } = useQuery<DATA, Error>(
    USE_QUERY_KEYS.fetchProfileDashBoardData,
    getProfileDashboardData
  );
  const { ngo } = data ?? {};
  return (
    <>
      <button onClick={toggleDialogOpen}>
        {props.children ? (
          props.children
        ) : (
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-[#333846] sm:text-base">
              {props.availableCredits || 0} Credits Left
            </div>
            <AddCircleIcon fontSize="medium" htmlColor="#0020D1" />
          </div>
        )}
      </button>

      <Dialog
        PaperProps={{
          className: "!rounded-3xl !bg-[#E1ECF8] !w-full !max-w-2xl",
        }}
        open={open}
        TransitionComponent={Zoom}
        keepMounted
        onClose={toggleDialogOpen}
      >
        <DialogContent>
          <div className="flex items-center justify-between px-3 py-3">
            <div className="text-3xl font-light">ADD CREDIT</div>
            <IconButton onClick={toggleDialogOpen}>
              <CloseCircleFilled />
            </IconButton>
          </div>
          <div className="flex flex-col items-center border-t border-gray-900 bg-white py-16">
            {/* Counter */}
            <div className="relative mt-1 flex flex-row items-center rounded-lg bg-transparent">
              <button
                onClick={decrement}
                className="h-10 w-10 cursor-pointer rounded-full border border-gray-600  text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
              >
                <Remove />
              </button>
              <input
                type="number"
                className="text-md md:text-basecursor-default mx-4 flex h-14 w-20 items-center rounded border border-gray-400 text-center  font-semibold text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none"
                value={creditRequested}
              ></input>
              <button
                onClick={increment}
                className="h-10 w-10 cursor-pointer rounded-full border border-gray-600  text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
              >
                <Add />
              </button>
            </div>
            {/* Note */}
            <div className="py-12 text-sm text-gray-600">
              <span className="text-red-700">Note: </span>
              <span> Cost of {creditRequested} token is Amount of </span>
              <span className="font-bold">₹{cost * creditRequested}</span>
            </div>
            {/* Add button */}
            <button
              onClick={handleAddCredit}
              className="rounded bg-[#0020D1] px-6 py-3 font-bold text-white"
            >
              Add Credit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NeedsAddCreditDialog;
