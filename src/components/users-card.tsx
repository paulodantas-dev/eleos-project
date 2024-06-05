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
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <ul className="list-inside list-disc text-gray-700">
              <li>Age: {user.age}</li>
              <li>Gender: {user.gender}</li>
              <li>Height: {user.height} cm</li>
              <li>Weight: {user.weight} kg</li>
              <li>Eye Color: {user.eyeColor}</li>
              <li>
                Hair: {user.hair.color} ({user.hair.type})
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-gray-700">
              {user.address.address}, {user.address.city}, {user.address.state},
              {user.address.country}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
