// ==========================================
// PARADISE RESTAURANT — MENU DATA
// ==========================================

const menuItems = [
    // -------- BIRYANIS --------
    {
        key: 'chicken-biryani', title: 'Chicken Biryani', price: '₹210', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Classic Hyderabadi chicken biryani cooked with aromatic basmati rice, tender chicken pieces, and a blend of traditional spices. A timeless Paradise signature.',
        ingredients: [
            { heading: '🍚 Rice' },
            { item: 'Aged basmati rice – 120 grams (raw)' },
            { heading: '🐔 Chicken' },
            { item: 'Bone-in chicken (leg/thigh pieces) – 180–200 grams' },
            { heading: '🥣 Marinade (for chicken)' },
            { item: 'Thick yogurt (curd) – 60 grams' },
            { item: 'Ginger-garlic paste – 10 grams' },
            { item: 'Red chili powder – 4 grams (1 tsp)' },
            { item: 'Turmeric powder – 1 gram (¼ tsp)' },
            { item: 'Coriander powder – 3 grams (½ tsp)' },
            { item: 'Cumin powder – 2 grams (½ tsp)' },
            { item: 'Garam masala – 2 grams (½ tsp)' },
            { item: 'Salt – 4 grams (¾ tsp or to taste)' },
            { item: 'Lemon juice – 5 ml (1 tsp)' },
            { item: 'Green chili (slit) – 1 small (5 grams)' },
            { heading: '🧅 Fried Onions (Birista)' },
            { item: 'Onion (raw) – 100 grams (1 medium)' },
            { item: '→ Fry to yield ~35–40 grams birista' },
            { heading: '🌿 Fresh Herbs' },
            { item: 'Fresh mint leaves – 5 grams (small handful)' },
            { item: 'Fresh coriander leaves – 5 grams (small handful)' },
            { heading: '🌶 Whole Spices (for rice boiling)' },
            { item: 'Bay leaf – 1 small' },
            { item: 'Green cardamom – 2 pods' },
            { item: 'Cloves – 3 pieces' },
            { item: 'Cinnamon – 1 small 1-inch stick' },
            { item: 'Shah jeera – ½ tsp (1 gram)' },
            { item: 'Black peppercorns – 4–5 pieces' },
            { heading: '🧈 Fat' },
            { item: 'Oil – 20 ml (1½ tbsp total: marinade + frying)' },
            { item: 'Ghee – 10 grams (2 tsp)' },
            { heading: '🌼 Optional Aromatics' },
            { item: 'Saffron – 6–8 strands soaked in 15 ml warm milk' },
            { item: 'Kewra water – 2–3 drops (optional)' },
            { heading: '📦 Final Plate Weight Approximation' },
            { item: 'Rice (cooked) ~ 300g' },
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
            { heading: '🍚 Rice' },
            { item: 'Aged basmati rice – 120 grams (raw)' },
            { heading: '🥩 Mutton' },
            { item: 'Bone-in mutton pieces – 180–200 grams' },
            { item: '(preferably small to medium curry-cut pieces)' },
            { heading: '🥣 Marinade (for mutton)' },
            { item: 'Thick yogurt (curd) – 60 grams' },
            { item: 'Ginger-garlic paste – 12 grams (2 tsp)' },
            { item: 'Red chili powder – 4 grams (1 tsp)' },
            { item: 'Turmeric powder – 1 gram (¼ tsp)' },
            { item: 'Coriander powder – 4 grams (1 tsp)' },
            { item: 'Cumin powder – 2 grams (½ tsp)' },
            { item: 'Garam masala – 2 grams (½ tsp)' },
            { item: 'Salt – 5 grams (1 tsp or to taste)' },
            { item: 'Lemon juice – 5 ml (1 tsp)' },
            { item: 'Green chili – 1 small (5 grams)' },
            { heading: '🧅 Onions (for birista)' },
            { item: 'Onion – 120 grams (1 large)' },
            { item: '(deep-fried to golden brown)' },
            { heading: '🌿 Fresh Herbs' },
            { item: 'Fresh mint leaves – 5–7 grams (small handful)' },
            { item: 'Fresh coriander leaves – 5–7 grams (small handful)' },
            { heading: '🌶 Whole Spices (for rice boiling)' },
            { item: 'Bay leaf – 1' },
            { item: 'Green cardamom – 2 pods' },
            { item: 'Cloves – 3 pieces' },
            { item: 'Cinnamon – 1 small 1-inch stick' },
            { item: 'Black cardamom – 1 small (optional)' },
            { item: 'Shah jeera – ½ tsp (1 gram)' },
            { item: 'Black peppercorns – 4–5 pieces' },
            { heading: '🧈 Fat' },
            { item: 'Cooking oil – 25 ml (2 tbsp total)' },
            { item: 'Ghee – 10 grams (2 tsp)' },
            { heading: '🌼 Optional Aromatics' },
            { item: 'Saffron – 6–8 strands soaked in 15 ml warm milk' },
            { item: 'Kewra water or rose water – 2–3 drops' },
            { heading: '📦 Final Plate Weight Approximation' },
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
    { key: 'chicken-family-pack', title: 'Chicken Family Pack', price: '₹552', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Generous family-sized chicken biryani, enough to share with your loved ones. Same legendary taste, bigger portion.' },
    { key: 'mutton-family-pack', title: 'Mutton Family Pack', price: '₹576', dietType: 'non-veg', foodCategory: 'biryanis', description: 'A royal family-sized mutton biryani, perfect for gatherings. Rich, aromatic, and unforgettable.' },
    { key: 'special-chicken-biryani', title: 'Special Chicken Biryani', price: '₹337', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Our special preparation of chicken biryani with extra spices and premium cuts of chicken. An elevated classic.' },
    { key: 'special-mutton-biryani', title: 'Special Mutton Biryani', price: '₹351', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Premium mutton biryani with hand-selected cuts and intensified spice blend. For the true biryani connoisseur.' },
    { key: 'supreme-chicken-biryani', title: 'Supreme Chicken Biryani', price: '₹784', dietType: 'non-veg', foodCategory: 'biryanis', description: 'The ultimate chicken biryani experience with supreme-quality ingredients and chef\'s special masala.' },
    { key: 'supreme-mutton-biryani', title: 'Supreme Mutton Biryani', price: '₹819', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Our finest mutton biryani — the most tender cuts layered with basmati rice and a luxurious blend of rare spices.' },
    { key: 'egg-biryani', title: 'Egg Biryani', price: '₹154', dietType: 'non-veg', foodCategory: 'biryanis', description: 'Flavorful biryani layered with perfectly boiled eggs and aromatic spiced rice. Simple, satisfying, and delicious.' },
    { key: 'veg-biryani', title: 'Veg Biryani', price: '₹154', dietType: 'veg', foodCategory: 'biryanis', description: 'Aromatic vegetable biryani made with fresh seasonal vegetables and fragrant basmati rice. A vegetarian delight.' },
    { key: 'veg-family-pack', title: 'Veg Family Pack', price: '₹383', dietType: 'veg', foodCategory: 'biryanis', description: 'Generous family-sized vegetable biryani, packed with seasonal vegetables and fragrant spices. Perfect for sharing.' },
    { key: 'veg-supreme-pack', title: 'Veg Supreme Pack', price: '₹574', dietType: 'veg', foodCategory: 'biryanis', description: 'Our most premium vegetable biryani with exotic vegetables and chef\'s special masala blend. The finest veg option.' },

    // -------- STARTERS --------
    { key: 'chilli-chicken', title: 'Chilli Chicken', price: '₹264', dietType: 'non-veg', foodCategory: 'starters', description: 'Spicy, tangy chicken tossed with green chillies, bell peppers, and aromatic sauces. A fiery Indo-Chinese starter!' },
    { key: 'chicken-65', title: 'Chicken 65', price: '₹264', dietType: 'non-veg', foodCategory: 'starters', description: 'Iconic deep-fried chicken bites marinated in a spicy red masala. Crispy on the outside, juicy on the inside.' },
    { key: 'pepper-chicken', title: 'Pepper Chicken', price: '₹264', dietType: 'non-veg', foodCategory: 'starters', description: 'Tender chicken pieces tossed in a bold cracked pepper and spice sauce. A peppery delight for spice lovers.' },
    { key: 'paneer-65', title: 'Paneer 65', price: '₹196', dietType: 'veg', foodCategory: 'starters', description: 'Crispy paneer cubes marinated in spicy batter and deep-fried to golden perfection. A vegetarian twist on a classic.' },
    { key: 'veg-manchurian', title: 'Veg Manchurian', price: '₹189', dietType: 'veg', foodCategory: 'starters', description: 'Crispy vegetable balls tossed in a tangy, spicy Manchurian sauce. Indo-Chinese comfort food at its best.' },

    // -------- KEBABS --------
    { key: 'chicken-tikka-kebab', title: 'Chicken Tikka Kebab', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Tender chicken chunks marinated in yogurt and spices, grilled to smoky perfection in the tandoor.' },
    { key: 'tandoori-chicken-half', title: 'Tandoori Chicken (Half)', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Half portion of our classic tandoori chicken, marinated overnight and chargrilled to perfection.' },
    { key: 'tandoori-chicken-full', title: 'Tandoori Chicken (Full)', price: '₹379', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Full portion of succulent tandoori chicken, marinated in yogurt and spices, cooked in a clay oven until charred and juicy.' },
    { key: 'chicken-reshmi-kebab', title: 'Chicken Reshmi Kebab', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Silky smooth chicken kebabs made with cream and mild spices. Melt-in-your-mouth tender.' },
    { key: 'chicken-garlic-kebab', title: 'Chicken Garlic Kebab', price: '₹243', dietType: 'non-veg', foodCategory: 'kebabs', description: 'Juicy chicken kebabs infused with roasted garlic and aromatic herbs. Bold, savory, and irresistible.' },

    // -------- CURRIES --------
    { key: 'butter-chicken-boneless', title: 'Butter Chicken Boneless', price: '₹246', dietType: 'non-veg', foodCategory: 'curries', description: 'Tender boneless chicken simmered in a rich, creamy tomato-based gravy with butter and aromatic spices. A universally loved classic.' },
    { key: 'nizami-handi', title: 'Nizami Handi', price: '₹171', dietType: 'non-veg', foodCategory: 'curries', description: 'A royal Hyderabadi curry cooked in a traditional handi with aromatic spices, yogurt, and rich gravy. Fit for the Nizams.' },

    // -------- INDIAN BREADS --------
    { key: 'tandoori-roti', title: 'Tandoori Roti', price: '₹40', dietType: 'veg', foodCategory: 'indian-breads', description: 'Whole wheat bread baked fresh in the tandoor. Soft, slightly charred, and the perfect companion to any curry.' },
    { key: 'rumali-roti', title: 'Rumali Roti', price: '₹40', dietType: 'veg', foodCategory: 'indian-breads', description: 'Paper-thin, silky soft flatbread folded like a handkerchief. Delicate and perfect for wrapping around kebabs.' },

    // -------- DESSERTS --------

    { key: 'double-ka-meetha', title: 'Double Ka Meetha', price: '₹73', dietType: 'veg', foodCategory: 'desserts', description: 'Rich Hyderabadi bread pudding soaked in sweetened milk, flavored with cardamom, and garnished with nuts. Sweet indulgence.' },

    // -------- BEVERAGES --------
    { key: 'diet-coke', title: 'Diet Coke', price: 'MRP', dietType: 'veg', foodCategory: 'beverages', description: 'Zero-calorie cola for a guilt-free refreshment alongside your meal.' },

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
// APP INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Paradise Restaurant App initialized');
    initViewSwitcher();
    initDietTypeSelector();
    initFoodCategoryDropdown();
    renderMenu();
    initItemModal();
});

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

        html += `
            <section class="menu-section" data-food-category="${category.key}">
                <div class="menu-header">
                    <img src="${category.icon}" alt="${category.title}" class="menu-category-icon"
                        onerror="this.style.display='none';">
                    <h2 class="menu-title">${category.title}</h2>
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
    return `
        <li class="menu-item clickable-item" data-item="${item.key}">
            <div class="item-info">
                <span class="item-name">
                    <span class="diet-dot ${dietClass}"></span>
                    ${item.title}
                </span>
                <span class="item-price">${item.price}</span>
            </div>
            <div class="item-thumbnail">
                <img src="assets/thumbnails/${item.key}.png" alt="${item.title}"
                    class="thumbnail-image"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="thumbnail-placeholder">Image Placeholder</div>
            </div>
        </li>
    `;
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

            // Load item videos
            document.getElementById('itemVideo1').src = `assets/videos/${itemKey}/${itemKey}_video_1.mp4`;
            document.getElementById('itemVideo2').src = `assets/videos/${itemKey}/${itemKey}_video_2.mp4`;

            // Populate Ingredients Tab
            const ingredientsList = document.getElementById('ingredientsList');
            if (ingredientsList) {
                if (data.ingredients && data.ingredients.length > 0) {
                    ingredientsList.innerHTML = data.ingredients.map(entry => {
                        if (entry.heading) {
                            return `<li class="info-item ingredient-heading">${entry.heading}</li>`;
                        }
                        return `<li class="info-item">${entry.item}</li>`;
                    }).join('');
                } else {
                    ingredientsList.innerHTML = '<li class="info-item">Ingredients coming soon</li>';
                }
            }

            // Populate Nutrients Tab
            const nutrientsList = document.getElementById('nutrientsList');
            if (nutrientsList) {
                if (data.nutrients && data.nutrients.length > 0) {
                    nutrientsList.innerHTML = data.nutrients.map(entry => {
                        return `<li class="info-item"><strong>${entry.label}:</strong> ${entry.value}</li>`;
                    }).join('');
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
// VIEW MODE SWITCHER
// ==========================================

function initViewSwitcher() {
    const mobileBtn = document.getElementById('mobileBtn');
    const desktopBtn = document.getElementById('desktopBtn');

    if (!mobileBtn || !desktopBtn) return;

    const savedMode = localStorage.getItem('viewMode') || 'desktop';
    setViewMode(savedMode);

    mobileBtn.addEventListener('click', () => setViewMode('mobile'));
    desktopBtn.addEventListener('click', () => setViewMode('desktop'));
}

function setViewMode(mode) {
    const mobileBtn = document.getElementById('mobileBtn');
    const desktopBtn = document.getElementById('desktopBtn');
    const body = document.body;

    mobileBtn.classList.toggle('active', mode === 'mobile');
    desktopBtn.classList.toggle('active', mode === 'desktop');
    body.classList.toggle('mobile-view', mode === 'mobile');

    localStorage.setItem('viewMode', mode);
    console.log(`View mode: ${mode}`);
}
