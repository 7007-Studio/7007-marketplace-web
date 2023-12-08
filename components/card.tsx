export default function Card() {
  return (
    <div className="card w-64 bg-black shadow-xl">
      <h2 className="card-title p-4">
        NOV 012
        <div className="badge badge-secondary">MODEL A</div>
      </h2>
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2>Tama d’Amore Per Nata</h2>
        <p>
          Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer
          at risus.
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">View More</div>
        </div>
      </div>
    </div>
  );
}
