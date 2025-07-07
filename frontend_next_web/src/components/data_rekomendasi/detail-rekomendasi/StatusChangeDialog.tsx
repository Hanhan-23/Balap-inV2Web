// components/data_rekomendasi/StatusChangeSuccessDialog.tsx
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface StatusChangeSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  status: string;
}

export default function StatusChangeSuccessDialog({
  open,
  onClose,
  status,
}: StatusChangeSuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Status berhasil diubah menjadi {status}!{" "}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onClose}>Tutup</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
