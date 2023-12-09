

export default function MarketPlace() {
  const items = [1, 2, 3, 4];

  return (
    <main className="flex min-h-screen jus flex-col p-20 py-16 mx-auto lg:w-[75vw]  " >
      <div className="flex items-center justify-center mb-10 ">
        <h1 className="text-3xl font-bold text-white">7007Lab Governance</h1>
      </div>
      <div className="overflow-x-auto bg-black hidden sm:block">
        <table className="table">
          <thead>
            <tr>
              <th>Model name</th>
              <th>Proposals</th>
              <th>Holders</th>
              <th>Voters</th>
            </tr>
          </thead>
          <tbody >
            {items.map((item) => (
              <tr key={item}>
                <td>AI MODEL NAME</td>
                <td>5</td>
                <td>150</td>
                <td>200</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden">
        <div className="bg-black shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
          {items.map((item) => (
            <div key={item} className="mb-9">
              <h3 className="text-lg leading-6 font-medium text-white">AI MODEL NAME</h3>
              <div className="flex justify-between mb-2">
                <p className="mt-1 max-w-2xl text-sm text-gray-200">Proposals</p>
                <p className="mt-1 max-w-2xl text-sm text-gray-200">5</p>
              </div>
              <div className="flex justify-between">
                <p className="mt-1 max-w-2xl text-sm text-gray-200">Holders</p>
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
    </main>
  )
}