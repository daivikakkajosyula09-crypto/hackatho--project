/* ==========================================================================
   NOVA INTELLISTOCK - DATASET SOURCE OF TRUTH
   Authentic Case Study Data + Enterprise Mock Entities
   ========================================================================== */

window.NOVA_DATA = {
  // Case Study Macro Metrics (Month 1 vs Month 6)
  caseStudyMetrics: {
    month1: {
      registeredUsers: 82000,
      activeUsers: 39000,
      monthlyOrders: 31200,
      averageOrderValue: 452,
      repeatPurchaseRate: 41,
      averageDeliveryTime: 29,
      cancellationRate: 6.0,
      supportTickets: 3100,
      promotionalSpendLakhs: 9.5,
      revenueLakhs: 21.8
    },
    month6: {
      registeredUsers: 120000,
      activeUsers: 46000,
      monthlyOrders: 38500,
      averageOrderValue: 486,
      repeatPurchaseRate: 27,
      averageDeliveryTime: 37,
      cancellationRate: 11.0,
      supportTickets: 5900,
      promotionalSpendLakhs: 17.0,
      revenueLakhs: 26.1
    }
  },

  // Customer Signals Survey Breakdown (% of dissatisfied customer reports)
  customerSignals: [
    { signal: 'High Prices & Delivery Fees', percentage: 38 },
    { signal: 'Delivery Time Too Long', percentage: 34 },
    { signal: 'Products Become Unavailable After Order', percentage: 29 },
    { signal: 'Confusing Discounts & Offers', percentage: 24 },
    { signal: 'Prefer Nearby Physical Stores', percentage: 21 },
    { signal: 'Difficult Local Product Discovery', percentage: 18 },
    { signal: 'Refund & Credit Processing Issues', percentage: 16 },
    { signal: 'Cluttered & Complex App UI', percentage: 14 },
    { signal: 'Inaccurate Live Order Tracking', percentage: 11 }
  ],

  // 6 Local Partner Stores in Quick-Commerce Network
  stores: [
    {
      id: 'store-101',
      name: 'Sri Lakshmi Stores',
      locality: 'Koramangala 5th Block',
      distanceKm: 2.1,
      etaMin: 28,
      fulfillmentRate: 97, // % order acceptance
      historicalRejections: 12,
      xPercent: 35, // map plot %
      yPercent: 40,
      status: 'active',
      inventoryFreshnessHours: 0.7 // updated 42m ago
    },
    {
      id: 'store-102',
      name: 'GreenBasket Fresh',
      locality: 'Indiranagar 100ft Rd',
      distanceKm: 3.4,
      etaMin: 32,
      fulfillmentRate: 91,
      historicalRejections: 28,
      xPercent: 65,
      yPercent: 25,
      status: 'active',
      inventoryFreshnessHours: 3.2
    },
    {
      id: 'store-103',
      name: 'FreshCart Hyperlocal',
      locality: 'HSR Layout Sector 2',
      distanceKm: 1.8,
      etaMin: 22,
      fulfillmentRate: 74, // low fulfillment!
      historicalRejections: 84,
      xPercent: 45,
      yPercent: 75,
      status: 'at-risk',
      inventoryFreshnessHours: 14.5
    },
    {
      id: 'store-104',
      name: 'Express Mart',
      locality: 'Jayanagar 4th Block',
      distanceKm: 4.2,
      etaMin: 38,
      fulfillmentRate: 88,
      historicalRejections: 42,
      xPercent: 20,
      yPercent: 60,
      status: 'active',
      inventoryFreshnessHours: 5.8
    },
    {
      id: 'store-105',
      name: 'QuickGrocery Warehouse',
      locality: 'Whitefield Main Rd',
      distanceKm: 6.8,
      etaMin: 45,
      fulfillmentRate: 68,
      historicalRejections: 112,
      xPercent: 85,
      yPercent: 50,
      status: 'critical',
      inventoryFreshnessHours: 26.0 // outdated!
    },
    {
      id: 'store-106',
      name: 'SuperBazaar Provisions',
      locality: 'BTM Layout 2nd Stage',
      distanceKm: 2.9,
      etaMin: 30,
      fulfillmentRate: 94,
      historicalRejections: 18,
      xPercent: 30,
      yPercent: 80,
      status: 'active',
      inventoryFreshnessHours: 1.1
    }
  ],

  // 25 Products with real-time stock & substitution mapping
  products: [
    {
      id: 'prod-001',
      name: 'Aashirvaad Whole Wheat Atta 5kg',
      category: 'Staples & Flour',
      price: 280,
      unit: '5 kg',
      storeId: 'store-101',
      stock: 18,
      lastVerifiedMinutesAgo: 42,
      demandVelocity: 'Normal', // Normal, Elevated, Spike, Extreme
      substitutes: ['prod-002', 'prod-003'],
      imageIcon: '🌾'
    },
    {
      id: 'prod-002',
      name: 'Fortune Chakki Fresh Atta 5kg',
      category: 'Staples & Flour',
      price: 270,
      unit: '5 kg',
      storeId: 'store-101',
      stock: 34,
      lastVerifiedMinutesAgo: 15,
      demandVelocity: 'Normal',
      substitutes: ['prod-001', 'prod-003'],
      imageIcon: '🌾'
    },
    {
      id: 'prod-003',
      name: 'Annapurna Shuddh Atta 5kg',
      category: 'Staples & Flour',
      price: 265,
      unit: '5 kg',
      storeId: 'store-101',
      stock: 22,
      lastVerifiedMinutesAgo: 60,
      demandVelocity: 'Normal',
      substitutes: ['prod-001', 'prod-002'],
      imageIcon: '🌾'
    },
    {
      id: 'prod-004',
      name: 'Nandini GoodLife Toned Milk 1L',
      category: 'Dairy & Eggs',
      price: 52,
      unit: '1 L',
      storeId: 'store-101',
      stock: 2, // low stock!
      lastVerifiedMinutesAgo: 380, // ~6.3 hours ago
      demandVelocity: 'Spike',
      substitutes: ['prod-005', 'prod-006'],
      imageIcon: '🥛'
    },
    {
      id: 'prod-005',
      name: 'Amul Taaza Homogenised Milk 1L',
      category: 'Dairy & Eggs',
      price: 54,
      unit: '1 L',
      storeId: 'store-101',
      stock: 45,
      lastVerifiedMinutesAgo: 20,
      demandVelocity: 'Normal',
      substitutes: ['prod-004'],
      imageIcon: '🥛'
    },
    {
      id: 'prod-006',
      name: 'Heritage Special Toned Milk 1L',
      category: 'Dairy & Eggs',
      price: 50,
      unit: '1 L',
      storeId: 'store-102',
      stock: 28,
      lastVerifiedMinutesAgo: 45,
      demandVelocity: 'Normal',
      substitutes: ['prod-004', 'prod-005'],
      imageIcon: '🥛'
    },
    {
      id: 'prod-007',
      name: 'Freedom Refined Sunflower Oil 1L',
      category: 'Edible Oils',
      price: 145,
      unit: '1 L',
      storeId: 'store-103', // At-risk store!
      stock: 1, // Phantom stock risk!
      lastVerifiedMinutesAgo: 870, // 14.5 hours ago
      demandVelocity: 'Extreme',
      substitutes: ['prod-008'],
      imageIcon: '🛢️'
    },
    {
      id: 'prod-008',
      name: 'Saffola Gold Edible Oil 1L',
      category: 'Edible Oils',
      price: 175,
      unit: '1 L',
      storeId: 'store-101',
      stock: 19,
      lastVerifiedMinutesAgo: 30,
      demandVelocity: 'Normal',
      substitutes: ['prod-007'],
      imageIcon: '🛢️'
    },
    {
      id: 'prod-009',
      name: 'Tata Salt Vacuum Evaporated 1kg',
      category: 'Staples & Flour',
      price: 28,
      unit: '1 kg',
      storeId: 'store-101',
      stock: 50,
      lastVerifiedMinutesAgo: 10,
      demandVelocity: 'Normal',
      substitutes: [],
      imageIcon: '🧂'
    },
    {
      id: 'prod-010',
      name: 'Lays Magic Masala Potato Chips 50g',
      category: 'Snacks & Beverages',
      price: 20,
      unit: '50 g',
      storeId: 'store-105',
      stock: 0, // OUT OF STOCK!
      lastVerifiedMinutesAgo: 1560, // 26 hours ago!
      demandVelocity: 'Spike',
      substitutes: ['prod-011'],
      imageIcon: '🥔'
    },
    {
      id: 'prod-011',
      name: 'Kurkure Masala Munch 85g',
      category: 'Snacks & Beverages',
      price: 20,
      unit: '85 g',
      storeId: 'store-101',
      stock: 40,
      lastVerifiedMinutesAgo: 25,
      demandVelocity: 'Normal',
      substitutes: ['prod-010'],
      imageIcon: '🍿'
    }
  ],

  // Cancellation Reasons Distribution (from Case Study context)
  cancellationReasons: [
    { reason: 'Product Unavailable / Phantom Stock', percentage: 46, count: 1771 },
    { reason: 'Customer Cancelled (Delivery Delay)', percentage: 28, count: 1078 },
    { reason: 'Store Rejected Order (Stock Out)', percentage: 14, count: 539 },
    { reason: 'Delivery Partner Unavailable', percentage: 8, count: 308 },
    { reason: 'Other System Errors', percentage: 4, count: 154 }
  ],

  // Support Tickets Root Causes (5,900 Total Tickets in Month 6)
  supportTicketCauses: [
    { cause: 'Unavailable / Out-of-Stock Products', count: 2419, percentage: 41 },
    { cause: 'Delayed Delivery (>45 min)', count: 1652, percentage: 28 },
    { cause: 'Refund & Payment Processing', count: 826, percentage: 14 },
    { cause: 'Incorrect / Missing Items', count: 531, percentage: 9 },
    { cause: 'Promo Code & Coupon Failures', count: 472, percentage: 8 }
  ],

  // Operational Action Center Pre-populated Tasks
  actionCenterTasks: [
    {
      id: 'act-1',
      priority: 'HIGH',
      title: 'Store Audit Alert: QuickGrocery Whitefield',
      description: 'Inventory unverified for >24 hours with 3 out-of-stock SKUs causing 18 order rejections today.',
      actionLabel: 'Dispatch Priority Audit Alert',
      type: 'store_audit',
      targetId: 'store-105',
      status: 'pending'
    },
    {
      id: 'act-2',
      priority: 'HIGH',
      title: 'AI Auto-Substitution Deployment',
      description: 'Nandini Milk 1L has reached low confidence (54%) at Sri Lakshmi Stores. Enable auto-substitution rule to Amul Taaza 1L.',
      actionLabel: 'Deploy Auto-Sub Rule',
      type: 'auto_sub',
      targetId: 'prod-004',
      status: 'pending'
    },
    {
      id: 'act-3',
      priority: 'MEDIUM',
      title: 'Store Verification Request: FreshCart Hyperlocal',
      description: 'Freedom Oil 1L stock reported as 1 unit with Extreme demand velocity. High risk of fulfillment rejection.',
      actionLabel: 'Request Immediate Stock Count',
      type: 'stock_verify',
      targetId: 'prod-007',
      status: 'pending'
    }
  ]
};
