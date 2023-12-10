import { useRouter } from "next/router";

export default function MarketPlace() {
  const router = useRouter();
  const items = [1, 2, 3, 4];

  return (
    <div className="container mx-auto mt-12 flex min-h-screen flex-col p-20 py-16">
      <h1 className="text-3xl mb-10 font-bold text-white">
        7007Lab Governance
      </h1>
      <div className="hidden md:flex md:justify-center py-8 overflow-x-auto bg-[#191717]">
        <table className="table max-w-2xl">
          <thead>
            <tr>
              <th>Model name</th>
              <th>Proposals</th>
              <th>Holders</th>
              <th>Voters</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item}
                className="hover:cursor-pointer"
                onClick={() => router.push(`/governance/${item}`)}
              >
                <td>AI MODEL NAME</td>
                <td>5</td>
                <td>150</td>
                <td>200</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        <div className="bg-[#191717] shadow overflow-hidden">
          <div className="px-6 md:px-4 py-5">
            {items.map((item) => (
              <div
                key={item}
                className="mb-9 hover:cursor-pointer"
                onClick={() => router.push(`/governance/${item}`)}
              >
                <h3 className="text-lg leading-6 font-medium text-white">
                  AI MODEL NAME
                </h3>
                <div className="flex justify-between mb-2">
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    Proposals
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">5</p>
                </div>
                <div className="flex justify-between">
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
                    Holders
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">150</p>
                </div>
                <div className="flex justify-between">
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">Voters</p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">200</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
