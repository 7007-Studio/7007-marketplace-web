import TokenTable from "./tokenDashboard";

export default async function Page() {
  return (
    <div className="grid grid-cols-12">
      <div></div>
      <TokenTable />
    </div>
  );
}
