import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUserDetails() {
  return await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      userpic: true,
      role: {
        select: {
          roleName: true,
        },
      },
      email: true,
    },
  });
}

export default async function CompanyMembers() {
  const users = await getAllUserDetails();

  return (
    <section className="px-6 py-16 sm:py-24 lg:py-32 bg-gray-800">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {users.map((user) => (
          <div key={user.id} className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
            <img
              src={user.userpic || "/images/default-user.jpg"}
              alt={user.fullName}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{user.fullName}</h3>
            <p className="text-gray-400">{user.role?.roleName || "No Role"}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
