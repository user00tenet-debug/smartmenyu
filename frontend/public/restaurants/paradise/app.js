// ==========================================
// RESTAURANT CONFIG
// ==========================================

const restaurantConfig = {
    name: 'Paradise',
    slug: 'paradise',
    apiBaseUrl: 'https://smartmenyu.onrender.com'
};

function escapeHtml(unsafe) {
    if (!unsafe || typeof unsafe !== 'string') return unsafe;
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// ==========================================
// PARADISE RESTAURANT — MENU DATA
// ==========================================

const menuItems = [
    // -------- BIRYANIS --------
    {
        key: 'chicken-biryani', title: 'Chicken Biryani', price: '₹210', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Classic Hyderabadi chicken biryani cooked with aromatic basmati rice, tender chicken pieces, and a blend of traditional spices. A timeless Paradise signature.',
        ingredients: [
            { item: 'Aged basmati rice – 120 grams' },
            { item: 'Bone-in chicken – 180–200 grams' },
            { item: 'Thick yogurt – 60 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Red chili powder – 4 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Coriander powder – 3 grams' },
            { item: 'Cumin powder – 2 grams' },
            { item: 'Garam masala – 2 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Lemon juice – 5 ml' },
            { item: 'Green chili – 1 small' },
            { item: 'Onion – 100 grams' },
            { item: '→ Fry to yield ~35–40 grams birista' },
            { item: 'Fresh mint leaves – 5 grams' },
            { item: 'Fresh coriander leaves – 5 grams' },
            { item: 'Bay leaf – 1 small' },
            { item: 'Green cardamom – 2 pods' },
            { item: 'Cloves – 3 pieces' },
            { item: 'Cinnamon – 1 small 1-inch stick' },
            { item: 'Shah jeera – ½ tsp' },
            { item: 'Black peppercorns – 4–5 pieces' },
            { item: 'Oil – 20 ml' },
            { item: 'Ghee – 10 grams' },
            { item: 'Saffron – 6–8 strands soaked in 15 ml warm milk' },
            { item: 'Kewra water – 2–3 drops' },
            { item: 'Rice ~ 300g' },
            { item: 'Chicken + gravy ~ 180g' },
            { item: 'Total plated biryani: ~450–500g' }
        ],
        nutrients: [
            { label: 'Calories', value: '850–950 kcal' },
            { label: 'Protein', value: '42–48 g' },
            { label: 'Carbohydrates', value: '95–105 g' },
            { label: 'Total Fat', value: '35–45 g' },
            { label: 'Saturated Fat', value: '10–14 g' },
            { label: 'Fiber', value: '3–4 g' },
            { label: 'Sodium', value: '900–1200 mg' },
            { label: 'Cholesterol', value: '110–140 mg' }
        ]
    },
    {
        key: 'mutton-biryani', title: 'Mutton Biryani', price: '₹253', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Succulent mutton pieces slow-cooked with fragrant basmati rice and rich Hyderabadi spices. The crown jewel of Paradise since 1953.',
        ingredients: [
            { item: 'Aged basmati rice – 120 grams' },
            { item: 'Bone-in mutton pieces – 180–200 grams' },
            { item: 'Thick yogurt – 60 grams' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Red chili powder – 4 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Coriander powder – 4 grams' },
            { item: 'Cumin powder – 2 grams' },
            { item: 'Garam masala – 2 grams' },
            { item: 'Salt – 5 grams' },
            { item: 'Lemon juice – 5 ml' },
            { item: 'Green chili – 1 small' },
            { item: 'Onion – 120 grams' },
            { item: 'Fresh mint leaves – 5–7 grams' },
            { item: 'Fresh coriander leaves – 5–7 grams' },
            { item: 'Bay leaf – 1' },
            { item: 'Green cardamom – 2 pods' },
            { item: 'Cloves – 3 pieces' },
            { item: 'Cinnamon – 1 small 1-inch stick' },
            { item: 'Black cardamom – 1 small' },
            { item: 'Shah jeera – ½ tsp' },
            { item: 'Black peppercorns – 4–5 pieces' },
            { item: 'Cooking oil – 25 ml' },
            { item: 'Ghee – 10 grams' },
            { item: 'Saffron – 6–8 strands soaked in 15 ml warm milk' },
            { item: 'Kewra water or rose water – 2–3 drops' },
            { item: 'Cooked rice ~ 300g' },
            { item: 'Cooked mutton + gravy ~ 180–200g' },
            { item: 'Total plated biryani: ~480–500g' }
        ],
        nutrients: [
            { label: 'Calories', value: '950–1100 kcal' },
            { label: 'Protein', value: '40–45 g' },
            { label: 'Carbohydrates', value: '95–105 g' },
            { label: 'Total Fat', value: '45–55 g' },
            { label: 'Saturated Fat', value: '18–22 g' },
            { label: 'Fiber', value: '3–4 g' },
            { label: 'Sodium', value: '1000–1300 mg' },
            { label: 'Cholesterol', value: '130–160 mg' }
        ]
    },
    {
        key: 'egg-biryani', title: 'Egg Biryani', price: '₹154', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Flavorful biryani layered with perfectly boiled eggs and aromatic spiced rice. Simple, satisfying, and delicious.',
        ingredients: [
            { item: 'Aged basmati rice – 120 grams' },
            { item: 'Boiled eggs – 2 pieces (100–110 grams)' },
            { item: 'Thick yogurt – 60 grams' },
            { item: 'Onion (thinly sliced) – 80 grams' },
            { item: 'Tomato (chopped) – 60 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Green chilies – 6 grams' },
            { item: 'Red chili powder – 4 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Biryani masala – 6 grams' },
            { item: 'Fresh mint leaves – 6 grams' },
            { item: 'Fresh coriander leaves – 6 grams' },
            { item: 'Lemon juice – 5 grams' },
            { item: 'Cooking oil or ghee – 25 grams' },
            { item: 'Salt – 5 grams' },
            { item: 'Whole spices (bay leaf, cloves, cardamom, cinnamon) – 3 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '780–880 kcal' },
            { label: 'Protein', value: '24–30 g' },
            { label: 'Carbohydrates', value: '90–100 g' },
            { label: 'Total Fat', value: '30–38 g' },
            { label: 'Saturated Fat', value: '8–12 g' },
            { label: 'Fiber', value: '3–5 g' },
            { label: 'Sugar', value: '3–4 g' },
            { label: 'Sodium', value: '850–1100 mg' },
            { label: 'Cholesterol', value: '370–420 mg' },
            { label: 'Potassium', value: '420–520 mg' },
            { label: 'Calcium', value: '110–150 mg' },
            { label: 'Iron', value: '3–4 mg' }
        ]
    },
    {
        key: 'veg-biryani', title: 'Veg Biryani', price: '₹154', dietType: 'veg', foodCategory: 'biryanis', description: 'Aromatic vegetable biryani made with fresh seasonal vegetables and fragrant basmati rice. A vegetarian delight.',
        ingredients: [
            { item: 'Aged basmati rice – 120 grams' },
            { item: 'Mixed vegetables (carrot, beans, peas, potato) – 150 grams' },
            { item: 'Thick yogurt – 60 grams' },
            { item: 'Onion (thinly sliced) – 80 grams' },
            { item: 'Tomato (chopped) – 60 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Green chilies – 6 grams' },
            { item: 'Red chili powder – 4 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Biryani masala – 6 grams' },
            { item: 'Fresh mint leaves – 6 grams' },
            { item: 'Fresh coriander leaves – 6 grams' },
            { item: 'Lemon juice – 5 grams' },
            { item: 'Cooking oil or ghee – 25 grams' },
            { item: 'Salt – 5 grams' },
            { item: 'Whole spices (bay leaf, cloves, cardamom, cinnamon) – 3 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '650–750 kcal' },
            { label: 'Protein', value: '14–18 g' },
            { label: 'Carbohydrates', value: '95–105 g' },
            { label: 'Total Fat', value: '22–30 g' },
            { label: 'Saturated Fat', value: '6–9 g' },
            { label: 'Fiber', value: '6–8 g' },
            { label: 'Sugar', value: '6–8 g' },
            { label: 'Sodium', value: '750–950 mg' },
            { label: 'Cholesterol', value: '15–25 mg' },
            { label: 'Potassium', value: '500–650 mg' },
            { label: 'Calcium', value: '120–160 mg' },
            { label: 'Iron', value: '3–4 mg' }
        ]
    },

    // -------- STARTERS --------
    {
        key: 'chilli-chicken', title: 'Chilli Chicken', price: '₹264', dietType: 'non-veg', foodCategory: 'starters', description: 'Spicy, tangy chicken tossed with green chillies, bell peppers, and aromatic sauces. A fiery Indo-Chinese starter!',
        ingredients: [
            { item: 'Boneless chicken – 150 grams' },
            { item: 'Cornflour – 25 grams' },
            { item: 'All-purpose flour – 15 grams' },
            { item: 'Egg – 1 piece (50 grams)' },
            { item: 'Onion (cubed) – 70 grams' },
            { item: 'Capsicum (cubed) – 70 grams' },
            { item: 'Green chilies – 8 grams' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Soy sauce – 10 grams' },
            { item: 'Chili sauce – 15 grams' },
            { item: 'Tomato ketchup – 15 grams' },
            { item: 'Black pepper powder – 2 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Spring onions – 10 grams' },
            { item: 'Cooking oil (for frying) – 35 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '420–520 kcal' },
            { label: 'Protein', value: '32–36 g' },
            { label: 'Carbohydrates', value: '18–25 g' },
            { label: 'Total Fat', value: '22–28 g' },
            { label: 'Saturated Fat', value: '5–7 g' },
            { label: 'Fiber', value: '2–3 g' },
            { label: 'Sugar', value: '4–6 g' },
            { label: 'Sodium', value: '950–1200 mg' },
            { label: 'Cholesterol', value: '120–150 mg' },
            { label: 'Potassium', value: '420–520 mg' },
            { label: 'Calcium', value: '40–60 mg' },
            { label: 'Iron', value: '2–3 mg' }
        ]
    },
    {
        key: 'chicken-65', title: 'Chicken 65', price: '₹264', dietType: 'non-veg', foodCategory: 'starters', description: 'Iconic deep-fried chicken bites marinated in a spicy red masala. Crispy on the outside, juicy on the inside.',
        ingredients: [
            { item: 'Boneless chicken – 150 grams' },
            { item: 'Cornflour – 20 grams' },
            { item: 'Rice flour – 15 grams' },
            { item: 'Egg – 1 piece (50 grams)' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Red chili powder – 6 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Garam masala – 2 grams' },
            { item: 'Curry leaves – 3 grams' },
            { item: 'Green chilies – 8 grams' },
            { item: 'Lemon juice – 5 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Cooking oil (for deep frying) – 40 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '450–550 kcal' },
            { label: 'Protein', value: '32–36 g' },
            { label: 'Carbohydrates', value: '12–18 g' },
            { label: 'Total Fat', value: '28–34 g' },
            { label: 'Saturated Fat', value: '6–8 g' },
            { label: 'Fiber', value: '1–2 g' },
            { label: 'Sugar', value: '1–2 g' },
            { label: 'Sodium', value: '800–1000 mg' },
            { label: 'Cholesterol', value: '130–160 mg' },
            { label: 'Potassium', value: '420–500 mg' },
            { label: 'Calcium', value: '40–60 mg' },
            { label: 'Iron', value: '2–3 mg' }
        ]
    },
    {
        key: 'pepper-chicken', title: 'Pepper Chicken', price: '₹264', dietType: 'non-veg', foodCategory: 'starters', description: 'Tender chicken pieces tossed in a bold cracked pepper and spice sauce. A peppery delight for spice lovers.',
        ingredients: [
            { item: 'Boneless chicken – 250 grams' },
            { item: 'Onion – 120 grams' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Green chilies – 1–2 small' },
            { item: 'Curry leaves – 8–10 leaves' },
            { item: 'Freshly crushed black pepper – 5–6 grams' },
            { item: 'Red chili powder – 2 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Coriander powder – 3 grams' },
            { item: 'Garam masala – 2 grams' },
            { item: 'Salt – 4–5 grams' },
            { item: 'Fresh coriander leaves – 5 grams' },
            { item: 'Lemon juice – 5 ml' },
            { item: 'Cooking oil – 20 ml' },
            { item: 'Ghee – 1 tsp' },
            { item: 'Fennel seeds – ½ tsp' },
            { item: 'Cinnamon – small ½-inch piece' },
            { item: 'Cloves – 2 pieces' }
        ],
        nutrients: [
            { label: 'Calories', value: '450–550 kcal' },
            { label: 'Protein', value: '45–55 g' },
            { label: 'Carbohydrates', value: '8–12 g' },
            { label: 'Total Fat', value: '28–35 g' },
            { label: 'Saturated Fat', value: '6–8 g' },
            { label: 'Fiber', value: '1–2 g' },
            { label: 'Sodium', value: '700–900 mg' },
            { label: 'Cholesterol', value: '120–140 mg' }
        ]
    },
    {
        key: 'paneer-65', title: 'Paneer 65', price: '₹196', dietType: 'veg', foodCategory: 'starters', description: 'Crispy paneer cubes marinated in spicy batter and deep-fried to golden perfection. A vegetarian twist on a classic.',
        ingredients: [
            { item: 'Paneer (cottage cheese) – 150 grams' },
            { item: 'Cornflour – 20 grams' },
            { item: 'Rice flour – 15 grams' },
            { item: 'Yogurt – 40 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Red chili powder – 6 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Garam masala – 2 grams' },
            { item: 'Curry leaves – 3 grams' },
            { item: 'Green chilies – 8 grams' },
            { item: 'Lemon juice – 5 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Cooking oil (for deep frying) – 35 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '520–620 kcal' },
            { label: 'Protein', value: '22–26 g' },
            { label: 'Carbohydrates', value: '16–22 g' },
            { label: 'Total Fat', value: '36–42 g' },
            { label: 'Saturated Fat', value: '16–20 g' },
            { label: 'Fiber', value: '1–2 g' },
            { label: 'Sugar', value: '3–5 g' },
            { label: 'Sodium', value: '650–850 mg' },
            { label: 'Cholesterol', value: '60–80 mg' },
            { label: 'Potassium', value: '220–300 mg' },
            { label: 'Calcium', value: '420–500 mg' },
            { label: 'Iron', value: '1–2 mg' }
        ]
    },
    {
        key: 'veg-manchurian', title: 'Veg Manchurian', price: '₹189', dietType: 'veg', foodCategory: 'starters', description: 'Crispy vegetable balls tossed in a tangy, spicy Manchurian sauce. Indo-Chinese comfort food at its best.',
        ingredients: [
            { item: 'Cabbage (finely chopped) – 100 grams' },
            { item: 'Carrot (grated) – 60 grams' },
            { item: 'Capsicum (finely chopped) – 40 grams' },
            { item: 'Spring onions – 20 grams' },
            { item: 'Cornflour – 35 grams' },
            { item: 'All-purpose flour – 20 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Green chilies – 6 grams' },
            { item: 'Soy sauce – 12 grams' },
            { item: 'Chili sauce – 15 grams' },
            { item: 'Tomato ketchup – 15 grams' },
            { item: 'Black pepper powder – 2 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Cooking oil (for frying) – 35 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '320–400 kcal' },
            { label: 'Protein', value: '8–10 g' },
            { label: 'Carbohydrates', value: '40–48 g' },
            { label: 'Total Fat', value: '14–18 g' },
            { label: 'Saturated Fat', value: '2–3 g' },
            { label: 'Fiber', value: '4–6 g' },
            { label: 'Sugar', value: '5–7 g' },
            { label: 'Sodium', value: '900–1100 mg' },
            { label: 'Cholesterol', value: '0 mg' },
            { label: 'Potassium', value: '350–450 mg' },
            { label: 'Calcium', value: '50–70 mg' },
            { label: 'Iron', value: '2–3 mg' }
        ]
    },

    // -------- KEBABS --------
    {
        key: 'chicken-tikka-kebab', title: 'Chicken Tikka Kebab', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Tender chicken chunks marinated in yogurt and spices, grilled to smoky perfection in the tandoor.',
        ingredients: [
            { item: 'Boneless chicken – 180 grams' },
            { item: 'Thick yogurt – 70 grams' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Red chili powder – 5 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Garam masala – 3 grams' },
            { item: 'Cumin powder – 2 grams' },
            { item: 'Lemon juice – 8 grams' },
            { item: 'Fresh coriander leaves – 6 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Cooking oil or butter – 15 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '320–380 kcal' },
            { label: 'Protein', value: '36–40 g' },
            { label: 'Carbohydrates', value: '4–6 g' },
            { label: 'Total Fat', value: '16–20 g' },
            { label: 'Saturated Fat', value: '4–6 g' },
            { label: 'Fiber', value: '1 g' },
            { label: 'Sugar', value: '2–3 g' },
            { label: 'Sodium', value: '650–850 mg' },
            { label: 'Cholesterol', value: '120–150 mg' },
            { label: 'Potassium', value: '420–520 mg' },
            { label: 'Calcium', value: '90–120 mg' },
            { label: 'Iron', value: '2–3 mg' }
        ]
    },
    {
        key: 'tandoori-chicken', title: 'Tandoori Chicken', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Our classic tandoori chicken, marinated overnight and chargrilled to perfection.',
        ingredients: [
            { item: 'Chicken (with bone) – 250 grams' },
            { item: 'Thick yogurt – 80 grams' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Red chili powder – 6 grams' },
            { item: 'Turmeric powder – 1 gram' },
            { item: 'Garam masala – 3 grams' },
            { item: 'Cumin powder – 2 grams' },
            { item: 'Lemon juice – 10 grams' },
            { item: 'Kasuri methi (dried fenugreek leaves) – 2 grams' },
            { item: 'Salt – 5 grams' },
            { item: 'Cooking oil or butter – 15 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '300–360 kcal' },
            { label: 'Protein', value: '34–38 g' },
            { label: 'Carbohydrates', value: '3–5 g' },
            { label: 'Total Fat', value: '14–18 g' },
            { label: 'Saturated Fat', value: '4–6 g' },
            { label: 'Fiber', value: '1 g' },
            { label: 'Sugar', value: '2–3 g' },
            { label: 'Sodium', value: '700–900 mg' },
            { label: 'Cholesterol', value: '130–160 mg' },
            { label: 'Potassium', value: '420–520 mg' },
            { label: 'Calcium', value: '80–110 mg' },
            { label: 'Iron', value: '2–3 mg' }
        ]
    },
    {
        key: 'chicken-reshmi-kebab', title: 'Chicken Reshmi Kebab', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Silky smooth chicken kebabs made with cream and mild spices. Melt-in-your-mouth tender.',
        ingredients: [
            { item: 'Boneless chicken – 250 grams' },
            { item: 'Thick fresh cream – 40 ml' },
            { item: 'Hung curd – 50 grams' },
            { item: 'Cashew paste – 20 grams' },
            { item: 'Ginger-garlic paste – 12 grams' },
            { item: 'Lemon juice – 5 ml' },
            { item: 'White pepper powder – 1 tsp' },
            { item: 'Green chili paste – ½–1 tsp' },
            { item: 'Garam masala – ½ tsp' },
            { item: 'Cardamom powder – ¼ tsp' },
            { item: 'Salt – 4–5 grams' },
            { item: 'Fresh coriander leaves – 1 tbsp' },
            { item: 'Fresh mint leaves – 1 tbsp' },
            { item: 'Butter or ghee – 1–2 tbsp' },
            { item: 'Oil – 1 tbsp' }
        ],
        nutrients: [
            { label: 'Calories', value: '600–700 kcal' },
            { label: 'Protein', value: '45–50 g' },
            { label: 'Carbohydrates', value: '8–12 g' },
            { label: 'Total Fat', value: '45–55 g' },
            { label: 'Saturated Fat', value: '18–22 g' },
            { label: 'Fiber', value: '1 g' },
            { label: 'Sodium', value: '700–900 mg' },
            { label: 'Cholesterol', value: '140–170 mg' }
        ]
    },
    {
        key: 'chicken-garlic-kebab', title: 'Chicken Garlic Kebab', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Juicy chicken kebabs infused with roasted garlic and aromatic herbs. Bold, savory, and irresistible.',
        ingredients: [
            { item: 'Boneless chicken – 180 grams' },
            { item: 'Garlic (finely minced) – 15 grams' },
            { item: 'Thick yogurt – 60 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Black pepper powder – 3 grams' },
            { item: 'Cumin powder – 2 grams' },
            { item: 'Lemon juice – 8 grams' },
            { item: 'Fresh coriander leaves – 6 grams' },
            { item: 'Green chilies – 5 grams' },
            { item: 'Salt – 4 grams' },
            { item: 'Cooking oil or butter – 15 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '310–370 kcal' },
            { label: 'Protein', value: '36–40 g' },
            { label: 'Carbohydrates', value: '4–6 g' },
            { label: 'Total Fat', value: '15–19 g' },
            { label: 'Saturated Fat', value: '4–6 g' },
            { label: 'Fiber', value: '1 g' },
            { label: 'Sugar', value: '2–3 g' },
            { label: 'Sodium', value: '650–850 mg' },
            { label: 'Cholesterol', value: '120–150 mg' },
            { label: 'Potassium', value: '420–520 mg' },
            { label: 'Calcium', value: '80–110 mg' },
            { label: 'Iron', value: '2–3 mg' }
        ]
    },

    // -------- CURRIES --------

    // -------- INDIAN BREADS --------

    // -------- DESSERTS --------

    {
        key: 'double-ka-meetha', title: 'Double Ka Meetha', price: '₹73', dietType: 'veg', foodCategory: 'desserts', description: 'Rich Hyderabadi bread pudding soaked in sweetened milk, flavored with cardamom, and garnished with nuts. Sweet indulgence.',
        ingredients: [
            { item: 'White bread slices – 3 pieces (90 grams)' },
            { item: 'Milk – 200 ml' },
            { item: 'Sugar – 50 grams' },
            { item: 'Ghee (clarified butter) – 25 grams' },
            { item: 'Condensed milk – 30 grams' },
            { item: 'Cashews – 10 grams' },
            { item: 'Almonds – 10 grams' },
            { item: 'Raisins – 8 grams' },
            { item: 'Cardamom powder – 1 gram' },
            { item: 'Saffron strands – 0.2 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '500–620 kcal' },
            { label: 'Protein', value: '10–14 g' },
            { label: 'Carbohydrates', value: '65–75 g' },
            { label: 'Total Fat', value: '22–28 g' },
            { label: 'Saturated Fat', value: '12–16 g' },
            { label: 'Fiber', value: '2–3 g' },
            { label: 'Sugar', value: '40–50 g' },
            { label: 'Sodium', value: '180–240 mg' },
            { label: 'Cholesterol', value: '40–60 mg' },
            { label: 'Potassium', value: '220–300 mg' },
            { label: 'Calcium', value: '180–220 mg' },
            { label: 'Iron', value: '1–2 mg' }
        ]
    },

    // -------- BEVERAGES --------
    {
        key: 'diet-coke', title: 'Diet Coke', price: '₹50', dietType: 'veg', foodCategory: 'beverages', description: 'Zero-calorie cola for a guilt-free refreshment alongside your meal.',
        ingredients: [
            { item: 'Carbonated water – 320 ml' },
            { item: 'Caramel color – 0.5 grams' },
            { item: 'Phosphoric acid – 0.2 grams' },
            { item: 'Aspartame (artificial sweetener) – 0.18 grams' },
            { item: 'Acesulfame potassium – 0.04 grams' },
            { item: 'Natural flavors – 0.08 grams' },
            { item: 'Caffeine – 0.03 grams' },
            { item: 'Sodium benzoate (preservative) – 0.02 grams' },
            { item: 'Citric acid – 0.05 grams' }
        ],
        nutrients: [
            { label: 'Calories', value: '0–2 kcal' },
            { label: 'Protein', value: '0 g' },
            { label: 'Carbohydrates', value: '0 g' },
            { label: 'Total Fat', value: '0 g' },
            { label: 'Saturated Fat', value: '0 g' },
            { label: 'Fiber', value: '0 g' },
            { label: 'Sugar', value: '0 g' },
            { label: 'Sodium', value: '35–45 mg' },
            { label: 'Cholesterol', value: '0 mg' },
            { label: 'Potassium', value: '0–5 mg' },
            { label: 'Calcium', value: '0 mg' },
            { label: 'Iron', value: '0 mg' }
        ]
    },

];

const foodCategories = [
    { key: 'biryanis', title: 'Biryanis', icon: 'assets/category-icons/biryanis.png' },
    { key: 'starters', title: 'Starters', icon: 'assets/category-icons/starters.png' },
    { key: 'kebabs', title: 'Kebabs', icon: 'assets/category-icons/kebabs.png' },
    { key: 'curries', title: 'Curries', icon: 'assets/category-icons/curries.png' },
    { key: 'indian-breads', title: 'Indian Breads', icon: 'assets/category-icons/indian-breads.png' },
    { key: 'desserts', title: 'Desserts', icon: 'assets/category-icons/desserts.png' },
    { key: 'beverages', title: 'Beverages', icon: 'assets/category-icons/beverages.png' }
];

// ==========================================
// CART HELPERS (localStorage)
// ==========================================

function getCart() {
    try { return JSON.parse(localStorage.getItem('paradiseCart')) || []; }
    catch (e) { return []; }
}

function saveCart(cart) {
    localStorage.setItem('paradiseCart', JSON.stringify(cart));
}

function updateStickyCartBtn() {
    const btn = document.getElementById('stickyCartBtn');
    if (!btn) return;
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    if (total > 0) {
        btn.style.display = 'flex';
        btn.querySelector('.sticky-cart-count').textContent = total + ' item' + (total > 1 ? 's' : '');
    } else {
        btn.style.display = 'none';
    }
    initStickyPayBtn();
    updateScrollTopPosition();
}

function updateScrollTopPosition() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;
    const cartBtn = document.getElementById('stickyCartBtn');
    const payBtn = document.getElementById('stickyPayBtn');
    const cartVisible = cartBtn && cartBtn.style.display !== 'none';
    const payVisible = payBtn && payBtn.style.display !== 'none';
    scrollBtn.classList.toggle('raised', cartVisible || payVisible);
}

// ==========================================
// APP INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Paradise Restaurant App initialized');

    // Clear cart on first visit (new tab/window), preserve within session
    if (!sessionStorage.getItem('paradiseSessionActive')) {
        localStorage.removeItem('paradiseCart');
        sessionStorage.setItem('paradiseSessionActive', 'true');
    }

    readTableNumber();
    logScanEvent();

    initDietTypeSelector();
    initFoodCategoryDropdown();
    renderMenu();
    initItemModal();
    initAddSheet();
    updateStickyCartBtn();
    initStickyPayBtn();
    initScrollToTop();
    initCallWaiterBtn();
});

// Refresh cart/pay buttons when navigating back to this page
// Multiple listeners for cross-browser/mobile compatibility
window.addEventListener('pageshow', () => {
    updateStickyCartBtn();
});
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        updateStickyCartBtn();
    }
});
window.addEventListener('focus', () => {
    updateStickyCartBtn();
});

// ==========================================
// TABLE NUMBER (from QR URL)
// ==========================================

function readTableNumber() {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    const tableBadge = document.getElementById('tableBadge');

    // Only update if ?table= is present in URL (don't overwrite on redirects that strip it)
    if (tableParam) {
        localStorage.setItem('paradiseTable', tableParam);
        if (tableBadge) {
            tableBadge.textContent = `Table ${tableParam}`;
            tableBadge.style.display = 'inline-block';
        }
        console.log('Table number set:', tableParam);
    } else {
        // Step 1: Check if table is stored in localStorage
        const storedTable = localStorage.getItem('paradiseTable');
        if (storedTable && storedTable !== 'unknown') {
            // Step 2: Restore to URL without reloading
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('table', storedTable);
            window.history.replaceState({}, '', newUrl);
            
            if (tableBadge) {
                tableBadge.textContent = `Table ${storedTable}`;
                tableBadge.style.display = 'inline-block';
            }
            console.log('Table number restored from storage:', storedTable);
        } else {
            localStorage.setItem('paradiseTable', 'unknown');
            if (tableBadge) tableBadge.style.display = 'none';
        }
    }
}

// ==========================================
// LOG SCAN EVENT (Analytics)
// ==========================================

function logScanEvent() {
    // Only log once per session to avoid spamming on refresh
    if (sessionStorage.getItem('scanLogged_paradise')) return;

    const tableNumber = localStorage.getItem('paradiseTable') || 'unknown';

    fetch(`${restaurantConfig.apiBaseUrl}/api/${restaurantConfig.slug}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber })
    })
        .then(() => sessionStorage.setItem('scanLogged_paradise', 'true'))
        .catch(err => console.log('Scan log failed:', err));
}


// ==========================================
// ACTIVE FILTERS STATE
// ==========================================

let activeFilters = {
    dietType: null,       // null | 'veg' | 'non-veg'
    foodCategory: null    // null | 'biryanis' | 'starters' | etc.
};

// ==========================================
// MENU RENDERING
// ==========================================

function renderMenu() {
    const container = document.getElementById('menuContainer');
    if (!container) return;

    // Filter items by diet type (hard filter)
    let filteredItems = menuItems;
    if (activeFilters.dietType) {
        filteredItems = menuItems.filter(item => item.dietType === activeFilters.dietType);
    }

    // Determine category display order (selected category floats to top)
    let orderedCategories = [...foodCategories];
    if (activeFilters.foodCategory) {
        const selectedIdx = orderedCategories.findIndex(c => c.key === activeFilters.foodCategory);
        if (selectedIdx > 0) {
            const [selected] = orderedCategories.splice(selectedIdx, 1);
            orderedCategories.unshift(selected);
        }
    }

    // Build HTML
    let html = '';
    orderedCategories.forEach(category => {
        const categoryItems = filteredItems.filter(item => item.foodCategory === category.key);
        if (categoryItems.length === 0) return; // Skip empty categories

        const categoryTitle = escapeHtml(category.title);
        const categoryIcon = escapeHtml(category.icon);

        html += `
            <section class="menu-section" data-food-category="${escapeHtml(category.key)}">
                <div class="menu-header">
                    <img src="${categoryIcon}" alt="${categoryTitle}" class="menu-category-icon"
                        onerror="this.style.display='none';">
                    <h2 class="menu-title">${categoryTitle}</h2>
                </div>
                <ul class="menu-list">
                    ${categoryItems.map(item => renderMenuItem(item)).join('')}
                </ul>
            </section>
        `;
    });

    if (html === '') {
        html = `
            <div class="empty-state">
                <span class="empty-icon">🍽️</span>
                <p>No items found in this category yet.</p>
            </div>
        `;
    }

    container.innerHTML = html;

    // Re-bind click handlers for the newly rendered items
    bindItemClickHandlers();
}

function renderMenuItem(item) {
    const dietClass = item.dietType === 'veg' ? 'veg-indicator' : 'non-veg-indicator';
    const escapedTitle = escapeHtml(item.title);
    const escapedPrice = escapeHtml(item.price);
    const escapedKey = escapeHtml(item.key);

    return `
        <li class="menu-item clickable-item" data-item="${escapedKey}">
            <div class="item-info">
                <span class="item-name">
                    <span class="diet-dot ${dietClass}"></span>
                    ${escapedTitle}
                </span>
                <div class="item-price-row">
                    <span class="item-price">${escapedPrice}</span>
                    <button class="add-btn" 
                        data-key="${escapedKey}" 
                        data-title="${escapedTitle}" 
                        data-price="${escapedPrice}"
                        onclick="handleAddClick(event, this)">Add</button>
                </div>
            </div>
            <div class="item-thumbnail">
                <img src="assets/thumbnails/${escapedKey}.png" alt="${escapedTitle}"
                    class="thumbnail-image"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="thumbnail-placeholder">Image Placeholder</div>
            </div>
        </li>
    `;
}

// Global handler to avoid unsafe inline string interpolation
function handleAddClick(event, btn) {
    const key = btn.dataset.key;
    const title = btn.dataset.title;
    const price = btn.dataset.price;
    openAddSheet(event, key, title, price);
}

// ==========================================
// DIET TYPE SELECTOR
// ==========================================

function initDietTypeSelector() {
    const buttons = document.querySelectorAll('.diet-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const diet = btn.dataset.diet;

            if (activeFilters.dietType === diet) {
                // Deselect if already selected
                activeFilters.dietType = null;
                buttons.forEach(b => b.classList.remove('active'));
            } else {
                // Select this diet type
                activeFilters.dietType = diet;
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }

            renderMenu();
            console.log('Diet filter:', activeFilters.dietType);
        });
    });
}

// ==========================================
// FOOD CATEGORY DROPDOWN
// ==========================================

function initFoodCategoryDropdown() {
    const dropdownBtn = document.getElementById('foodCategoryBtn');
    const dropdownList = document.getElementById('foodCategoryList');
    const dropdownText = dropdownBtn?.querySelector('.dropdown-text');
    const dropdownItems = document.querySelectorAll('#foodCategoryList .dropdown-item');

    if (!dropdownBtn || !dropdownList) return;

    // Toggle dropdown
    dropdownBtn.addEventListener('click', () => {
        dropdownBtn.classList.toggle('active');
        dropdownList.classList.toggle('open');
    });

    // Handle item selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            const categoryName = item.textContent.trim();

            if (category === 'all') {
                activeFilters.foodCategory = null;
                if (dropdownText) dropdownText.textContent = 'All Categories';
            } else {
                activeFilters.foodCategory = category;
                if (dropdownText) dropdownText.textContent = categoryName;
            }

            // Update selected state
            dropdownItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            // Close dropdown
            dropdownBtn.classList.remove('active');
            dropdownList.classList.remove('open');

            renderMenu();
            console.log('Food category filter:', activeFilters.foodCategory);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownBtn.classList.remove('active');
            dropdownList.classList.remove('open');
        }
    });
}

// ==========================================
// ITEM MODAL
// ==========================================
let isMuted = true; // Global mute state — persists across items

function initItemModal() {
    const modal = document.getElementById('itemModal');
    const modalClose = document.getElementById('modalClose');

    if (!modal) return;

    // Close modal on X button
    if (modalClose) {
        modalClose.addEventListener('click', () => closeModal());
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Sound toggle button
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            soundToggle.classList.toggle('muted', isMuted);
            soundToggle.title = isMuted ? 'Unmute' : 'Mute';
            // Apply to all videos immediately
            const videos = document.querySelectorAll('#videosPanel video');
            videos.forEach(v => { v.muted = isMuted; });
        });
    }

    // Tab switching
    const tabs = document.querySelectorAll('.modal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    // Carousel navigation
    const carouselArrows = document.querySelectorAll('.carousel-arrow');
    carouselArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const carouselType = arrow.dataset.carousel;
            const isPrev = arrow.classList.contains('carousel-prev');
            navigateCarousel(carouselType, isPrev ? -1 : 1);
        });
    });

    // Bind item clicks for initially rendered items
    bindItemClickHandlers();
}

function bindItemClickHandlers() {
    const modal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    document.querySelectorAll('.clickable-item').forEach(item => {
        item.addEventListener('click', () => {
            const itemKey = item.dataset.item;
            const data = menuItems.find(m => m.key === itemKey);
            if (!data) return;

            // Set modal content
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;

            // Load item images
            document.getElementById('itemImage1').src = `assets/images/${itemKey}/${itemKey}_image_1.png`;
            document.getElementById('itemImage2').src = `assets/images/${itemKey}/${itemKey}_image_2.png`;
            document.getElementById('itemImage3').src = `assets/images/${itemKey}/${itemKey}_image_3.png`;

            // Load item videos
            document.getElementById('itemVideo1').src = `assets/videos/${itemKey}/${itemKey}_video_1.mp4`;
            document.getElementById('itemVideo2').src = `assets/videos/${itemKey}/${itemKey}_video_2.mp4`;
            document.getElementById('itemVideo3').src = `assets/videos/${itemKey}/${itemKey}_video_3.mp4`;

            // Populate Ingredients Tab
            const ingredientsList = document.getElementById('ingredientsList');
            if (ingredientsList) {
                if (data.ingredients && data.ingredients.length > 0) {
                    ingredientsList.innerHTML = data.ingredients.map(entry => {
                        if (entry.heading) {
                            return `<li class="info-item ingredient-heading">${escapeHtml(entry.heading)}</li>`;
                        }
                        return `<li class="info-item">${escapeHtml(entry.item)}</li>`;
                    }).join('');
                } else {
                    ingredientsList.innerHTML = '<li class="info-item">Ingredients coming soon</li>';
                }
            }

            // Populate Nutrients Tab
            const nutrientsList = document.getElementById('nutrientsList');
            if (nutrientsList) {
                if (data.nutrients && data.nutrients.length > 0) {
                    let nutrHtml = data.nutrients.map(entry => {
                        return `<li class="info-item"><strong>${escapeHtml(entry.label)}:</strong> ${escapeHtml(entry.value)}</li>`;
                    }).join('');
                    
                    // Add Caution Message
                    nutrHtml += `
                        <div class="nutritional-caution">
                            <h4 class="caution-title">Caution</h4>
                            <p class="caution-text">Nutritional values are approximate and not exact. This information is for general guidance only and is not medical advice.</p>
                        </div>
                    `;
                    nutrientsList.innerHTML = nutrHtml;
                } else {
                    nutrientsList.innerHTML = '<li class="info-item">Nutritional info coming soon</li>';
                }
            }

            // Open modal
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            switchTab('images');
        });
    });
}

function closeModal() {
    const modal = document.getElementById('itemModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';

    // Pause all videos
    const videos = modal.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.modal-tab');
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.modal-tab[data-tab="${tabName}"]`);
    if (activeTab) activeTab.classList.add('active');

    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`${tabName}Panel`);
    if (activePanel) activePanel.classList.add('active');

    // Handle video playback
    const videoPanel = document.getElementById('videosPanel');
    if (videoPanel) {
        const videos = videoPanel.querySelectorAll('video');
        if (tabName === 'videos') {
            const activeItem = videoPanel.querySelector('.carousel-item.active');
            if (activeItem) {
                const video = activeItem.querySelector('video');
                if (video) {
                    video.muted = isMuted;
                    video.play().catch(e => console.log('Auto-play prevented:', e));
                }
            }
        } else {
            videos.forEach(v => { v.pause(); v.currentTime = 0; });
        }
    }
}

function navigateCarousel(type, direction) {
    const panel = document.getElementById(`${type}Panel`);
    if (!panel) return;

    const items = panel.querySelectorAll('.carousel-item');
    const total = items.length;
    let currentIndex = 0;

    items.forEach((item, index) => {
        if (item.classList.contains('active')) currentIndex = index;
    });

    // Pause current video if in videos panel
    if (type === 'videos') {
        const currentVideo = items[currentIndex].querySelector('video');
        if (currentVideo) { currentVideo.pause(); currentVideo.currentTime = 0; }
    }

    // Calculate new index (infinite loop)
    let newIndex = (currentIndex + direction + total) % total;

    // Update active state
    items.forEach(item => item.classList.remove('active'));
    items[newIndex].classList.add('active');

    // Play new video if in videos panel
    if (type === 'videos') {
        const newVideo = items[newIndex].querySelector('video');
        if (newVideo) {
            newVideo.muted = isMuted;
            newVideo.play().catch(e => console.log('Auto-play prevented:', e));
        }
    }
}


// ==========================================
// ADD ITEM BOTTOM SHEET
// ==========================================

function openAddSheet(event, key, title, price) {
    event.stopPropagation();
    const overlay = document.getElementById('addSheetOverlay');
    if (!overlay) return;

    document.getElementById('addSheetName').textContent = title;
    document.getElementById('addSheetPrice').textContent = price;
    document.getElementById('qtyValue').textContent = '1';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeAddSheet() {
    const overlay = document.getElementById('addSheetOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function initAddSheet() {
    const overlay = document.getElementById('addSheetOverlay');
    const closeBtn = document.getElementById('addSheetClose');
    const minusBtn = document.getElementById('qtyMinus');
    const plusBtn = document.getElementById('qtyPlus');
    const qtyEl = document.getElementById('qtyValue');

    if (!overlay) return;

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAddSheet();
    });

    // Close on X button
    if (closeBtn) closeBtn.addEventListener('click', closeAddSheet);

    // Quantity controls
    if (minusBtn) {
        minusBtn.addEventListener('click', () => {
            const current = parseInt(qtyEl.textContent, 10);
            if (current > 1) qtyEl.textContent = current - 1;
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', () => {
            const current = parseInt(qtyEl.textContent, 10);
            qtyEl.textContent = current + 1;
        });
    }

    // Go to Cart button — save item to cart then navigate
    const orderBtn = document.getElementById('addSheetOrderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            const name = document.getElementById('addSheetName').textContent;
            const price = document.getElementById('addSheetPrice').textContent;
            const qty = parseInt(document.getElementById('qtyValue').textContent, 10);

            const cart = getCart();
            // Find an existing item that is NOT locked yet
            const existing = cart.find(i => i.name === name && !i.locked);
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ name, price, qty });
            }
            saveCart(cart);
            closeAddSheet();
            window.location.href = 'cart.html';
        });
    }
}

// ==========================================
// STICKY PAY THE BILL BUTTON (menu page)
// ==========================================

function initStickyPayBtn() {
    const btn = document.getElementById('stickyPayBtn');
    if (!btn) return;

    // Show/hide based on cart
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    btn.style.display = total > 0 ? 'flex' : 'none';

    // Click handler (attach only once)
    if (!btn.dataset.initialized) {
        btn.addEventListener('click', async () => {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items first.');
                return;
            }

            const cartTotal = cart.reduce((sum, item) => {
                const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
                return sum + (priceNum * item.qty);
            }, 0);

            // Log payment event to analytics (fire-and-forget)
            const tableNumber = localStorage.getItem('paradiseTable') || 'unknown';

            // Step 2: Retrieve order IDs from session to link payment to multiple orders
            let orderIds = [];
            try {
                const stored = sessionStorage.getItem('sessionOrderIds');
                if (stored) orderIds = JSON.parse(stored);
            } catch (e) { }

            fetch(`${restaurantConfig.apiBaseUrl}/api/${restaurantConfig.slug}/payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableNumber, amount: cartTotal, items: cart, orderIds })
            }).catch(err => console.log('Analytics log failed:', err));

            saveCart([]);
            btn.style.display = 'none';
            const cartBtn = document.getElementById('stickyCartBtn');
            if (cartBtn) cartBtn.style.display = 'none';
            updateScrollTopPosition();

            // Step 3: Clear session order IDs so next customer starts fresh
            sessionStorage.removeItem('sessionOrderIds');

            // Get UPI URL from backend (secure — no raw UPI ID in frontend)
            try {
                const resp = await fetch(`${restaurantConfig.apiBaseUrl}/api/${restaurantConfig.slug}/upi-redirect`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: cartTotal, name: restaurantConfig.name })
                });
                const data = await resp.json();
                if (data.url) window.location.href = data.url;
            } catch (err) {
                console.error('UPI redirect failed:', err);
                alert(getErrorMessage(err, 'Could not open UPI app. Please try again.'));
            }
        });
        btn.dataset.initialized = 'true';
    }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// CALL WAITER BUTTON
// ==========================================

function initCallWaiterBtn() {
    const btn = document.getElementById('callWaiterBtn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        if (btn.classList.contains('loading')) return;

        const originalHtml = btn.innerHTML;
        btn.classList.add('loading');
        btn.innerHTML = '<span>Calling Waiter...</span>';

        const tableNumber = localStorage.getItem('paradiseTable') || 'unknown';

        // Format date & time in IST
        const now = new Date();
        const day = now.toLocaleDateString('en-IN', { day: '2-digit' });
        const month = now.toLocaleDateString('en-IN', { month: 'long' });
        const year = now.toLocaleDateString('en-IN', { year: 'numeric' });
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours % 12 || 12;
        const dateTimeStr = `${day} ${month} ${year}, ${displayHour}:${minutes} ${ampm}`;

        let message = `🔔 SERVICE REQUEST\n\n`;
        message += `Restaurant: ${restaurantConfig.name}\n`;
        message += `Table: ${tableNumber}\n`;
        message += `Date & Time: ${dateTimeStr}\n\n`;
        message += `Customer at Table ${tableNumber} needs assistance.\n\n`;
        message += `— Digital Menyu`;

        // Get WhatsApp URL from backend (secure — no raw number in frontend)
        try {
            const resp = await fetch(`${restaurantConfig.apiBaseUrl}/api/${restaurantConfig.slug}/whatsapp-redirect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await resp.json();
            if (data.url) window.location.href = data.url;
        } catch (err) {
            console.error('WhatsApp redirect failed:', err);
            alert(getErrorMessage(err, 'Could not open WhatsApp. Please try again.'));
        } finally {
            btn.classList.remove('loading');
            btn.innerHTML = originalHtml;
        }
    });
}

function getErrorMessage(err, defaultMsg = "An unexpected error occurred. Please try again.") {
    console.error("Frontend Error Handler:", err);
    const technicalKeywords = ['prisma', 'sql', 'database', 'stack', 'unexpected token', 'json', 'http'];
    const msg = (err.message || "").toLowerCase();
    
    if (technicalKeywords.some(kw => msg.includes(kw))) {
        return defaultMsg;
    }
    return err.message || defaultMsg;
}
