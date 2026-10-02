/* ==========================================================================
   BUSINESS IMPACT SIMULATOR ENGINE
   Models operational ROI & cancellation reduction scenarios
   ========================================================================== */

window.ImpactSimulatorEngine = {
  // Baseline constants from Case Study Month 6
  BASELINE: {
    monthlyOrders: 38500,
    cancellationRate: 11.0, // %
    cancellationsCount: 4235, // 11% of 38,500
    unavailableCancellations: 1948, // ~46% of cancellations due to phantom inventory
    averageOrderValue: 486, // ₹
    monthlySupportTickets: 5900,
    unavailableTickets: 2419, // ~41% of tickets
    repeatPurchaseRate: 27, // %
    implementationBudgetLakhs: 25.0 // ₹25 Lakh budget constraint
  },

  /**
   * Simulates business ROI metrics based on interactive parameters
   * @param {number} accuracyImp - % Inventory accuracy target (e.g. 60 to 98)
   * @param {number} cancelRed - % Cancellation reduction target (e.g. 0 to 85)
   * @param {number} subAccept - % Substitution acceptance rate (e.g. 10 to 80)
   * @param {number} storeAdopt - % Store partner adoption rate (e.g. 30 to 95)
   * @returns {Object} Calculated impact metrics & ROI
   */
  simulate: function(accuracyImp, cancelRed, subAccept, storeAdopt) {
    const accuracyFactor = accuracyImp / 100;
    const cancelRedFactor = cancelRed / 100;
    const subAcceptFactor = subAccept / 100;
    const storeAdoptFactor = storeAdopt / 100;

    // 1. Calculate Monthly Avoided Cancellations
    // Combined impact of store inventory accuracy + auto substitutions + partner adoption
    const effectiveCancellationReduction = Math.min(0.85, (cancelRedFactor * 0.5) + (subAcceptFactor * 0.3) + (storeAdoptFactor * 0.2));
    const avoidedCancellations = Math.round(this.BASELINE.unavailableCancellations * effectiveCancellationReduction);

    // 2. Calculate Recovered Monthly Revenue (in ₹ Lakhs)
    const recoveredRevenueRupees = avoidedCancellations * this.BASELINE.averageOrderValue;
    const recoveredRevenueLakhs = (recoveredRevenueRupees / 100000).toFixed(2);

    // 3. Support Ticket Reduction
    const ticketReductionFactor = effectiveCancellationReduction * 0.9;
    const avoidedSupportTickets = Math.round(this.BASELINE.unavailableTickets * ticketReductionFactor);
    const newSupportTicketTotal = Math.max(1200, this.BASELINE.monthlySupportTickets - avoidedSupportTickets);

    // 4. Repeat Purchase Rate Lift
    // Restoring inventory trust boosts repeat purchases back towards 41%
    const repeatLift = (effectiveCancellationReduction * 11.5).toFixed(1);
    const projectedRepeatRate = (this.BASELINE.repeatPurchaseRate + parseFloat(repeatLift)).toFixed(1);

    // 5. Projected Annualized ROI on ₹25 Lakh Implementation Budget
    const annualRevenueGainLakhs = parseFloat(recoveredRevenueLakhs) * 12;
    // Support cost savings (~₹150 per ticket resolved)
    const annualSupportSavingsLakhs = ((avoidedSupportTickets * 150 * 12) / 100000);
    const totalAnnualBenefitLakhs = annualRevenueGainLakhs + annualSupportSavingsLakhs;
    const roiPercentage = Math.round(((totalAnnualBenefitLakhs - this.BASELINE.implementationBudgetLakhs) / this.BASELINE.implementationBudgetLakhs) * 100);

    return {
      avoidedCancellations,
      newCancellationRate: Math.max(3.2, (this.BASELINE.cancellationRate - (avoidedCancellations / this.BASELINE.monthlyOrders * 100))).toFixed(1),
      recoveredRevenueLakhs: parseFloat(recoveredRevenueLakhs),
      avoidedSupportTickets,
      newSupportTicketTotal,
      projectedRepeatRate: parseFloat(projectedRepeatRate),
      annualBenefitLakhs: totalAnnualBenefitLakhs.toFixed(1),
      roiPercentage: Math.max(0, roiPercentage)
    };
  }
};
