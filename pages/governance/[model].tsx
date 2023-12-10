import Link from "next/link";
import dynamic from "next/dynamic";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((m) => m.ResponsiveLine),
  { ssr: false }
);

export default function ModelGovernance() {
  return (
    <div className="container mx-auto mt-12 md:max-w-6xl bg-[#121212] min-h-screen p-4">
      <div className="flex items-center mb-6">
        <Link href="/governance" className="flex">
          <ArrowLeftIcon className="text-blue-500 mr-2" />
          <span>Back</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="bg-[#1E1E1E] p-6">
            <h2 className="text-xl font-bold mb-4">
              [AI MODEL NAME] Governance
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Revenue Graph (past 7 days)
              </h3>
              <CurvedlineChart className="w-full h-[300px]" />
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">
                Model total token earning
              </h4>
              <p className="text-2xl font-bold">1000 ETH</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Your total token earning
              </h4>
              <p className="text-2xl font-bold">20.3ETH</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#1E1E1E] p-6">
            <h2 className="text-xl font-bold mb-4">Proposal Name</h2>
            <table>
              <th>
                <tr>
                  <th className="w-[100px]">Proposal</th>
                  <th>Status</th>
                </tr>
              </th>
              <tbody>
                <tr>
                  <td className="font-medium">
                    Changing the name of the token
                  </td>
                  <td>In discussion</td>
                </tr>
                <tr>
                  <td className="font-medium">Having a new model design</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td className="font-medium">Having a new model design</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td className="font-medium">Having a new model design</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td className="font-medium">
                    Changing the name of the token
                  </td>
                  <td>In discussion</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">New Proposal</h3>
              <textarea
                className="w-full p-2 bg-[#2D2D2D] text-white mb-4"
                placeholder="Describe your proposal"
                rows={4}
              />
              <button className="btn w-full">Submit Proposal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function CurvedlineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "B",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
              { x: "2018-01-08", y: 13 },
            ],
          },
          {
            id: "A",
            data: [
              { x: "2018-01-01", y: 9 },
              { x: "2018-01-02", y: 8 },
              { x: "2018-01-03", y: 13 },
              { x: "2018-01-04", y: 6 },
              { x: "2018-01-05", y: 8 },
              { x: "2018-01-06", y: 14 },
              { x: "2018-01-07", y: 11 },
              { x: "2018-01-08", y: 12 },
            ],
          },
        ]}
        enableCrosshair={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "X",
          legendOffset: 45,
          legendPosition: "middle",
          format: "%b %d",
          tickValues: "every 1 day",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Y",
          legendOffset: -45,
          legendPosition: "middle",
        }}
        colors={{ scheme: "paired" }}
        pointSize={5}
        pointColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointBorderWidth={2}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
