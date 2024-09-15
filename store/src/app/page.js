import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from "@/services/productservices";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  const data = await getAllProducts();

  return (
      <div>
          <h1 className="main-title">SUPER STORE</h1>
          <SearchBar/>
          <h2 className="products-title">Products</h2>


          <div className="products-grid">
              {data.products.map((item) => (
                  <div key={item.id} className="product-card">
                      <h2>{item.title}</h2>
                      <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={200}
                          height={100}
                      />
                      <p>{item.description}</p>
                      <p className="price">${item.price}</p>
                      <Link href={`/products/${item.id}`}>
                          <button>View Details</button>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  );
}

