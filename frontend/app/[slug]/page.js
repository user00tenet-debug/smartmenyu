import { redirect } from "next/navigation"
import { API_URL } from "../apiConfig"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

async function getRestaurant(slug) {
    const res = await fetch(`${API_URL}/${slug}`)
    return res.json()
}

function hasStaticPage(slug) {
    const staticPath = path.join(process.cwd(), "public", "restaurants", slug, "index.html")
    return fs.existsSync(staticPath)
}

export default async function RestaurantPage({ params }) {
    const { slug } = await params
    const restaurant = await getRestaurant(slug)

    // If the restaurant has a static frontend page, redirect to it
    if (restaurant.slug && hasStaticPage(slug)) {
        redirect(`/restaurants/${slug}/index.html`)
    }

    // Fallback: show basic restaurant info
    return (
        <div style={{ padding: 20 }}>
            <h1>{restaurant.name}</h1>
            <p>Slug: {restaurant.slug}</p>
        </div>
    )
}
