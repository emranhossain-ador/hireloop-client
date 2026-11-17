

import { getUsers } from "@/lib/api/User";
import UsersClient, { AdminUserItem } from "./UsersClient";

const UsersPage = async () => {
    const usersData: AdminUserItem = await getUsers();

    return (
        <UsersClient initialUsers={usersData} />
    );
};

export default UsersPage;