/* ==========================================================================
   NOVA OPERATIONS COMMAND CENTER MODULE
   Command Center, Interactive Risk Map, Product Risk Table & Root Cause Analysis
   ========================================================================== */

window.OperationsView = {
  render: function(container) {
    const stores = window.NOVA_DATA.stores;
    const products = window.NOVA_DATA.products;

    // Calculate risk totals across store network
    let totalRiskProds = 0;
    products.forEach(p => {
      const store = stores.find(s => s.id === p.storeId) || stores[0];
      const res = window.AvailabilityEngine.calculateScore(p, store);
      if (res.status === 'HIGH') totalRiskProds++;
    });

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">NOVA CART Operations Command Center</h1>
          <p class="page-subtitle">Real-time platform orchestration, fulfillment risk monitoring & store audit control</p>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span class="confidence-pill confidence-high">
            <span class="live-pulse"></span> Network Live • 6 Partner Stores
          </span>
          <button class="btn btn-secondary" onclick="window.App.switchView('action-center')">
            ⚡ Action Center (${window.NOVA_DATA.actionCenterTasks.filter(t => t.status === 'pending').length})
          </button>
        </div>
      </div>

      <!-- Top Operations KPI Cards (Matching Case Study Month 6 Figures) -->
      <div class="grid-4">
        <div class="card kpi-card">
          <div class="kpi-label">
            <span>MONTHLY ORDERS</span>
            <span>📦</span>
          </div>
          <div class="kpi-value">38,500</div>
          <div class="kpi-trend up">
            <span>↑ +23.4% MoM (Case Study)</span>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">
            <span>CANCELLATION RATE</span>
            <span>🚨</span>
          </div>
          <div class="kpi-value" style="color: var(--status-danger);">11.0%</div>
          <div class="kpi-trend down">
            <span>↑ Up from 6.0% (Phantom Stock)</span>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">
            <span>REPEAT PURCHASE RATE</span>
            <span>📉</span>
          </div>
          <div class="kpi-value" style="color: var(--status-warning);">27.0%</div>
          <div class="kpi-trend down">
            <span>↓ Down from 41.0% (Trust Loss)</span>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">
            <span>SUPPORT TICKETS</span>
            <span>🎧</span>
          </div>
          <div class="kpi-value" style="color: var(--status-danger);">5,900</div>
          <div class="kpi-trend down">
            <span>↑ Up 90% (3.1k → 5.9k)</span>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE INVENTORY RISK MAP & STORE OVERVIEW -->
      <div class="grid-2-1">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span>🗺️ Hyperlocal Partner Store Risk Map (Bangalore Network)</span>
            </div>
            <span style="font-size: 11px; color: var(--text-muted);">Click node to inspect store inventory health</span>
          </div>

          <div class="map-canvas" id="ops-risk-map">
            <div class="map-grid-bg"></div>
            ${stores.map(s => {
              const sProds = products.filter(p => p.storeId === s.id);
              let sRisk = 'low-risk';
              if (s.status === 'critical' || s.fulfillmentRate < 75) sRisk = 'high-risk';
              else if (s.status === 'at-risk' || s.fulfillmentRate < 90) sRisk = 'medium-risk';

              return `
                <div class="map-store-node ${sRisk} ops-map-node" data-storeid="${s.id}" style="left: ${s.xPercent}%; top: ${s.yPercent}%;" title="${s.name} (${s.fulfillmentRate}% acceptance)">
                  ${s.fulfillmentRate}%
                </div>
              `;
            }).join('')}
          </div>

          <div style="display: flex; gap: 16px; margin-top: 12px; font-size: 12px; justify-content: center;">
            <span style="color: var(--status-success);">● High Confidence Store (≥90%)</span>
            <span style="color: var(--status-warning);">● Medium Risk Store (75-89%)</span>
            <span style="color: var(--status-danger);">● Critical Audit Store (<75%)</span>
          </div>
        </div>

        <!-- Selected Store Risk Inspector Card -->
        <div class="card" id="store-inspector-card">
          ${this.renderStoreInspector(stores[0], products)}
        </div>
      </div>

      <!-- CANCELLATION & SUPPORT ROOT CAUSE BREAKDOWN -->
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span>📊 Cancellation Root-Cause Analysis (11% Total Rate)</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${window.NOVA_DATA.cancellationReasons.map(r => `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #fff; font-weight: 600;">${r.reason}</span>
                  <span style="font-family: var(--font-mono); color: var(--text-muted);">${r.percentage}% (${r.count} orders)</span>
                </div>
                <div class="confidence-bar-wrapper">
                  <div class="confidence-bar-fill" style="width: ${r.percentage}%; background: ${r.percentage > 30 ? 'var(--status-danger)' : 'var(--brand-cyan)'};"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span>🎧 Support Ticket Driver Breakdown (5,900 Tickets)</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${window.NOVA_DATA.supportTicketCauses.map(c => `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #fff; font-weight: 600;">${c.cause}</span>
                  <span style="font-family: var(--font-mono); color: var(--text-muted);">${c.percentage}% (${c.count} tickets)</span>
                </div>
                <div class="confidence-bar-wrapper">
                  <div class="confidence-bar-fill" style="width: ${c.percentage}%; background: ${c.percentage > 30 ? 'var(--status-danger)' : 'var(--brand-indigo)'};"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- PRODUCT RISK TABLE -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span>🚨 Product Fulfillment Risk Master Table</span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Real-time catalog evaluation across all partner stores</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product SKU</th>
                <th>Partner Store</th>
                <th>Stock</th>
                <th>Last Update</th>
                <th>Demand Velocity</th>
                <th>Confidence Score</th>
                <th>Risk Level</th>
                <th>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderProductRiskRows(products, stores)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  renderStoreInspector: function(store, products) {
    const storeProducts = products.filter(p => p.storeId === store.id);
    let highRiskCount = 0;
    storeProducts.forEach(p => {
      const res = window.AvailabilityEngine.calculateScore(p, store);
      if (res.status === 'HIGH') highRiskCount++;
    });

    return `
      <div class="card-header">
        <div class="card-title">🏬 ${store.name}</div>
        <span class="confidence-pill ${store.fulfillmentRate >= 90 ? 'confidence-high' : 'confidence-low'}">
          ${store.status.toUpperCase()}
        </span>
      </div>

      <div style="margin-bottom: 16px;">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">${store.locality} • ${store.distanceKm} km distance</p>
        <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Fulfillment Acceptance Rate:</span>
            <strong style="color: #fff;">${store.fulfillmentRate}%</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Historical Order Rejections:</span>
            <strong style="color: var(--status-danger);">${store.historicalRejections} orders</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Inventory Freshness:</span>
            <strong style="color: #fff;">${store.inventoryFreshnessHours}h ago</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>High Risk SKUs:</span>
            <strong style="color: var(--status-danger);">${highRiskCount} products</strong>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" style="width: 100%;" onclick="window.AppState.selectedStoreId = '${store.id}'; window.App.switchView('store');">
        Manage Store Inventory →
      </button>
    `;
  },

  renderProductRiskRows: function(products, stores) {
    return products.map(p => {
      const store = stores.find(s => s.id === p.storeId) || stores[0];
      const avail = window.AvailabilityEngine.calculateScore(p, store);
      const minutesAgoStr = p.lastVerifiedMinutesAgo < 60 ? `${p.lastVerifiedMinutesAgo} mins ago` : `${(p.lastVerifiedMinutesAgo/60).toFixed(1)} hrs ago`;

      let actionRecommendation = 'Stock Stable';
      if (p.stock === 0) actionRecommendation = 'Trigger Auto-Substitution';
      else if (avail.status === 'HIGH') actionRecommendation = 'Dispatch Verification Audit';
      else if (p.lastVerifiedMinutesAgo > 180) actionRecommendation = 'Request Inventory Refresh';

      return `
        <tr>
          <td style="font-weight: 600; color: #fff;">${p.name}</td>
          <td>${store.name}</td>
          <td style="font-family: var(--font-mono);">${p.stock} units</td>
          <td style="font-size: 12px; color: var(--text-muted);">${minutesAgoStr}</td>
          <td><span style="font-size: 11px; font-weight: 600; color: var(--text-muted);">${p.demandVelocity}</span></td>
          <td>
            <span class="confidence-pill ${avail.score >= 80 ? 'confidence-high' : (avail.score >= 60 ? 'confidence-medium' : 'confidence-low')}">
              ${avail.score}%
            </span>
          </td>
          <td>
            <span style="font-size: 11px; font-weight: 700; color: ${avail.status === 'HIGH' ? 'var(--status-danger)' : (avail.status === 'MEDIUM' ? 'var(--status-warning)' : 'var(--status-success)')};">
              ${avail.status} RISK
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-secondary dispatch-ops-action-btn" data-prodname="${p.name}" data-action="${actionRecommendation}">
              ${actionRecommendation}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  bindEvents: function(container) {
    // Map node click -> inspect store
    container.querySelectorAll('.ops-map-node').forEach(node => {
      node.addEventListener('click', (e) => {
        const storeId = e.currentTarget.dataset.storeid;
        const store = window.NOVA_DATA.stores.find(s => s.id === storeId);
        if (store) {
          const inspectorCard = container.querySelector('#store-inspector-card');
          if (inspectorCard) {
            inspectorCard.innerHTML = this.renderStoreInspector(store, window.NOVA_DATA.products);
          }
        }
      });
    });

    // Dispatch ops action button
    container.querySelectorAll('.dispatch-ops-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        const prodName = e.currentTarget.dataset.prodname;
        window.App.showToast(`Ops Dispatch Executed: "${action}" for ${prodName}`);
      });
    });
  }
};
