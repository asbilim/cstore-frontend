"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const Product = (props) => {
  const router = useRouter();
  return (
    <div class="product" onClick={() => router.push("/details/" + props.slug)}>
      <Image
        src={props.image || "https://via.placeholder.com/300x200"}
        width="1000"
        height="1000"
        alt={props.name}
      />
      <h2>{props.name}</h2>
      <p>Price: {"$" + props.price}</p>
    </div>
  );
};
