import { useEffect, useState } from "react";

//Query
import { useQuery } from "react-query";

//Icons
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import TableViewIcon from "@mui/icons-material/TableView";

//MUI`
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { Pagination, Paper } from "@mui/material";

//Data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

//Components, uitls and types
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";
import { getCreditData } from "../../../../utils/apis/details/Index";
import type { Credits } from "../../../../types/profile/details";
import type { GridColDef } from "@mui/x-data-grid/models";
import { useRouter } from "next/router";

const CreditsPage = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { isLoading, data, isError } = useQuery<Credits>(
    ["details", page],
    getCreditData
  );

  const totalEntities = data?.total || 0;

  const limit = data?.pagination?.next
    ? data?.pagination?.next?.limit || 10
    : data?.pagination?.prev?.limit || 10;

  const currentPage = data?.pagination?.next
    ? data?.pagination?.next?.page - 1
    : (data?.pagination?.prev?.page as number) + 1;

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 180,
    },
    {
      field: "description",
      headerName: "Description",
      width: 180,
    },
    {
      field: "credit",
      headerName: "No. of Credits",
      width: 180,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
    },
    {
      field: "source",
      headerName: "Source",
      width: 180,
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 180,
    },
  ];

  const csvHeaders: any = columns.map((column) => ({
    label: column.headerName as string,
    key: column.field,
  }));

  const rows =
    (Array.isArray(data?.data) &&
      data?.data.map((item) => ({
        id: item._id,
        date: new Date(item.createdAt).toLocaleDateString(),
        description: item.desc,
        credit: item.credit,
        amount: item.amount,
        source: "",
        balance: item.balance,
      }))) ||
    [];

  const exportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    autoTable(doc, {
      head: [
        ["ID", "Date", "Description", "Credit", "Amount", "Source", "Balance"],
      ],
      body: rows.map((item) => [
        item.id,
        item.date,
        item.description,
        item.credit,
        item.amount,
        item.source,
        item.balance,
      ]),
    });
    doc.save("Credits.pdf");
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
            <h2 className="text-blue text-xl font-bold">Credits</h2>
            <div className="flex gap-5">
              <button onClick={() => exportPDF()}>
                <PictureAsPdfOutlinedIcon />
                <span className="sr-only">Export PDF</span>
              </button>
              <CSVLink filename="Credits.csv" data={rows} headers={csvHeaders}>
                <TableViewIcon />
                <span className="sr-only">Export Table</span>
              </CSVLink>
            </div>
          </div>

          <div className="h-[500px]">
            <DataGrid
              error={isError}
              pageSize={limit}
              loading={isLoading}
              rows={rows}
              columns={columns}
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

export default CreditsPage;
