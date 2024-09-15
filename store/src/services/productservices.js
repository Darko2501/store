
export async function getAllProducts(limit = 9) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products?limit=${limit}`);
    return await response.json();
}


export async function getProductById(productId) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/${productId}`);
    if (response.status===404){
        return false;
    }
    return await response.json();
}

export async function getProductByQuery(query) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch search results');
    }
    return await response.json();
}