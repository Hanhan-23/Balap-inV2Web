import { Recommended, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<Recommended[]> => {
  return [
    {
    id: 1,
    judul: "Jalan berlubang besar",
    deskripsi: "Terdapat lubang besar di Jl. Ahmad Yani, membahayakan kendaraan.",
    cuaca: "Hujan",
    nilai_kerusakan: "80%",
    alamat: "Jl. Ahmad Yani",
    status: "Sedang Diproses"
  },
  {
    id: 2,
    judul: "Lampu jalan mati total",
    deskripsi: "Lampu jalan di Jl. Sudirman mati sejak seminggu lalu.",
    cuaca: "Cerah",
    nilai_kerusakan: "40%",
    alamat: "Jl. Sudirman No. 12",
    status: "Belum Divalidasi"
  },
  {
    id: 3,
    judul: "Retakan jalan",
    deskripsi: "Jalan di Jl. Merdeka No. 45 mengalami retakan memanjang.",
    cuaca: "Berawan",
    nilai_kerusakan: "60%",
    alamat: "Jl. Merdeka No. 45",
    status: "Divalidasi"
  },
  {
    id: 4,
    judul: "Lampu jalan tidak menyala",
    deskripsi: "Beberapa lampu jalan di Jl. Kartini No. 5 mati.",
    cuaca: "Cerah",
    nilai_kerusakan: "20%",
    alamat: "Jl. Kartini No. 5",
    status: "Sedang Diproses"
  },
  {
    id: 5,
    judul: "Jalan bergelombang",
    deskripsi: "Permukaan jalan di Jl. Imam Bonjol bergelombang dan licin.",
    cuaca: "Hujan",
    nilai_kerusakan: "60%",
    alamat: "Jl. Imam Bonjol No. 10",
    status: "Divalidasi"
  },
  {
    id: 6,
    judul: "Lampu jalan rusak",
    deskripsi: "Lampu jalan di Jl. Soekarno Hatta mati dan kabel terbuka.",
    cuaca: "Cerah",
    nilai_kerusakan: "100%",
    alamat: "Jl. Soekarno Hatta",
    status: "Sedang Diproses"
  },
  {
    id: 7,
    judul: "Aspal mengelupas",
    deskripsi: "Aspal di Jl. Diponegoro No. 9 mengelupas akibat air hujan.",
    cuaca: "Hujan",
    nilai_kerusakan: "100%",
    alamat: "Jl. Diponegoro No. 9",
    status: "Belum Divalidasi"
  },
  {
    id: 8,
    judul: "Lampu jalan padam sebagian",
    deskripsi: "Sebagian lampu jalan di Jl. Pelita No. 22 tidak berfungsi.",
    cuaca: "Berawan",
    nilai_kerusakan: "80%",
    alamat: "Jl. Pelita No. 22",
    status: "Sedang Diproses"
  },
  {
    id: 9,
    judul: "Jalan rusak parah",
    deskripsi: "Jalan di Jl. Teuku Umar No. 8 dipenuhi lubang dan aspal retak.",
    cuaca: "Cerah",
    nilai_kerusakan: "100%",
    alamat: "Jl. Teuku Umar No. 8",
    status: "Divalidasi"
  },
  {
    id: 10,
    judul: "Lampu jalan korslet",
    deskripsi: "Lampu jalan di Jl. Gajah Mada No. 14 korslet saat hujan.",
    cuaca: "Hujan",
    nilai_kerusakan: "80%",
    alamat: "Jl. Gajah Mada No. 14",
    status: "Belum Divalidasi"
  },
  {
    id: 11,
    judul: "Permukaan jalan rusak",
    deskripsi: "Jalan di Jl. Cempaka No. 1 tidak rata dan membahayakan.",
    cuaca: "Cerah",
    nilai_kerusakan: "20%",
    alamat: "Jl. Cempaka No. 1",
    status: "Divalidasi"
  },
  {
    id: 12,
    judul: "Lampu jalan kedap-kedip",
    deskripsi: "Lampu jalan di Jl. Bukit Indah menyala tidak stabil.",
    cuaca: "Berawan",
    nilai_kerusakan: "20%",
    alamat: "Jl. Raya Bukit Indah",
    status: "Sedang Diproses"
  },
  {
    id: 13,
    judul: "Aspal retak dan berlubang",
    deskripsi: "Kerusakan aspal di Jl. Bunga Mawar No. 7 cukup parah.",
    cuaca: "Cerah",
    nilai_kerusakan: "80%",
    alamat: "Jl. Bunga Mawar No. 7",
    status: "Sedang Diproses"
  },
  {
    id: 14,
    judul: "Lampu jalan jatuh",
    deskripsi: "Tiang lampu jalan di Jl. Pemuda No. 33 tumbang.",
    cuaca: "Angin kencang",
    nilai_kerusakan: "60%",
    alamat: "Jl. Pemuda No. 33",
    status: "Sedang Diproses"
  },
  {
    id: 15,
    judul: "Jalan berlubang kecil",
    deskripsi: "Lubang kecil muncul di Jl. Teratai Putih setelah hujan deras.",
    cuaca: "Hujan",
    nilai_kerusakan: "40%",
    alamat: "Jl. Teratai Putih",
    status: "Divalidasi"
  },
  {
    id: 16,
    judul: "Lampu jalan menyala siang hari",
    deskripsi: "Lampu jalan di Jl. Mangga Besar tidak mati di siang hari.",
    cuaca: "Cerah",
    nilai_kerusakan: "100%",
    alamat: "Jl. Mangga Besar",
    status: "Sedang Diproses"
  },
  {
    id: 17,
    judul: "Jalan menurun licin",
    deskripsi: "Jl. Melati Indah licin dan tanpa tanda peringatan.",
    cuaca: "Hujan",
    nilai_kerusakan: "100%",
    alamat: "Jl. Melati Indah",
    status: "Sedang Diproses"
  },
  {
    id: 18,
    judul: "Lampu jalan tidak stabil",
    deskripsi: "Lampu di Jl. Cemara No. 18 menyala-mati secara acak.",
    cuaca: "Berawan",
    nilai_kerusakan: "80%",
    alamat: "Jl. Cemara No. 18",
    status: "Belum Divalidasi"
  },
  {
    id: 19,
    judul: "Jalan retak akibat truk berat",
    deskripsi: "Jl. Pahlawan No. 22 retak karena sering dilalui truk.",
    cuaca: "Cerah",
    nilai_kerusakan: "40%",
    alamat: "Jl. Pahlawan No. 22",
    status: "Sedang Diproses"
  },
  {
    id: 20,
    judul: "Lampu jalan nyala hanya sebagian",
    deskripsi: "Sebagian lampu jalan di Jl. Rajawali No. 40 tidak menyala.",
    cuaca: "Berawan",
    nilai_kerusakan: "100%",
    alamat: "Jl. Rajawali No. 40",
    status: "Divalidasi"
  }
  ];
};

const RecommendedPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-red-300 rounded-md dark:bg-red-950">
        <h1 className="font-semibold">Rekomendasi Perbaikan</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default RecommendedPage;