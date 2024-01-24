import AdminNavbar from "@/components/admin/admin-nav";

export const metadata = {
  title: "E-shop admin",
  description: "E-shop admin dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminLayout;
