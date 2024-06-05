import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById, selectUsers } from "@/store/slices/usersSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

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

  console.log(user.selectedUser);

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
    <div className="flex w-full flex-col gap-4 p-12">
      <div>
        <IconButton color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
          <span className="text-sm text-purple-500">Back</span>
        </IconButton>
      </div>

      <div className="flex w-full flex-col gap-20">
        <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-center 2xl:justify-around">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <img
              className="size-32 rounded-full"
              src={user.selectedUser?.image}
              alt="User"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {user.selectedUser?.firstName} {user.selectedUser?.lastName}
              </h1>
              <p className="text-slate-400">
                {user.selectedUser?.company.title} at{" "}
                {user.selectedUser?.company.name}
              </p>
              <p className="text-slate-400">{user.selectedUser?.email}</p>
              <p className="text-slate-400">{user.selectedUser?.phone}</p>
              <p className="text-slate-400">
                Username: {user.selectedUser?.username}
              </p>
              <p className="text-slate-400">
                Birth Date: {user.selectedUser?.birthDate}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Other Information</h2>
            <p className="text-slate-400">EIN: {user.selectedUser?.ein}</p>
            <p className="text-slate-400">SSN: {user.selectedUser?.ssn}</p>
            <p className="text-slate-400">
              IP Address: {user.selectedUser?.ip}
            </p>
            <p className="text-slate-400">
              MAC Address: {user.selectedUser?.macAddress}
            </p>
            <p className="truncate text-slate-400">
              User Agent: {user.selectedUser?.userAgent}
            </p>
            <p className="text-slate-400">
              Crypto Coin: {user.selectedUser?.crypto.coin}
            </p>
            <p className="truncate text-slate-400">
              Crypto Wallet: {user.selectedUser?.crypto.wallet}
            </p>
            <p className="text-slate-400">
              Crypto Network: {user.selectedUser?.crypto.network}
            </p>
            <p className="text-slate-400">Role: {user.selectedUser?.role}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 2xl:flex-row 2xl:items-start 2xl:justify-around 2xl:gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <ul className="flex list-inside list-disc flex-col gap-2 text-slate-400">
              <li>Age: {user.selectedUser?.age}</li>
              <li>Gender: {user.selectedUser?.gender}</li>
              <li>Height: {user.selectedUser?.height} cm</li>
              <li>Weight: {user.selectedUser?.weight} kg</li>
              <li>Eye Color: {user.selectedUser?.eyeColor}</li>
              <li>
                Hair: {user.selectedUser?.hair.color} (
                {user.selectedUser?.hair.type})
              </li>
              <li>Blood Group: {user.selectedUser?.bloodGroup}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-slate-400">
              {user.selectedUser?.address.address},
              {user.selectedUser?.address.city},
              {user.selectedUser?.address.state},
              {user.selectedUser?.address.country}
            </p>
            <p className="text-slate-400">
              Postal Code: {user.selectedUser?.address.postalCode}
            </p>
            <p className="text-slate-400">
              Coordinates: {user.selectedUser?.address.coordinates.lat},
              {user.selectedUser?.address.coordinates.lng}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Company Information</h2>
            <p className="text-slate-400">{user.selectedUser?.company.name}</p>
            <p className="text-slate-400">
              Department: {user.selectedUser?.company.department}
            </p>
            <p className="text-slate-400">
              Title: {user.selectedUser?.company.title}
            </p>
            <p className="text-slate-400">
              Address: {user.selectedUser?.company.address.address},
              {user.selectedUser?.company.address.city},
              {user.selectedUser?.company.address.state},
              {user.selectedUser?.company.address.country}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Bank Information</h2>
            <p className="text-slate-400">
              Card Number: {user.selectedUser?.bank.cardNumber}
            </p>
            <p className="text-slate-400">
              Card Expire: {user.selectedUser?.bank.cardExpire}
            </p>
            <p className="text-slate-400">
              Card Type: {user.selectedUser?.bank.cardType}
            </p>
            <p className="text-slate-400">
              Currency: {user.selectedUser?.bank.currency}
            </p>
            <p className="text-slate-400">
              IBAN: {user.selectedUser?.bank.iban}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
