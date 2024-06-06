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

  console.log(id);

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
    <div className="flex w-full flex-col gap-8 p-12">
      <div>
        <IconButton color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
          <span className="text-sm text-purple-500">Back</span>
        </IconButton>
      </div>

      <UserDetails user={user} />
    </div>
  );
}
