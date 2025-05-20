import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Painel ISO</h2>
        <nav className="space-y-2">
          <Link to="/dashboard/empresas" className="block hover:underline">
            Empresas
          </Link>
          <Link to="/dashboard/processos" className="block hover:underline">
            Processos
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
