import { z } from "zod";

export const schemaRekomendasi = z.object({
  id: z.string(),
  jumlah_laporan: z.number(),
  status_urgent: z.string(),
  tingkat_urgent: z.number(),
  status_rekom: z.string(),
  laporan: z.object({
    judul: z.string(),
    jenis: z.string(),
    alamat: z.string(),
  }),
});

export type rekomendasi = z.infer<typeof schemaRekomendasi>;
