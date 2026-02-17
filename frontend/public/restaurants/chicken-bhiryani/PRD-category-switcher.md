# PRD: Dual-Category Smart Filtering System

## Problem Statement

The current app has a single dropdown category switcher (Veg / Non Veg / Beverages) that reorders sections. This approach has two limitations:

1. **Diet preference and food type are mixed together** — a customer wanting "Non-Veg Starters" has no way to express that.
2. **No default "all items" view** — a category must always be selected.

The menu needs a **two-dimensional filtering system**: one axis for **diet type** (Veg, Non-Veg, Vegan) and another for **food category** (Main Course, Starters, Kebabs, Desserts, etc.).

---

## Solution Overview

Two sticky filter controls at the top of the page, working independently or together:

```
┌──────────────────────────────────────────────┐
│  [ Veg ▾ ]  [ Non Veg ▾ ]  [ Vegan ▾ ]      │  ← Diet Type (Row 1)
├──────────────────────────────────────────────┤
│  [ All Categories ▾ ]                        │  ← Food Category Dropdown (Row 2)
│    ○ Main Course                             │
│    ○ Starters                                │
│    ○ Kebabs                                  │
│    ○ Desserts                                │
│    ○ Beverages                               │
└──────────────────────────────────────────────┘
```

---

## Detailed Requirements

### 1. Diet Type Selector (Row 1)

| Requirement | Detail |
|---|---|
| **Options** | Veg, Non-Veg, Vegan |
| **Format** | Dropdown button (since there are 3 options). Displays the selected option or "Diet Type" when none selected |
| **Default state** | Nothing selected — all diet types are shown |
| **Behavior** | Selecting one filters the item list to only that diet type. Clicking again (or a "clear" option) deselects and shows all |
| **Position** | Sticky, pinned to top (below any header/banner), Row 1 |
| **Visual indicator** | Each option has a colored dot: 🟢 Veg, 🔴 Non-Veg, 🟡 Vegan |

### 2. Food Category Selector (Row 2)

| Requirement | Detail |
|---|---|
| **Options** | Main Course, Starters, Kebabs, Desserts, Beverages (expandable in future) |
| **Format** | Dropdown button. Displays selected category name or "All Categories" when none selected |
| **Default state** | Nothing selected — all food categories shown in default order |
| **Behavior** | Selecting a category brings those items to the **top** of the list. Other categories still appear below (unless a diet filter hides them) |
| **Position** | Sticky, directly below Diet Type selector, Row 2 |

### 3. Item Data Model

Every menu item needs two tags:

```
{
  "chicken-fried-mandi-1p": {
    title: "Chicken Fried Mandi (1P)",
    dietType: "non-veg",          // "veg" | "non-veg" | "vegan"
    foodCategory: "main-course",  // "main-course" | "starters" | "kebabs" | "desserts" | "beverages"
    price: "₹199",
    description: "..."
  }
}
```

> [!IMPORTANT]
> **Every item must be tagged with both `dietType` and `foodCategory`.** The current items need to be categorized. Here is the suggested mapping for existing items:

| Existing Items | Diet Type | Suggested Food Category |
|---|---|---|
| All Chicken Mandi variants (Fried/Juicy/Ghee Rost) | `non-veg` | `main-course` |
| All Mutton Mandi variants (Fried/Juicy/Ghee Rost) | `non-veg` | `main-course` |
| Paneer Mandi (Single & Full) | `veg` | `main-course` |
| Coca Cola | `veg` | `beverages` |
| Pepsi | `veg` | `beverages` |

> [!NOTE]
> Currently there are no items for Starters, Kebabs, Desserts, or Vegan categories. The system should still show these as selectable options in the dropdown so new items can be added later. If a combination yields zero results, show a "No items found" message.

---

### 4. Filtering Logic (State Machine)

The two filters combine with **AND** logic:

| Diet Type Selected | Food Category Selected | What Shows |
|---|---|---|
| **None** | **None** | All items, grouped by food category in default order (Main Course → Starters → Kebabs → Desserts → Beverages) |
| **None** | **Starters** | Starters (all diet types) float to top. Other categories appear below in default order |
| **Non-Veg** | **None** | Only non-veg items. Grouped by food category in default order |
| **Non-Veg** | **Starters** | Only non-veg starters at the top. Other non-veg categories below. **No veg/vegan items visible at all** |
| **Veg** | **Main Course** | Only veg main course items at top. Other veg categories below |
| **Vegan** | **None** | Only vegan items (may be empty initially → show "No items found") |

