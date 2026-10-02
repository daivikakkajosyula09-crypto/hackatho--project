/* ==========================================================================
   WHY NOVA INTELLISTOCK - STORYTELLING & BUDGET PROOF MODULE
   Hackathon Solution Framework & Budget Feasibility Proof
   ========================================================================== */

window.StoryView = {
  render: function(container) {
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Why NOVA Intellistock?</h1>
          <p class="page-subtitle">Hackathon product architecture, storytelling logic & budget compliance proof</p>
        </div>
        <span class="confidence-pill confidence-high">
          Solution Framework Approved
        </span>
      </div>

      <!-- VALUE CHAIN STEPPER -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div class="card-title">🔗 End-to-End Value Propagation Chain</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-top: 10px;">
          <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">📊</div>
            <div style="font-size: 11px; font-weight: 700; color: var(--brand-cyan); margin-bottom: 4px;">1. EVIDENCE</div>
            <p style="font-size: 11px; color: var(--text-muted);">Cancellation up to 11%, Repeat down to 27%</p>
          </div>

          <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">💡</div>
            <div style="font-size: 11px; font-weight: 700; color: var(--brand-indigo); margin-bottom: 4px;">2. INSIGHT</div>
            <p style="font-size: 11px; color: var(--text-muted);">Growth without accuracy burns promo cash</p>
          </div>

          <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">🎯</div>
            <div style="font-size: 11px; font-weight: 700; color: var(--status-danger); margin-bottom: 4px;">3. PROBLEM</div>
            <p style="font-size: 11px; color: var(--text-muted);">Phantom stock & unverified store inventory</p>
          </div>

          <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">🧠</div>
            <div style="font-size: 11px; font-weight: 700; color: var(--brand-cyan); margin-bottom: 4px;">4. INTELLIGENCE</div>
            <p style="font-size: 11px; color: var(--text-muted);">Deterministic 0-100 Availability Confidence</p>
          </div>

          <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">⚡</div>
            <div style="font-size: 11px; font-weight: 700; color: var(--status-warning); margin-bottom: 4px;">5. ACTION</div>
            <p style="font-size: 11px; color: var(--text-muted);">Auto-substitution & store audit dispatches</p>
          </div>

          <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">📈</div>
            <div style="font-size: 11px; font-weight: 700; color: var(--status-success); margin-bottom: 4px;">6. IMPACT</div>
            <p style="font-size: 11px; color: var(--text-muted);">+₹10.4L/mo saved, 340% 6-month ROI</p>
          </div>
        </div>
      </div>

      <!-- BUDGET COMPLIANCE PROOF CARD -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">💰 ₹25 Lakh Implementation Budget Allocation</div>
          <span class="confidence-pill confidence-high">Fully Compliant (No Warehouse Capex)</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Implementation Deliverable</th>
                <th>Budget Allocation</th>
                <th>Strategic Justification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: 700; color: #fff;">Software & Integration</td>
                <td>NOVA Intellistock Engine API & SDK</td>
                <td style="font-family: var(--font-mono); color: var(--brand-cyan);">₹9.5 Lakhs</td>
                <td>Lightweight partner integration without requiring new store hardware.</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #fff;">Partner Store Enablement</td>
                <td>Store Manager WhatsApp Bot & Quick App</td>
                <td style="font-family: var(--font-mono); color: var(--brand-cyan);">₹6.0 Lakhs</td>
                <td>1-click stock update interface requiring zero staff training.</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #fff;">Ops Audit Dispatch</td>
                <td>Field Verification Incentives & Operations Alerting</td>
                <td style="font-family: var(--font-mono); color: var(--brand-cyan);">₹5.5 Lakhs</td>
                <td>Performance bonuses for partner stores maintaining >95% accuracy.</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #fff;">Contingency & Pilots</td>
                <td>Pilot Deployment in Koramangala & HSR Layout</td>
                <td style="font-family: var(--font-mono); color: var(--brand-cyan);">₹4.0 Lakhs</td>
                <td>6-month buffer for local deployment iterations.</td>
              </tr>
              <tr style="background: var(--bg-surface); font-weight: 800;">
                <td style="color: #fff;">TOTAL IMPLEMENTATION</td>
                <td style="color: #fff;">6-Month Deployment Budget</td>
                <td style="font-family: var(--font-mono); color: var(--status-success); font-size: 16px;">₹25.0 Lakhs</td>
                <td style="color: var(--status-success);">100% within maximum budget constraint!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
