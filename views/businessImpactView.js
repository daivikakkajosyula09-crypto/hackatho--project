/* ==========================================================================
   BUSINESS IMPACT SIMULATOR MODULE
   Interactive Scenario Modeler & Budget ROI Calculator
   ========================================================================== */

window.BusinessImpactView = {
  render: function(container) {
    const accuracyImp = window.AppState ? window.AppState.simAccuracy : 90;
    const cancelRed = window.AppState ? window.AppState.simCancelRed : 70;
    const subAccept = window.AppState ? window.AppState.simSubAccept : 65;
    const storeAdopt = window.AppState ? window.AppState.simStoreAdopt : 80;

    const result = window.ImpactSimulatorEngine.simulate(accuracyImp, cancelRed, subAccept, storeAdopt);

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Business Impact Simulator</h1>
          <p class="page-subtitle">Simulate inventory accuracy improvements & calculate ROI on ₹25 Lakh implementation budget</p>
        </div>
        <span class="confidence-pill confidence-medium">
          Budget Constraint: ₹25 Lakh Max
        </span>
      </div>

      <div style="background: var(--bg-surface); border: 1px dashed var(--border-light); padding: 12px 16px; border-radius: var(--radius-md); font-size: 12px; color: var(--text-muted); margin-bottom: 24px;">
        💡 <strong>Disclaimer:</strong> Illustrative scenario model based on prototype assumptions & case study parameters.
      </div>

      <div class="grid-2-1">
        <!-- Interactive Sliders Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">⚙️ Scenario Parameter Controls</div>
            <button class="btn btn-sm btn-secondary" id="reset-sim-btn">Reset Defaults</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 10px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px;">
                <span>Store Inventory Accuracy Target</span>
                <span style="color: var(--brand-cyan); font-family: var(--font-mono);">${accuracyImp}%</span>
              </div>
              <input type="range" class="range-slider sim-slider" data-param="simAccuracy" min="50" max="99" value="${accuracyImp}">
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px;">
                <span>Phantom Stock Cancellation Reduction</span>
                <span style="color: var(--brand-cyan); font-family: var(--font-mono);">${cancelRed}%</span>
              </div>
              <input type="range" class="range-slider sim-slider" data-param="simCancelRed" min="0" max="90" value="${cancelRed}">
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px;">
                <span>Customer AI Substitution Acceptance Rate</span>
                <span style="color: var(--brand-cyan); font-family: var(--font-mono);">${subAccept}%</span>
              </div>
              <input type="range" class="range-slider sim-slider" data-param="simSubAccept" min="10" max="90" value="${subAccept}">
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px;">
                <span>Partner Store Enablement Adoption</span>
                <span style="color: var(--brand-cyan); font-family: var(--font-mono);">${storeAdopt}%</span>
              </div>
              <input type="range" class="range-slider sim-slider" data-param="simStoreAdopt" min="20" max="95" value="${storeAdopt}">
            </div>
          </div>
        </div>

        <!-- Projected Impact Output Card -->
        <div class="card" style="background: linear-gradient(135deg, var(--bg-card), #161F30); border: 1px solid var(--brand-cyan-glow);">
          <div class="card-header">
            <div class="card-title" style="color: var(--brand-cyan);">📈 Projected Business Results</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm);">
              <div style="font-size: 11px; color: var(--text-muted);">AVOIDED MONTHLY CANCELLATIONS</div>
              <div style="font-family: var(--font-mono); font-size: 22px; font-weight: 700; color: var(--status-success);">
                +${result.avoidedCancellations} orders/mo
              </div>
              <div style="font-size: 11px; color: var(--text-dim);">New cancellation rate: ${result.newCancellationRate}% (was 11%)</div>
            </div>

            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm);">
              <div style="font-size: 11px; color: var(--text-muted);">RECOVERED MONTHLY REVENUE</div>
              <div style="font-family: var(--font-mono); font-size: 22px; font-weight: 700; color: #fff;">
                +₹${result.recoveredRevenueLakhs} Lakhs/mo
              </div>
              <div style="font-size: 11px; color: var(--text-dim);">AOV ₹486 per saved order</div>
            </div>

            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm);">
              <div style="font-size: 11px; color: var(--text-muted);">SUPPORT TICKET REDUCTION</div>
              <div style="font-family: var(--font-mono); font-size: 22px; font-weight: 700; color: var(--brand-indigo);">
                -${result.avoidedSupportTickets} tickets/mo
              </div>
              <div style="font-size: 11px; color: var(--text-dim);">New monthly ticket volume: ${result.newSupportTicketTotal}</div>
            </div>

            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm);">
              <div style="font-size: 11px; color: var(--text-muted);">PROJECTED REPEAT PURCHASE LIFT</div>
              <div style="font-family: var(--font-mono); font-size: 22px; font-weight: 700; color: var(--status-success);">
                ${result.projectedRepeatRate}% (was 27%)
              </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(6,182,212,0.2), rgba(16,185,129,0.2)); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--brand-cyan);">
              <div style="font-size: 11px; font-weight: 700; color: var(--brand-cyan); text-transform: uppercase;">ANNUALIZED ROI ON ₹25 LAKH BUDGET</div>
              <div style="font-family: var(--font-mono); font-size: 28px; font-weight: 800; color: #fff;">
                ${result.roiPercentage}% ROI
              </div>
              <div style="font-size: 11px; color: var(--text-muted);">Annual Benefit: +₹${result.annualBenefitLakhs} Lakhs</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  bindEvents: function(container) {
    container.querySelectorAll('.sim-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const param = e.target.dataset.param;
        window.AppState[param] = parseInt(e.target.value, 10);
        this.render(container);
      });
    });

    const resetBtn = container.querySelector('#reset-sim-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.AppState.simAccuracy = 90;
        window.AppState.simCancelRed = 70;
        window.AppState.simSubAccept = 65;
        window.AppState.simStoreAdopt = 80;
        this.render(container);
      });
    }
  }
};
