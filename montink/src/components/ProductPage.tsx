import { product } from "@/data/product";

export default function ProductPage() {
  return (
    <div>
      <h1>oi</h1>
      <h2>Página do produto será aqui :D</h2>
      <img
        src={product.images["Arc B580 LE"][0]}
        alt="Arc B580 LE"
        width={300}
      />
    </div>
  );
}
