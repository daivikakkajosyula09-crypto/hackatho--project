/* ==========================================================================
   NOVA INTELLIGENCE ENGINE MODULE
   Evidence-Based Insights, Automated Risk Pattern Detection & Recommendations
   ========================================================================== */

window.IntelligenceView = {
  render: function(container) {
    const insights = [
      {
        id: 'ins-1',
        title: 'Inventory freshness is deteriorating across high-demand grocery SKUs',
        evidence: '37% of high-velocity SKUs in HSR Layout and Whitefield haven not been verified in >14 hours.',
        impact: 'High probability of phantom inventory cancellations (estimated +340 weekly cancellations).',
        recommendation: 'Dispatch immediate store audit verification notifications to 3 partner stores.',
        priority: 'HIGH'
      },
      {
        id: 'ins-2',
        title: 'High-demand staples with low availability confidence disproportionately drive failed orders',
        evidence: 'Nandini Milk 1L and Freedom Oil 1L account for 28% of total weekly order rejection events.',
        impact: 'Escalating customer support tickets (+90% MoM increase) and falling repeat purchase rate (27%).',
        recommendation: 'Enable automated AI substitution rules for dairy & edible oil categories when confidence drops <65%.',
        priority: 'HIGH'
      },
      {
        id: 'ins-3',
        title: 'Store order rejection rate spikes during evening peak hours (6 PM - 9 PM)',
        evidence: 'Partner stores reject 18.4% of incoming orders after 6 PM due to unrecorded in-store walk-in sales.',
        impact: 'Customer average delivery time inflates to 37 minutes, damaging brand reliability.',
        recommendation: 'Enforce mandatory 5 PM store inventory reconciliation before peak evening demand hours.',
        priority: 'MEDIUM'
      },
      {
        id: 'ins-4',
        title: 'Promotional spending inefficiently spent on low-confidence partner stores',
        evidence: '₹17 Lakh promotional spend is being routed to stores with <75% fulfillment accuracy.',
        impact: 'Higher ad burn with zero repeat customer retention due to initial order failure.',
        recommendation: 'Tie promotional ad budget distribution directly to store inventory accuracy scores.',
        priority: 'MEDIUM'
      }
    ];

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">NOVA Intelligence Engine</h1>
          <p class="page-subtitle">Automated pattern synthesis: Evidence → Impact → Recommended Action</p>
        </div>
        <button class="btn btn-primary" onclick="window.App.showToast('Synthesizing fresh data signals across 6 stores...');">
          ⚡ Run Engine Synthesis
        </button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${insights.map(ins => `
          <div class="card" style="border-left: 4px solid ${ins.priority === 'HIGH' ? 'var(--status-danger)' : 'var(--status-warning)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #fff;">${ins.title}</h3>
              <span class="confidence-pill ${ins.priority === 'HIGH' ? 'confidence-low' : 'confidence-medium'}">
                ${ins.priority} PRIORITY
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;">
              <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 11px; font-weight: 700; color: var(--brand-cyan); margin-bottom: 4px; text-transform: uppercase;">EVIDENCE</div>
                <p style="font-size: 12px; color: var(--text-muted);">${ins.evidence}</p>
              </div>

              <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 11px; font-weight: 700; color: var(--status-danger); margin-bottom: 4px; text-transform: uppercase;">BUSINESS IMPACT</div>
                <p style="font-size: 12px; color: var(--text-muted);">${ins.impact}</p>
              </div>

              <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 11px; font-weight: 700; color: var(--status-success); margin-bottom: 4px; text-transform: uppercase;">RECOMMENDED ACTION</div>
                <p style="font-size: 12px; color: var(--text-muted);">${ins.recommendation}</p>
              </div>
            </div>

            <div style="margin-top: 14px; display: flex; justify-content: flex-end; gap: 10px;">
              <button class="btn btn-sm btn-primary execute-insight-btn" data-institle="${ins.title}">
                Execute Recommendation
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.execute-insight-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.App.showToast(`Recommendation executed for: "${e.target.dataset.institle}"`);
      });
    });
  }
};
