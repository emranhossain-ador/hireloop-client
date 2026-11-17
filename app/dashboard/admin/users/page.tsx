
import { getUsers } from "@/lib/api/UserSever";
import UsersClient, { AdminUsersResponse } from "./UsersClient";

const UsersPage = async () => {
    const usersData: AdminUsersResponse = await getUsers();

    return (
        <UsersClient initialUsers={usersData.users} />
    );
};

export default UsersPage;