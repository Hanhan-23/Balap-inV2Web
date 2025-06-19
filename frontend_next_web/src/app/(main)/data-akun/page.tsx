import { Account, columns } from "../../../components/data_akun/columns";
import { DataTable } from "../../../components/data_akun/data-table";

const getData = async (): Promise<Account[]> => {
  return [
    {
      id: 1,
      username: "Farhan9098",
      email: "frhn@gmail.com",
      no_telp: "081278783322",
      alamat: "Jl. Ahmad Yani",
      jabatan: "Kepala",
    },
    {
      id: 2,
      username: "Yuliapipka",
      email: "yulipipk@gmail.com",
      no_telp: "082134567890",
      alamat: "Jl. Sudirman No. 12",
      jabatan: "Sekretaris",
    },
    {
      id: 3,
      username: "MichaelLee",
      email: "michael@email.com",
      no_telp: "081223344556",
      alamat: "Jl. Merdeka No. 45",
      jabatan: "Staf IT",
    },
    {
      id: 4,
      username: "Iskandar",
      email: "kandar@gmail.com",
      no_telp: "082199887766",
      alamat: "Jl. Kartini No. 5",
      jabatan: "HRD",
    },
    {
      id: 5,
      username: "BudiSantoso",
      email: "budi.santoso@yahoo.com",
      no_telp: "085611223344",
      alamat: "Jl. Imam Bonjol No. 10",
      jabatan: "Manajer",
    },
    {
      id: 6,
      username: "AgusSaputra",
      email: "agus.saputra@email.com",
      no_telp: "081356789012",
      alamat: "Jl. Soekarno Hatta",
      jabatan: "Keuangan",
    },
    {
      id: 7,
      username: "NurAini",
      email: "nur.aini@gmail.com",
      no_telp: "082145678900",
      alamat: "Jl. Diponegoro No. 9",
      jabatan: "Admin",
    },
    {
      id: 8,
      username: "RizkyPratama",
      email: "rizky.pratama@hotmail.com",
      no_telp: "083812345678",
      alamat: "Jl. Pelita No. 22",
      jabatan: "Teknisi",
    },
    {
      id: 9,
      username: "LestariDewi",
      email: "lestari.dewi@email.com",
      no_telp: "082298765432",
      alamat: "Jl. Teuku Umar No. 8",
      jabatan: "Marketing",
    },
    {
      id: 10,
      username: "YusufHidayat",
      email: "yusuf.hidayat@gmail.com",
      no_telp: "081377889900",
      alamat: "Jl. Gajah Mada No. 14",
      jabatan: "Pengawas",
    },
  ];
};

const AccountsPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">Data Akun Akses Balap-In</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AccountsPage;
