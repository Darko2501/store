import Image from 'next/image';
import {getProductById} from "@/services/productservices";

export default async function Slug({ params }) {

    const product = await getProductById(params.slug);

    if (!product) {
        return <h1>This page does not exist</h1>;
    }

    return (
        <div className="product-page">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-image">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={700}
                    height={300}
                />
            </div>
            <div className="product-details">
                <p className="product-description">Description: {product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
            </div>
        </div>
    );
}