import { getProducts } from "@/functions/get";
import { revalidateTag } from "next/cache";
import { Product } from "@/components/products";
export default async function Home() {
  revalidateTag("products");
  const products = await getProducts();

  return (
    <main>
      <div class="container">
        <section class="products">
          {products &&
            products.map((product) => {
              return <Product {...product} key={product.slug} />;
            })}
        </section>
        <button class="load-more">All Produkts</button>
      </div>
    </main>
  );
}
