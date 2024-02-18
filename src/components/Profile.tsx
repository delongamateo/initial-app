import { User } from "next-auth";
import { FC } from "react";

interface ProfileProps {
  user: User;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-gray-900">Profile</h1>
      </div>
      <div>
        <h2 className="text-3xl font-bold">ID</h2>
        <p>{user.id}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Name</h2>
        <p>{user.name}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Email</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Role</h2>
        <p>{user.role}</p>
      </div>
    </>
  );
};

export default Profile;
