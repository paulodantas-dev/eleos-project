import { formSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { z } from "zod";
import { addTask } from "@/store/slices/tasksSlice";
import { useAppDispatch } from "@/store/hooks";
import toast from "react-hot-toast";

export function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    dispatch(addTask(data));
    toast.success("Task added successfully");
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-slate-100 px-4 py-8">
      <h1 className="text-2xl font-bold text-purple-500">Eleos - Task Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col items-center gap-6 rounded-lg bg-slate-200 p-4 shadow-lg"
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
            <span className="text-sm text-red-500">{errors.name.message}</span>
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
            error={!!errors.description}
            {...register("description")}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description?.message}
            </span>
          )}
        </div>
        <Button
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? <MoreHorizIcon className="animate-ping" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
