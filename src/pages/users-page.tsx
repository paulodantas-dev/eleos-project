import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, selectUsers } from "@/store/slices/usersSlice";
import { useEffect } from "react";
import Logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { UsersCard } from "@/components";

export function UsersPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers({ limit: 12, skip: 0 }));
  }, [dispatch]);

  if (users.loading)
    return (
      <div className="flex w-full items-center justify-center">
        <div className="relative h-10 w-auto animate-ping">
          <img src={Logo} alt="logo" className="h-full opacity-50" />
        </div>
      </div>
    );

  if (users.error)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <span>{users.error}</span>

        <Button variant="outlined" size="small" onClick={() => navigate("/")}>
          back
        </Button>
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-12 px-4 py-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-center text-2xl font-bold text-purple-500 lg:text-left">
          Users List
        </h2>

        <div className="flex items-center justify-center">
          <Pagination
            size="small"
            showFirstButton
            showLastButton
            page={users.list?.skip ? users.list.skip / users.list.limit + 1 : 1}
            onChange={(_, page) => {
              dispatch(fetchUsers({ limit: 12, skip: (page - 1) * 12 }));
            }}
            count={
              users.list && users.list.total && users.list.limit
                ? Math.ceil(users.list.total / users.list.limit)
                : 0
            }
            color="primary"
          />
        </div>
      </div>
      <div className="grid max-h-[calc(100vh-13rem)] grow grid-cols-1 gap-4 overflow-auto scrollbar-none md:grid-cols-2 lg:grid-cols-4 ">
        {users.list?.users.map((user) => {
          return <UsersCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}
