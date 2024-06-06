import { IUser } from "@/store/interfaces";
import { Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: IUser;
}

export function UsersCard({ user }: UserCardProps) {
  return (
    <Link
      to={`${user.id}`}
      key={user.id}
      className="flex gap-4 transition-all hover:shadow"
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div className="flex flex-col gap-2">
            <img
              className="mx-auto size-32 rounded-full"
              src={user.image}
              alt="User"
            />
            <div className="text-center">
              <h1 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">
                {user.company.title} at {user.company.name}
              </p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
