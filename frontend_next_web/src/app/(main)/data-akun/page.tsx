import { Account, columns } from "../../../components/data_akun/columns";
import { DataTable } from "../../../components/data_akun/data-table";

const getData = async (): Promise<Account[]> => {
  return [
    {
      id: 1,
      nama: "Farhan",
      email: "frhn@gmail.com",
      no_telp: "081278783322",
      alamat: "Jl. Ahmad Yani",
    },
    {
      id: 2,
      nama: "Yulia Pipka",
      email: "yulipipk@gmail.com",
      no_telp: "082134567890",
      alamat: "Jl. Sudirman No. 12",
    },
    {
      id: 3,
      nama: "Michael Lee",
      email: "michael@email.com",
      no_telp: "081223344556",
      alamat: "Jl. Merdeka No. 45",
    },
    {
      id: 4,
      nama: "Iskandar",
      email: "kandar@gmail.com",
      no_telp: "082199887766",
      alamat: "Jl. Kartini No. 5",
    },
    {
      id: 5,
      nama: "Budi Santoso",
      email: "budi.santoso@yahoo.com",
      no_telp: "085611223344",
      alamat: "Jl. Imam Bonjol No. 10",
    },
    {
      id: 6,
      nama: "Agus Saputra",
      email: "agus.saputra@email.com",
      no_telp: "081356789012",
      alamat: "Jl. Soekarno Hatta",
    },
    {
      id: 7,
      nama: "Nur Aini",
      email: "nur.aini@gmail.com",
      no_telp: "082145678900",
      alamat: "Jl. Diponegoro No. 9",
    },
    {
      id: 8,
      nama: "Rizky Pratama",
      email: "rizky.pratama@hotmail.com",
      no_telp: "083812345678",
      alamat: "Jl. Pelita No. 22",
    },
    {
      id: 9,
      nama: "Lestari Dewi",
      email: "lestari.dewi@email.com",
      no_telp: "082298765432",
      alamat: "Jl. Teuku Umar No. 8",
    },
    {
      id: 10,
      nama: "Yusuf Hidayat",
      email: "yusuf.hidayat@gmail.com",
      no_telp: "081377889900",
      alamat: "Jl. Gajah Mada No. 14",
    },
  ];
};

const AccountsPage = async () => {
  const data = await getData();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-2xl">Data Akun Akses BALAPIN</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AccountsPage;
