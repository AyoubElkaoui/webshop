// src/lib/payload.ts
const PAYLOAD_API_URL = import.meta.env.PAYLOAD_API_URL || 'http://localhost:3000'

export interface Product {
    id: string
    name: string
    slug: string
    description: any
    price: number
    salePrice?: number
    images: Array<{
        image: {
            url: string
            alt: string
        }
        alt: string
    }>
    category: {
        id: string
        title: string
        slug: string
    }
    sizes: Array<{
        size: string
        stock: number
    }>
    colors: Array<{
        colorName: string
        colorCode?: string
    }>
    status: 'active' | 'draft' | 'sold-out'
    featured: boolean
    createdAt: string
}

export interface Order {
    id: string
    orderNumber: string
    customerEmail: string
    customerName: string
    items: Array<{
        product: Product
        quantity: number
        size: string
        color: string
        price: number
    }>
    total: number
    status: 'pending' | 'paid' | 'shipped' | 'delivered'
    paymentId?: string
    createdAt: string
}

export interface Category {
    id: string
    title: string
    slug: string
}

// Fetch alle producten
export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/products?limit=100&where[status][equals]=active`)
        const data = await response.json()
        return data.docs || []
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

// Fetch featured producten voor homepage
export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/products?where[featured][equals]=true&where[status][equals]=active`)
        const data = await response.json()
        return data.docs || []
    } catch (error) {
        console.error('Error fetching featured products:', error)
        return []
    }
}

// Fetch één product op slug
export async function getProduct(slug: string): Promise<Product | null> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/products?where[slug][equals]=${slug}&where[status][equals]=active`)
        const data = await response.json()
        return data.docs[0] || null
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

// Fetch producten per categorie
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/products?where[category.slug][equals]=${categorySlug}&where[status][equals]=active`)
        const data = await response.json()
        return data.docs || []
    } catch (error) {
        console.error('Error fetching products by category:', error)
        return []
    }
}

// Fetch alle categorieën
export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/categories`)
        const data = await response.json()
        return data.docs || []
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}

// Zoek producten
export async function searchProducts(query: string): Promise<Product[]> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/products?where[name][contains]=${encodeURIComponent(query)}&where[status][equals]=active`)
        const data = await response.json()
        return data.docs || []
    } catch (error) {
        console.error('Error searching products:', error)
        return []
    }
}

// Maak nieuwe bestelling
export async function createOrder(orderData: {
    customerEmail: string
    customerName: string
    items: Array<{
        product: string // Product ID
        quantity: number
        size: string
        color: string
        price: number
    }>
    total: number
    paymentId?: string
}): Promise<Order | null> {
    try {
        // Genereer order nummer
        const orderNumber = `ABY-${Date.now()}`

        const response = await fetch(`${PAYLOAD_API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...orderData,
                orderNumber,
                status: 'pending'
            })
        })

        if (!response.ok) {
            throw new Error('Failed to create order')
        }

        const order = await response.json()
        return order
    } catch (error) {
        console.error('Error creating order:', error)
        return null
    }
}

// Fetch order voor confirmatie
export async function getOrder(orderNumber: string): Promise<Order | null> {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/orders?where[orderNumber][equals]=${orderNumber}`)
        const data = await response.json()
        return data.docs[0] || null
    } catch (error) {
        console.error('Error fetching order:', error)
        return null
    }
}