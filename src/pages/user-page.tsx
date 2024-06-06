import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById, selectUsers } from "@/store/slices/usersSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { UserDetails } from "@/components";

export function UserPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUsers);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById({ id }));
    }
  }, [dispatch, id]);

  if (user.loading)
    return (
      <div className="flex w-full items-center justify-center">
        <div className="relative h-10 w-auto animate-ping">
          <img src={Logo} alt="logo" className="h-full opacity-50" />
        </div>
      </div>
    );

  if (user.error)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <span>{user.error}</span>

        <Button variant="outlined" size="small" onClick={() => navigate("/")}>
          back
        </Button>
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-8 ">
      <div className="relative h-44 bg-slate-300">
        <IconButton
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0.5rem",
            transform: "translateY(-50%)",
          }}
        >
          <ArrowBackIcon />
          <span className="text-sm text-purple-500">Back</span>
        </IconButton>

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full border border-slate-950 bg-slate-800/80">
          <img
            className="size-32 rounded-full"
            src={user.selectedUser?.image}
            alt="User"
          />
        </div>
      </div>

      <UserDetails user={user} />
    </div>
  );
}
