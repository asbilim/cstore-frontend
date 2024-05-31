import ProductDetail from "./sub";
import { getProducts } from "@/functions/get";
import { revalidateTag } from "next/cache";
export default async function Page({ params }) {
  revalidateTag("products");
  const products = await getProducts();
  const { slug } = params;
  const product = products.find((product) => product.slug === slug);

  return <ProductDetail {...product} />;
}
