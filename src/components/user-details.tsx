import { IUsersState } from "@/store/slices/usersSlice";
import { Button, Divider, useMediaQuery } from "@mui/material";

interface UserDetailsProps {
  user: IUsersState;
}

export function UserDetails({ user }: UserDetailsProps) {
  const mobile = useMediaQuery("(max-width:770px)");
  console.log(mobile);

  return (
    <div className="flex w-full flex-col gap-8 p-12">
      <div className="w-full">
        <h1 className="text-center text-2xl font-bold">
          {user.selectedUser?.firstName} {user.selectedUser?.lastName}
        </h1>
        <p className="text-center text-slate-400">
          {user.selectedUser?.company.title} at{" "}
          {user.selectedUser?.company.name}
        </p>
      </div>
      <div className="w-full">
        <p className="text-center text-slate-400">
          <span className="text-slate-950">email: </span>
          {user.selectedUser?.email}
        </p>
        <p className="text-center text-slate-400">
          <span className="text-slate-950">phone: </span>
          {user.selectedUser?.phone}
        </p>
        <p className="text-center text-slate-400">
          <span className="text-slate-950">username: </span>
          {user.selectedUser?.username}
        </p>
        <p className="text-center text-slate-400">
          <span className="text-slate-950">birth date: </span>
          {user.selectedUser?.birthDate}
        </p>
      </div>

      {!mobile && (
        <div className="flex h-20 flex-col items-center justify-center gap-8 md:flex-row">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-semibold uppercase">
              {user.selectedUser?.gender}
            </span>
            <span className="text-xs text-slate-400">gender</span>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-semibold uppercase">
              {user.selectedUser?.age}
            </span>
            <span className="text-xs text-slate-400">age</span>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-semibold uppercase">
              {user.selectedUser?.height} cm
            </span>
            <span className="text-xs text-slate-400">height</span>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-semibold uppercase">
              {user.selectedUser?.weight} kg
            </span>
            <span className="text-xs text-slate-400">weight</span>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
        <div className="flex h-44 w-full max-w-sm flex-col justify-between rounded-lg p-4 transition-all hover:scale-105 hover:bg-slate-100">
          <div className="flex items-center justify-between ">
            <h2 className="text-lg font-semibold">Address</h2>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${user.selectedUser?.address.coordinates.lat},${user.selectedUser?.address.coordinates.lng}`,
                  "_blank"
                );
              }}
            >
              see on map
            </Button>
          </div>
          <p className="text-slate-400">
            <span className="text-slate-950">Address: </span>
            {user.selectedUser?.address.address},
            {user.selectedUser?.address.city},{user.selectedUser?.address.state}
            ,{user.selectedUser?.address.country}
          </p>
          <p className="text-slate-400">
            <span className="text-slate-950">Postal Code: </span>
            {user.selectedUser?.address.postalCode}
          </p>
        </div>

        <div className="relative h-44 w-full max-w-sm rounded-lg bg-gradient-to-r from-slate-50 to-slate-200 p-4 shadow-lg transition-all hover:scale-105">
          <h2 className="text-lg font-semibold">Bank Information</h2>
          <p className="absolute bottom-10 text-purple-400">
            {user.selectedUser?.bank.cardNumber}
          </p>
          <p className="absolute bottom-3 text-sm text-purple-400">
            <span className="text-xs text-slate-400">exp </span>
            {user.selectedUser?.bank.cardExpire}
          </p>
          <p className="absolute right-2 top-4 rounded border border-purple-500 p-2 text-sm text-slate-950 ">
            {user.selectedUser?.bank.cardType}
          </p>
          <p className="text-slate-400">
            Currency: {user.selectedUser?.bank.currency}
          </p>

          <div className="absolute bottom-2 right-2 flex flex-col items-end gap-2">
            <p className="text-xs text-slate-600">
              Crypto Coin: {user.selectedUser?.crypto.coin}
            </p>
            <p className="text-xs text-slate-600">
              Crypto Network: {user.selectedUser?.crypto.network}
            </p>
          </div>
        </div>

        <div className="flex h-44 w-full max-w-sm flex-col justify-between rounded-lg p-4 transition-all hover:scale-105 hover:bg-slate-100">
          <h2 className="text-lg font-semibold">Company Information</h2>
          <p className="text-slate-400">
            <span className="text-slate-950">Company Name: </span>
            {user.selectedUser?.company.name}
          </p>
          <p className="text-slate-400">
            <span className="text-slate-950">Company Title: </span>
            {user.selectedUser?.company.title}
          </p>
          <p className="text-slate-400">
            <span className="text-slate-950">Company department: </span>
            {user.selectedUser?.company.department}
          </p>
        </div>
      </div>
    </div>
  );
}
