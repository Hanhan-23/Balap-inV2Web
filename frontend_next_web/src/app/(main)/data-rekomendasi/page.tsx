import { columns } from "../../../components/data_rekomendasi/columns";
import { getDataRekomendasi } from "@/services/datarekomendasiservices";
import { DataTable } from "../../../components/data_rekomendasi/data-table";
import { rekomendasi } from "@/types/data-rekomendasi";

const getData = async (): Promise<rekomendasi[]> => {
  const data = await getDataRekomendasi("");
  return data;
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
