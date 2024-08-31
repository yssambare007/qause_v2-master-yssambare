/* eslint-disable react/no-unescaped-entities */
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { getFundraiseDetails } from "../../../../utils/apis/details/Index";
import { useQuery } from "react-query";
import moment from "moment";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "green" : "#308fe8",
  },
}));

function FundRaising(props: any) {
  const { data } = useQuery<any>(
    ["transitions", props.data._id],
    getFundraiseDetails
  );

  const tableHeadStyle = {
    borderTop: "0",
    borderBottom: "1px solid #f2f2f2",
    padding: "10px 10px 20px 0px",
    display: "table-cell",
    fontSize: "0.725rem",
    fontWeight: "700",
    color: "#1b3763",
  };

  const tableBodyStyle = {
    fontSize: "0.675rem",
    borderBottom: "1px solid #f2f2f2",
    padding: "10px 10px 20px 0px",
    fontWeight: 500,
    color: "#25406a",
  };

  return (
    <div className="p-[20px]">
      <Grid container justifyContent={"space-between"} className="my-5">
        <Grid item>
          <span className="text-[#1b3763]">
            Title:{" "}
            <span className="ml-1.5 text-[1.2em] font-bold">
              {props.data.title}
            </span>
          </span>
        </Grid>
        <Grid item>
          <span className="text-[#1b3763]">
            Donation Received{" "}
            <span className="ml-1.5 text-[1.2em] font-bold">
              ₹{props.data.donates / 100}
            </span>
          </span>
        </Grid>
      </Grid>
      <Grid container className="mt-[1.5rem] block px-[2px]">
        <BorderLinearProgress
          className="w-full"
          variant="determinate"
          value={props.percValue}
        />
        <Grid
          item
          container
          justifyContent={"space-between"}
          sx={{ mt: "0.5rem" }}
          className="text-xs font-bold text-[#499803]"
        >
          <Grid item>₹{props.data.donates / 100}</Grid>
          <Grid item>₹{props.data.amount}</Grid>
        </Grid>
      </Grid>
      <hr className="my-8 rounded-[4px] border-[6px] border-[#f6f6f6]" />

      <Grid className="mb-2">
        <span className="text-[1.2em] font-bold text-[#1b3763]">Detail</span>
      </Grid>

      <Grid className="my-3 h-[150px] overflow-auto">
        {data?.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th style={{ paddingLeft: 0, ...tableHeadStyle }}>Name</th>
                <th style={{ ...tableHeadStyle }}>Email ID</th>
                <th style={{ ...tableHeadStyle }}>Contact</th>
                <th style={{ ...tableHeadStyle }}>Country</th>
                <th style={{ ...tableHeadStyle }}>Received on</th>
                <th style={{ ...tableHeadStyle }}>Mode of Payment</th>
                <th style={{ ...tableHeadStyle }}>Qause Fees</th>
                <th style={{ ...tableHeadStyle }}>Bank Fees</th>
                <th style={{ ...tableHeadStyle }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: Record<string, any>) => (
                <tr key={item._id} className="text-left">
                  <td style={{ ...tableBodyStyle }}>{item.donorName}</td>
                  <td style={{ ...tableBodyStyle }}>{item.donorEmail}</td>
                  <td style={{ ...tableBodyStyle }}>+{item.donorContact}</td>
                  <td style={{ ...tableBodyStyle }}> </td>
                  <td style={{ ...tableBodyStyle }}>
                    {moment(item.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td style={{ ...tableBodyStyle }}>{item.mode}</td>
                  <td style={{ ...tableBodyStyle }}> </td>
                  <td style={{ ...tableBodyStyle }}> </td>
                  <td style={{ ...tableBodyStyle }}>
                    <strong>₹ {item.amount / 100}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[1.2em] font-bold text-[#383c4559]">
              No Transactions Yet
            </span>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default FundRaising;
