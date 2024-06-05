import { formSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string, name: string, description: string) => void;
  id: string;
  name: string;
  description: string;
}

export function EditTaskDialog({
  onClose,
  onConfirm,
  id,
  description,
  name,
  open,
}: EditTaskDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name,
      description,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    onConfirm(id, data.name, data.description || "");
    toast.success("Task updated successfully");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Eleos - Edit task</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-64 flex-col items-center gap-6 rounded p-4 lg:w-96"
        >
          <div className="flex w-full flex-col gap-2">
            <TextField
              fullWidth
              error={!!errors.name}
              id="name"
              label="Name"
              variant="outlined"
              color="primary"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <TextField
              fullWidth
              minRows={4}
              id="description"
              label="Description"
              variant="outlined"
              color="primary"
              multiline
              maxRows={10}
              error={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description?.message}
              </span>
            )}
          </div>
          <div className="flex w-full items-center justify-end gap-4">
            <Button
              size="small"
              variant="text"
              sx={{
                color: "#1e293b",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="success"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
