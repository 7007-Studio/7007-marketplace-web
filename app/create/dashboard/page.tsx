import TokenTable from "./tokenDashboard";

export default async function Page() {
  return (
    <div className="grid grid-cols-6">
      <div></div>
      <TokenTable />
    </div>
  );
}
