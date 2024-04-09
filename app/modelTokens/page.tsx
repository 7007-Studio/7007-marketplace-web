export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1>Invoices</h1>
        </div>
      </div>
    );
  }
