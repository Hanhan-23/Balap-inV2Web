import { z } from "zod";

export const schemaLaporan = z.object({
  id: z.string(),
  gambar: z.string(),
  tgl_lapor: z.string(),
  judul: z.string(),
  jenis: z.string(),
  persentase: z.string(),
  alamat: z.string(),
  status: z.string(),
});

export type laporan = z.infer<typeof schemaLaporan>;