#### Key Behaviors:

1. **"Float to top" vs "Filter out":**
   - **Diet type** = hard filter (hides items that don't match)
   - **Food category** = soft sort (selected category floats to top, others still visible below)

2. **Combined filtering:**
   - When both are active, diet type filters first (hard), then food category sorts (soft - selected on top)

3. **Deselection:**
   - Each selector has a way to clear/deselect (dropdown shows "All" or "Diet Type" as default)
   - Clearing one filter does not affect the other

---

### 5. Default View (App Open)

When the app first loads:
- **Diet Type:** None selected (button shows "Diet Type")
- **Food Category:** None selected (button shows "All Categories")
- **Item list:** All items displayed, grouped under food category section headers:
  - **Main Course** — all mandi items
  - **Beverages** — Coca Cola, Pepsi
  - (Other categories appear when items exist for them)
- Each item row shows its **diet type indicator** (colored dot: 🟢/🔴/🟡) so customers can visually scan

---

### 6. UI/UX Specifications

#### Sticky Filter Bar
- Both rows stick to the top of the viewport (below any existing header)
- Compact height — should not eat too much screen real estate on mobile
- Subtle backdrop blur + shadow to separate from content below

#### Diet Type Dropdown
- Button with current selection or "Diet Type" placeholder
- Dropdown list with colored dots beside each option
- "Show All" option at the top of the dropdown to clear selection

#### Food Category Dropdown
- Button with current selection or "All Categories" placeholder
- Dropdown list of all food categories
- "All Categories" option at the top to clear selection

#### Item List Changes
- **Remove the old Veg/Non-Veg/Beverages section structure**
- **New grouping:** Items grouped by food category (Main Course, Starters, etc.)
- Each group has a section header with the category name
- Each item row shows a small diet-type colored dot next to the item name
- When a food category is selected and floated to top, a subtle visual divider separates it from the remaining categories
- Smooth animation when items reorder/filter

#### Empty State
- When a filter combination yields zero items: centered message "No items in this category yet" with a subtle icon

---

### 7. Mobile-First Considerations

- Filter bar should be full-width on mobile
- Dropdowns should **not** overlay the entire screen — they should be concise flyout menus
- Touch targets: minimum 44px height for all interactive elements
- The sticky bar should be slim (two compact rows, ~80-90px total height)

---

## Approach & Tackling Strategy

### How to Implement This Cleanly

1. **Centralize item data** — Move all menu items into a single JavaScript data array/object with `dietType` and `foodCategory` tags. The HTML item list will be **generated dynamically** from this data instead of being hardcoded.

2. **State-driven rendering** — Maintain a simple state:
   ```js
   let activeFilters = {
     dietType: null,      // null | "veg" | "non-veg" | "vegan"
     foodCategory: null   // null | "main-course" | "starters" | "kebabs" | "desserts" | "beverages"
   };
   ```
   Any filter change triggers a `renderItems()` function that:
   - Filters by `dietType` (if set)
   - Sorts by `foodCategory` (selected category first, then default order)
   - Rebuilds the item list in the DOM

3. **Replace the old static HTML menu sections** with a single `<div id="menuContainer">` that gets populated dynamically.

4. **Keep the filter bar in static HTML** — The two dropdowns are simple HTML that the JS hooks into.

5. **CSS transitions** — Use `animation` or `transition` on list items for smooth reflows when filtering.

---

## Verification Plan

### Browser Testing
- Open the app in a browser and verify:
  1. Default state shows all items grouped by food category
  2. Selecting a diet type filters items correctly
  3. Selecting a food category floats that group to top
  4. Combining both filters works (e.g., Non-Veg + Main Course)
  5. Clearing one filter doesn't affect the other
  6. Mobile view looks good and both dropdowns work
  7. Empty state message appears for categories with no items (e.g., Vegan)
  8. Item modal still opens correctly when clicking items
  9. Sticky filter bar stays visible while scrolling

### Manual Testing by User
- Test on actual mobile device to verify touch targets, dropdown behavior, and overall UX feel
