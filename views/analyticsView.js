/* ==========================================================================
   ANALYTICS & MACRO BUSINESS TRENDS MODULE
   6-Month Case Study Comparison: Proving "GROWTH ≠ HEALTHY GROWTH"
   ========================================================================== */

window.AnalyticsView = {
  render: function(container) {
    const m1 = window.NOVA_DATA.caseStudyMetrics.month1;
    const m6 = window.NOVA_DATA.caseStudyMetrics.month6;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Platform Analytics & Macro Business Health</h1>
          <p class="page-subtitle">6-Month comparative analysis of NOVA CART operational metrics</p>
        </div>
        <span class="confidence-pill confidence-low" style="font-size: 13px;">
          🚨 PARADOX DETECTED: GROWTH ≠ HEALTHY GROWTH
        </span>
      </div>

      <!-- Growth vs Health Contrast Cards -->
      <div class="grid-2" style="margin-bottom: 24px;">
        <!-- Topline Volume (Looks Good on Surface) -->
        <div class="card" style="border: 1px solid rgba(16, 185, 129, 0.3);">
          <div class="card-header">
            <div class="card-title" style="color: var(--status-success);">📈 Surface Growth Metrics (Topline Expansion)</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Registered Users</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">${m1.registeredUsers.toLocaleString()} → ${m6.registeredUsers.toLocaleString()} (+46.3%)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Monthly Active Users (MAU)</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">${m1.activeUsers.toLocaleString()} → ${m6.activeUsers.toLocaleString()} (+17.9%)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Monthly Orders</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">${m1.monthlyOrders.toLocaleString()} → ${m6.monthlyOrders.toLocaleString()} (+23.4%)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Monthly Revenue</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">₹${m1.revenueLakhs}L → ₹${m6.revenueLakhs}L (+19.7%)</span>
            </div>
          </div>
        </div>

        <!-- Operational Health (Alarming Collapse) -->
        <div class="card" style="border: 1px solid rgba(239, 68, 68, 0.4); background: linear-gradient(135deg, var(--bg-card), #1F1315);">
          <div class="card-header">
            <div class="card-title" style="color: var(--status-danger);">🚨 Operational Reliability Degradation</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Repeat Purchase Rate</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: var(--status-danger);">${m1.repeatPurchaseRate}% → ${m6.repeatPurchaseRate}% (-14% drop!)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Cancellation Rate</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: var(--status-danger);">${m1.cancellationRate}% → ${m6.cancellationRate}% (+83% spike!)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Average Delivery Time</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: var(--status-danger);">${m1.averageDeliveryTime} min → ${m6.averageDeliveryTime} min (+28% delay)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-sm);">
              <span>Customer Support Tickets</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: var(--status-danger);">${m1.supportTickets.toLocaleString()} → ${m6.supportTickets.toLocaleString()} (+90.3% spike!)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CUSTOMER SIGNALS SURVEY CHART -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">🗣️ Customer Feedback & Friction Signals Survey (% Reports)</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          ${window.NOVA_DATA.customerSignals.map(s => `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="color: #fff; font-weight: 600;">${s.signal}</span>
                <span style="font-family: var(--font-mono); color: var(--brand-cyan); font-weight: 700;">${s.percentage}%</span>
              </div>
              <div class="confidence-bar-wrapper">
                <div class="confidence-bar-fill" style="width: ${s.percentage}%; background: ${s.percentage >= 25 ? 'var(--status-danger)' : 'var(--brand-cyan)'};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
