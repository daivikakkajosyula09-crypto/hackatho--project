# NOVA INTELLISTOCK — AI-Powered Local Commerce Intelligence Platform

**NOVA INTELLISTOCK** is an enterprise-grade inventory accuracy and availability orchestration platform created for **NOVA CART**, a quick-commerce and hyperlocal shopping platform connecting customers with hundreds of independent neighborhood stores.

---

## 1. Executive Summary & Business Context

NOVA CART experienced rapid top-line growth over a 6-month period (Registered Users: 82,000 → 120,000; Monthly Orders: 31,200 → 38,500; Revenue: ₹21.8L → ₹26.1L). However, underlying operational metrics revealed severe friction:
- **Cancellation Rate**: Spiked from **6% to 11%** (driven primarily by unavailable products / phantom inventory).
- **Repeat Purchase Rate**: Collapsed from **41% down to 27%**.
- **Average Delivery Time**: Inflated from **29 min to 37 min**.
- **Customer Support Tickets**: Surged 90% from **3,100 to 5,900 monthly tickets**.
- **Promotional Burn**: Increased by 79% (₹9.5L → ₹17L) without sustainable retention.

**Central Business Paradox**: `"GROWTH ≠ HEALTHY GROWTH"`

NOVA INTELLISTOCK solves the core inventory accuracy and availability reliability problem, transforming raw store inventory signals into actionable fulfillment intelligence.

---

## 2. Core Solution Architecture & Value Chain

```
CUSTOMER
   ↓ (Views 0-100% Availability Confidence & AI Substitutions)
NOVA INTELLISTOCK ENGINE (Deterministic Availability Scoring + Alternative Ranking)
   ↓ (Dispatches Inventory Attention Alerts & Fast Stock Controls)
PARTNER STORES
   ↓ (Provides Network Risk Heatmap & Staff Dispatch Actions)
NOVA OPERATIONS COMMAND CENTER
```

The system replaces binary "In Stock / Out of Stock" flags with an explainable **Availability Confidence Score (0–100%)**.

---

## 3. Key Engine Specifications

### A. Availability Confidence Intelligence Engine
Score formula normalized from 0 to 100%:
$$\text{Availability Score} = (S \times 0.40) + (F \times 0.25) + (D \times 0.20) + (R \times 0.15)$$

- **Stock Level Factor ($S$)**: Quantity vs safety threshold (0 units = 0%, 1–4 = 35%, 5–9 = 65%, 10–14 = 85%, 15+ = 100%).
- **Inventory Freshness ($F$)**: Time since last store verification (<1h = 100%, 1–4h = 85%, 4–12h = 65%, 12–24h = 40%, >24h = 15%).
- **Demand Pressure ($D$)**: Order velocity index (Normal = 100%, Elevated = 75%, Spike = 45%, Extreme = 20%).
- **Store Fulfillment Reliability ($R$)**: Historical order acceptance rate (≥95% = 100%, 85–94% = 80%, 75–84% = 60%, <75% = 30%).

**Explainability Payload**: Every score includes transparent driver reasons (e.g. *"Verified 42 mins ago (+25 pts)"*, *"Stock level healthy (+40 pts)"*).

### B. Smart Substitution Engine
Triggered when confidence < 70% or stock = 0:
$$\text{Sub Match Score} = (\text{Category Match} \times 30) + (\text{Price Delta Match} \times 25) + (\text{Avail Confidence} \times 25) + (\text{Store Proximity} \times 20)$$

Ranks candidate products by category similarity, price difference (showing customer savings), stock confidence, and store distance.

### C. Business Impact Simulator
Models interactive scenario improvements against the **₹25 Lakh maximum 6-month budget constraint**:
- **Avoided Monthly Cancellations**: +1,500 to +2,200 orders/mo
- **Recovered Monthly Revenue**: +₹7.5L to +₹10.5L/mo
- **Support Ticket Reduction**: -2,100+ tickets/mo
- **Projected ROI**: **340% within 6 months**

---

## 4. Product Modules & Roles

1. **Customer View**: Marketplace search, 92% Confidence score cards, explainability modal, shopping cart, smart substitution modal, checkout.
2. **Store Manager Portal**: Store health gauge, Inventory Attention Center (High/Medium/Low priority), live stock +/- controls, "Mark Out of Stock" toggle, instant score recalculation.
3. **NOVA Operations Command Center**: Top KPI cards matching case study data, Interactive Visual Store Risk Map, Product Risk Master Table, Cancellation & Support root-cause breakdowns.
4. **NOVA Intelligence Engine**: Automated evidence-based insight cards (Evidence → Impact → Recommendation → Priority).
5. **Operational Action Center**: Staff task dispatches (Store Audit alerts, Auto-sub rules, verification requests).
6. **Business Impact Simulator**: Scenario modeler with dynamic range sliders & ROI output cards.
7. **Analytics**: 6-Month macro growth vs health comparison ("GROWTH ≠ HEALTHY GROWTH").
8. **Why NOVA Intellistock?**: Hackathon storytelling & budget proof breakdown.

---

## 5. Technology Stack & Installation

- **Frontend**: HTML5, ES6 JavaScript Modules, Vanilla CSS Design System (Dark Slate, Glassmorphism, Responsive CSS Grid).
- **Fonts**: Inter, Outfit, JetBrains Mono (via Google Fonts).
- **State Management**: Centralized reactive AppState event router.
- **Zero Dependencies**: Runs natively in any modern web browser without requiring heavy build steps or npm compilation.

### Running Locally
1. Clone or open the repository folder: `c:\Users\HP\Documents\NOVA-Intellistock`
2. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, serve using any lightweight local server (e.g. VS Code Live Server or static server).

---

## 6. Demo Flow (3-Minute Walkthrough)

Click the **⚡ Load 3-Min Demo Flow** button in the top header to run the guided 5-step scenario:
1. **Step 1: Customer View** — Search "Nandini Milk 1L", notice low confidence (54%).
2. **Step 2: AI Substitution** — System automatically recommends "Amul Taaza Milk 1L" (96% Confidence).
3. **Step 3: Store Manager Alert** — Switch to Store Manager view; Sri Lakshmi Stores flags item as High Priority.
4. **Step 4: Real-Time Restock** — Update stock from 2 to 25 units; score instantly recalculates from 54% to 94%.
5. **Step 5: Operations Command** — Observe network risk drop and ROI rise in Command Center!
