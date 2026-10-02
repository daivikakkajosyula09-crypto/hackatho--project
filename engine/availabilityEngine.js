/* ==========================================================================
   DETERMINISTIC AVAILABILITY INTELLIGENCE ENGINE
   Calculates 0-100 Availability Confidence score & explainability drivers
   ========================================================================== */

window.AvailabilityEngine = {
  // Transparent, documented scoring weights
  WEIGHTS: {
    stock: 0.40,      // Weight for stock quantity vs safety threshold
    freshness: 0.25,  // Weight for inventory verification recency
    demand: 0.20,     // Weight for demand pressure index
    store: 0.15       // Weight for historical store order acceptance
  },

  /**
   * Calculates availability confidence score (0 to 100) and drivers
   * @param {Object} product - Product entity
   * @param {Object} store - Store entity
   * @returns {Object} Score result with breakdown drivers and risk status
   */
  calculateScore: function(product, store) {
    if (!product || !store) {
      return { score: 0, status: 'LOW', drivers: ['Invalid entity data'] };
    }

    // 1. Stock Confidence Component (0 - 100)
    let stockFactor = 0;
    const stock = Number(product.stock) || 0;
    if (stock >= 15) stockFactor = 100;
    else if (stock >= 10) stockFactor = 85;
    else if (stock >= 5) stockFactor = 65;
    else if (stock >= 1) stockFactor = 35;
    else stockFactor = 0; // Out of stock

    // 2. Inventory Freshness Component (0 - 100)
    let freshnessFactor = 0;
    const minutesAgo = Number(product.lastVerifiedMinutesAgo) || 0;
    const hoursAgo = minutesAgo / 60;
    if (hoursAgo <= 1) freshnessFactor = 100;
    else if (hoursAgo <= 4) freshnessFactor = 85;
    else if (hoursAgo <= 12) freshnessFactor = 65;
    else if (hoursAgo <= 24) freshnessFactor = 40;
    else freshnessFactor = 15; // Outdated

    // 3. Demand Pressure Component (0 - 100)
    let demandFactor = 100;
    const velocity = product.demandVelocity || 'Normal';
    if (velocity === 'Normal') demandFactor = 100;
    else if (velocity === 'Elevated') demandFactor = 75;
    else if (velocity === 'Spike') demandFactor = 45;
    else if (velocity === 'Extreme') demandFactor = 20;

    // 4. Store Reliability Component (0 - 100)
    let storeFactor = 0;
    const fulfillmentRate = Number(store.fulfillmentRate) || 90;
    if (fulfillmentRate >= 95) storeFactor = 100;
    else if (fulfillmentRate >= 85) storeFactor = 80;
    else if (fulfillmentRate >= 75) storeFactor = 60;
    else storeFactor = 30;

    // Calculate final weighted score
    const finalScore = Math.round(
      (stockFactor * this.WEIGHTS.stock) +
      (freshnessFactor * this.WEIGHTS.freshness) +
      (demandFactor * this.WEIGHTS.demand) +
      (storeFactor * this.WEIGHTS.store)
    );

    // Determine Risk Status
    let riskStatus = 'HIGH'; // Low confidence
    if (finalScore >= 80) riskStatus = 'LOW'; // Low risk = High confidence
    else if (finalScore >= 60) riskStatus = 'MEDIUM';

    // Generate Explainability Drivers
    const drivers = [];

    // Freshness driver
    if (hoursAgo <= 1) {
      drivers.push({ text: `Verified ${Math.round(minutesAgo)} minutes ago`, pass: true, points: Math.round(freshnessFactor * this.WEIGHTS.freshness) });
    } else {
      drivers.push({ text: `Inventory last updated ${hoursAgo.toFixed(1)}h ago`, pass: false, points: Math.round(freshnessFactor * this.WEIGHTS.freshness) });
    }

    // Stock driver
    if (stock >= 5) {
      drivers.push({ text: `Current stock healthy (${stock} units available)`, pass: true, points: Math.round(stockFactor * this.WEIGHTS.stock) });
    } else if (stock > 0) {
      drivers.push({ text: `Low stock warning (${stock} units remaining)`, pass: false, points: Math.round(stockFactor * this.WEIGHTS.stock) });
    } else {
      drivers.push({ text: `Item out of stock (0 units)`, pass: false, points: 0 });
    }

    // Demand driver
    if (velocity === 'Normal') {
      drivers.push({ text: `Stable recent demand rate`, pass: true, points: Math.round(demandFactor * this.WEIGHTS.demand) });
    } else {
      drivers.push({ text: `${velocity} demand velocity detected`, pass: false, points: Math.round(demandFactor * this.WEIGHTS.demand) });
    }

    // Store driver
    if (fulfillmentRate >= 85) {
      drivers.push({ text: `Store order acceptance rate: ${fulfillmentRate}%`, pass: true, points: Math.round(storeFactor * this.WEIGHTS.store) });
    } else {
      drivers.push({ text: `Elevated store order rejection rate (${100 - fulfillmentRate}%)`, pass: false, points: Math.round(storeFactor * this.WEIGHTS.store) });
    }

    return {
      score: finalScore,
      status: riskStatus,
      stockFactor,
      freshnessFactor,
      demandFactor,
      storeFactor,
      drivers
    };
  }
};
