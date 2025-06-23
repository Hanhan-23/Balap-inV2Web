import { columns } from "../../../components/data_laporan/columns";
import { DataTable } from "../../../components/data_laporan/data-table";
import { getCardLaporan } from "@/services/datalaporanservices";
import { Laporan } from "@/types/data-laporan";

const getData = async (): Promise<Laporan[]> => {
  const data = await getCardLaporan('')
  return data
};

const RecommendedPage = async () => {
  const data = await getData();
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default RecommendedPage;
