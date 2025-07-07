// components/data_rekomendasi/RencanaTindakan.tsx
import { motion } from "framer-motion";
import { MapPin, Wrench, CheckCircle } from "lucide-react";

export default function RencanaTindakan() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-stone-950 border rounded-lg shadow-lg p-6 dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)]"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Rencana Tindakan
      </h2>
      <div className="space-y-4">
        {/* Validasi */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-start gap-4"
        >
          <MapPin className="text-blue-500 dark:text-blue-300 mt-1" />
          <div>
            <h3 className="font-medium mb-2 dark:text-blue-200">
              1. Validasi Laporan
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Status ini menunjukkan bahwa tim pemerintah telah melakukan survei
              langsung ke lokasi sesuai laporan. Jika ditemukan bahwa kerusakan
              benar-benar ada di lokasi sebagaimana dilaporkan, maka laporan
              dinyatakan <strong>Valid</strong> dan dapat dilanjutkan ke tahap
              perencanaan perbaikan.
            </p>
          </div>
        </motion.div>

        {/* Proses */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-start gap-4"
        >
          <Wrench className="text-yellow-600 dark:text-yellow-300 mt-1" />
          <div>
            <h3 className="font-medium mb-2 dark:text-yellow-200">
              2. Proses Perbaikan
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Setelah laporan dari rekomendasi dinyatakan valid, pemerintah akan
              memulai proses perbaikan sesuai dengan rencana yang telah disusun.
              Status harus di update menjadi <strong>Proses</strong>.
            </p>
          </div>
        </motion.div>

        {/* Selesai */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-start gap-4"
        >
          <CheckCircle className="text-green-600 dark:text-green-300 mt-1" />
          <div>
            <h3 className="font-medium mb-2 dark:text-green-200">
              3. Penyelesaian
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Status ini menandakan bahwa seluruh proses perbaikan telah{" "}
              <strong>diselesaikan</strong>, dan kondisi infrastruktur di lokasi
              tersebut telah ditangani sesuai laporan yang masuk.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
