export default function CRMDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">CRM Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Leads</h3>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Customers</h3>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Pipeline</h3>
        </div>
      </div>
    </div>
  );
}
