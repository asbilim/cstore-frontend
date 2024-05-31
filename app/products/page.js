import { getProducts } from "@/functions/get";
import { revalidateTag } from "next/cache";
import ProductsPage from "./part";

export default async function Home() {
  revalidateTag("products");
  const products = await getProducts();
  return <ProductsPage products={products} />;
}
