/* ==========================================================================
   SMART SUBSTITUTION ENGINE
   Generates & ranks optimal alternative product recommendations
   ========================================================================== */

window.SubstitutionEngine = {
  /**
   * Generates ranked substitution recommendations for a target product
   * @param {Object} targetProduct - Product requiring substitution
   * @param {Array} allProducts - List of all candidate products
   * @param {Array} allStores - List of all store entities
   * @returns {Array} Ranked list of alternative products with scores and price deltas
   */
  getRankedSubstitutions: function(targetProduct, allProducts, allStores) {
    if (!targetProduct || !allProducts) return [];

    const targetStore = allStores.find(s => s.id === targetProduct.storeId) || allStores[0];

    // Filter candidate products (same category or explicitly mapped substitutes)
    const candidates = allProducts.filter(p => {
      if (p.id === targetProduct.id) return false; // Don't recommend self
      const isSameCategory = p.category === targetProduct.category;
      const isMappedSub = targetProduct.substitutes && targetProduct.substitutes.includes(p.id);
      return (isSameCategory || isMappedSub) && p.stock > 0;
    });

    const ranked = candidates.map(candidate => {
      const candidateStore = allStores.find(s => s.id === candidate.storeId) || targetStore;
      const availRes = window.AvailabilityEngine.calculateScore(candidate, candidateStore);

      // 1. Category & Name Similarity Score (0 - 30)
      let catScore = (candidate.category === targetProduct.category) ? 30 : 15;

      // 2. Price Differential Score (0 - 25)
      // Closer price -> higher score. Cheaper replacement gives slight bonus
      const priceDelta = candidate.price - targetProduct.price; // e.g. -10 or +5
      const absPriceDiff = Math.abs(priceDelta);
      let priceScore = Math.max(0, 25 - (absPriceDiff / targetProduct.price) * 50);

      // 3. Availability Confidence Score (0 - 25)
      let availScore = (availRes.score / 100) * 25;

      // 4. Store Proximity Score (0 - 20)
      const distKm = candidateStore.distanceKm || 3.0;
      let proximityScore = Math.max(0, 20 - (distKm * 2));

      const totalSubScore = Math.round(catScore + priceScore + availScore + proximityScore);

      return {
        product: candidate,
        store: candidateStore,
        availabilityScore: availRes.score,
        availabilityStatus: availRes.status,
        matchScore: totalSubScore,
        priceDelta: priceDelta, // e.g. -10 (₹10 cheaper) or +5 (₹5 more)
        reasons: [
          candidate.category === targetProduct.category ? 'Same product category' : 'Similar utility item',
          priceDelta <= 0 ? `Save ₹${Math.abs(priceDelta)} compared to original` : `₹${priceDelta} price difference`,
          `${availRes.score}% availability confidence at ${candidateStore.name}`
        ]
      };
    });

    // Sort descending by matchScore
    return ranked.sort((a, b) => b.matchScore - a.matchScore);
  }
};
