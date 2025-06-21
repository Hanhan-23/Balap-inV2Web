import { Recommended, columns } from "../../../components/data_laporan/columns";
import { DataTable } from "../../../components/data_laporan/data-table";
import { getCardLaporan } from "@/services/datalaporanservices";

const getData = async (): Promise<Recommended[]> => {
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
