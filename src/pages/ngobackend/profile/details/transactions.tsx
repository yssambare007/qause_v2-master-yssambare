import { useEffect, useState } from "react";

//MUI components
import { Pagination, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

//Data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

//React query
import { useQuery } from "react-query";

//Icons
import TableViewIcon from "@mui/icons-material/TableView";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

//Custom components
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";

//API
import {
  getProfileDetails,
  getTransactionData,
} from "../../../../utils/apis/details/Index";

//types
import type {
  ProfileDetails,
  Transaction,
} from "../../../../types/profile/details";
import type { GridColDef } from "@mui/x-data-grid/models";
import { useRouter } from "next/router";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const {
    isLoading: isProfileLoading,
    data: profileData,
    isError: isProfileError,
  } = useQuery<ProfileDetails>("details", getProfileDetails);
  const {
    isLoading: isTransactionLoading,
    data: transactionData,
    isError: isTransactionError,
  } = useQuery<Transaction>(
    ["details", profileData?.data?.ngo?._id, page],
    getTransactionData
  );
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 210,
    },
    {
      field: "donorName",
      headerName: "Donor Name",
      width: 210,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 210,
    },
    {
      field: "method",
      headerName: "Method",
      width: 210,
    },
    {
      field: "description",
      headerName: "Description",
      width: 210,
    },
  ];

  const csvHeaders: any = columns.map((column) => ({
    label: column.headerName as string,
    key: column.field,
  }));

  const totalEntities = transactionData?.total || 0;

  const limit = transactionData?.pagination?.next
    ? transactionData?.pagination?.next?.limit || 10
    : transactionData?.pagination?.prev?.limit || 10;

  const currentPage = transactionData?.pagination?.next
    ? transactionData?.pagination?.next?.page - 1
    : (transactionData?.pagination?.prev?.page as number) + 1;

  const rows =
    (transactionData?.success &&
      transactionData?.data?.map((item) => ({
        id: item._id,
        date: new Date(item.createdAt).toLocaleDateString(),
        donorName: item.name,
        amount: item.amount,
        method: item.mode,
        description: item.desc,
      }))) ||
    [];

  const exportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    autoTable(doc, {
      head: [
        [
          "Date",
          "Donor Name",
          "Amount",
          "Method",
          "Description",
          "Status",
          "Payment ID",
        ],
      ],
      body: rows.map((item) => [
        item.date,
        item.donorName,
        item.amount,
        item.method,
        item.description,
      ]),
    });
    doc.save("Transactions.pdf");
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  return (
    <NgoDashboardFrame>
      <DetailsFrame>
        <Paper
          elevation={3}
          className="m-2 flex w-full flex-col gap-5 bg-white p-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-blue text-xl font-bold">Transactions</h2>
            <div className="flex gap-5">
              <button onClick={() => exportPDF()}>
                <PictureAsPdfOutlinedIcon />
                <span className="sr-only">Export PDF</span>
              </button>
              <CSVLink
                filename="Transactions.csv"
                data={rows}
                headers={csvHeaders}
              >
                <TableViewIcon />
                <span className="sr-only">Export Table</span>
              </CSVLink>
            </div>
          </div>

          <div className="h-[500px]">
            <DataGrid
              loading={isTransactionLoading || isProfileLoading}
              error={isTransactionError || isProfileError}
              rows={rows}
              columns={columns}
              pageSize={limit}
              components={{
                Pagination: () => (
                  <Pagination
                    page={currentPage || 1}
                    count={Math.ceil(totalEntities / limit)}
                    onChange={(e, page) => setPage(page)}
                    showFirstButton
                    showLastButton
                  />
                ),
              }}
            />
          </div>
        </Paper>
      </DetailsFrame>
    </NgoDashboardFrame>
  );
};

export default Transactions;
