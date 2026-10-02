/* ==========================================================================
   STORE MANAGER VIEW MODULE
   Store Dashboard, Health Gauge, Inventory Attention Center & Live Stock Controls
   ========================================================================== */

window.StoreView = {
  render: function(container) {
    const storeId = window.AppState ? window.AppState.selectedStoreId : 'store-101';
    const store = window.NOVA_DATA.stores.find(s => s.id === storeId) || window.NOVA_DATA.stores[0];
    const storeProducts = window.NOVA_DATA.products.filter(p => p.storeId === store.id);

    // Calculate store inventory metrics
    let totalScore = 0;
    let lowStockCount = 0;
    let highRiskCount = 0;

    storeProducts.forEach(p => {
      const res = window.AvailabilityEngine.calculateScore(p, store);
      totalScore += res.score;
      if (p.stock <= 3) lowStockCount++;
      if (res.status === 'HIGH') highRiskCount++;
    });

    const avgStoreScore = storeProducts.length > 0 ? Math.round(totalScore / storeProducts.length) : 85;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Store Intelligence Portal</h1>
          <p class="page-subtitle">Inventory maintenance & availability assurance for partner stores</p>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-size: 13px; color: var(--text-muted);">Active Store:</span>
          <select id="store-selector-dropdown" class="input-search" style="width: 240px; padding: 6px 12px;">
            ${window.NOVA_DATA.stores.map(s => `
              <option value="${s.id}" ${s.id === store.id ? 'selected' : ''}>${s.name} (${s.locality})</option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Store KPI Cards -->
      <div class="grid-4">
        <div class="card kpi-card">
          <div class="kpi-label">
            <span>STORE HEALTH SCORE</span>
            <span>❤️</span>
          </div>
          <div class="kpi-value">${store.fulfillmentRate}%</div>
          <div class="kpi-trend up">
            <span>Order Fulfillment Rate</span>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">
            <span>AVAILABILITY ACCURACY</span>
            <span>🎯</span>
          </div>
          <div class="kpi-value">${avgStoreScore}%</div>
          <div class="kpi-trend ${avgStoreScore >= 80 ? 'up' : 'warning'}">
            <span>Average Stock Confidence</span>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">
            <span>AT-RISK PRODUCTS</span>
            <span>⚠️</span>
          </div>
          <div class="kpi-value" style="color: ${highRiskCount > 0 ? 'var(--status-danger)' : 'var(--text-main)'};">${highRiskCount}</div>
          <div class="kpi-trend down">
            <span>Needs Verification</span>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">
            <span>ACTIVE SKUs</span>
            <span>📦</span>
          </div>
          <div class="kpi-value">${storeProducts.length}</div>
          <div class="kpi-trend up">
            <span>Managed Inventory</span>
          </div>
        </div>
      </div>

      <!-- INVENTORY ATTENTION CENTER -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div class="card-title">
            <span>🚨 Inventory Attention Center</span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Priority queued items likely to cause order rejections</span>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
          <button class="btn btn-sm btn-primary attention-filter-btn" data-priority="ALL">All Items</button>
          <button class="btn btn-sm btn-danger attention-filter-btn" data-priority="HIGH">High Priority (Urgent)</button>
          <button class="btn btn-sm btn-secondary attention-filter-btn" data-priority="MEDIUM">Medium Priority</button>
        </div>

        <div id="attention-center-list">
          ${this.renderAttentionList(storeProducts, store)}
        </div>
      </div>

      <!-- LIVE INVENTORY TABLE & CONTROLS -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span>📦 Live Store Inventory & Fast Stock Controls</span>
          </div>
          <button class="btn btn-sm btn-secondary" id="bulk-verify-btn">
            ⚡ Quick Confirm All Stock
          </button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Last Updated</th>
                <th>Demand Velocity</th>
                <th>Availability Confidence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="store-inventory-tbody">
              ${this.renderInventoryRows(storeProducts, store)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindEvents(container, store);
  },

  renderAttentionList: function(products, store) {
    const priorityFilter = window.AppState ? window.AppState.storePriorityFilter || 'ALL' : 'ALL';

    const items = products.map(p => {
      const avail = window.AvailabilityEngine.calculateScore(p, store);
      let priority = 'LOW';
      if (p.stock <= 3 || avail.status === 'HIGH') priority = 'HIGH';
      else if (p.lastVerifiedMinutesAgo > 180) priority = 'MEDIUM';

      return { product: p, availability: avail, priority };
    }).filter(i => priorityFilter === 'ALL' || i.priority === priorityFilter);

    if (items.length === 0) {
      return `<p style="padding: 16px; color: var(--text-muted); font-size: 13px;">No inventory attention alerts for selected priority level.</p>`;
    }

    return items.map(item => `
      <div style="background: var(--bg-surface); border-left: 4px solid ${item.priority === 'HIGH' ? 'var(--status-danger)' : (item.priority === 'MEDIUM' ? 'var(--status-warning)' : 'var(--status-success)')}; border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="color: #fff; font-size: 14px;">${item.product.name}</strong>
            <span class="confidence-pill ${item.priority === 'HIGH' ? 'confidence-low' : 'confidence-medium'}">${item.priority} PRIORITY</span>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            Current Stock: <strong>${item.product.stock} units</strong> • Confidence: ${item.availability.score}% • Demand: ${item.product.demandVelocity}
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-sm btn-primary quick-stock-btn" data-prodid="${item.product.id}" data-newstock="25">
            + Restock to 25
          </button>
        </div>
      </div>
    `).join('');
  },

  renderInventoryRows: function(products, store) {
    return products.map(p => {
      const avail = window.AvailabilityEngine.calculateScore(p, store);
      const minutesAgoStr = p.lastVerifiedMinutesAgo < 60 ? `${p.lastVerifiedMinutesAgo} mins ago` : `${(p.lastVerifiedMinutesAgo/60).toFixed(1)} hrs ago`;

      return `
        <tr>
          <td style="font-weight: 600; color: #fff;">
            <span>${p.imageIcon || '📦'}</span> ${p.name}
          </td>
          <td><span style="font-size: 11px; background: var(--bg-surface); padding: 2px 6px; border-radius: 4px; color: var(--text-muted);">${p.category}</span></td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn btn-sm btn-secondary stock-adjust-btn" data-prodid="${p.id}" data-delta="-1">-</button>
              <input type="number" class="stock-input-field" data-prodid="${p.id}" value="${p.stock}" style="width: 50px; background: var(--bg-dark); border: 1px solid var(--border-color); color: #fff; text-align: center; border-radius: 4px; padding: 4px;" min="0">
              <button class="btn btn-sm btn-secondary stock-adjust-btn" data-prodid="${p.id}" data-delta="1">+</button>
            </div>
          </td>
          <td style="font-size: 12px; color: var(--text-muted);">${minutesAgoStr}</td>
          <td>
            <span style="font-size: 11px; font-weight: 600; color: ${p.demandVelocity === 'Spike' || p.demandVelocity === 'Extreme' ? 'var(--status-warning)' : 'var(--text-muted)'};">
              ${p.demandVelocity}
            </span>
          </td>
          <td>
            <span class="confidence-pill ${avail.score >= 80 ? 'confidence-high' : (avail.score >= 60 ? 'confidence-medium' : 'confidence-low')}">
              ${avail.score}%
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-danger toggle-out-of-stock-btn" data-prodid="${p.id}">
              ${p.stock === 0 ? 'Mark In Stock' : 'Mark Out of Stock'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  bindEvents: function(container, store) {
    // Store dropdown selector
    const dropdown = container.querySelector('#store-selector-dropdown');
    if (dropdown) {
      dropdown.addEventListener('change', (e) => {
        window.AppState.selectedStoreId = e.target.value;
        window.App.renderCurrentView();
      });
    }

    // Attention center priority filters
    container.querySelectorAll('.attention-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.AppState.storePriorityFilter = e.target.dataset.priority;
        window.App.renderCurrentView();
      });
    });

    // Stock +/- adjustments with instant confidence recalculation
    container.addEventListener('click', (e) => {
      const adjustBtn = e.target.closest('.stock-adjust-btn');
      if (adjustBtn) {
        const prodId = adjustBtn.dataset.prodid;
        const delta = parseInt(adjustBtn.dataset.delta, 10);
        const product = window.NOVA_DATA.products.find(p => p.id === prodId);

        if (product) {
          const oldStock = product.stock;
          const oldRes = window.AvailabilityEngine.calculateScore(product, store);

          product.stock = Math.max(0, product.stock + delta);
          product.lastVerifiedMinutesAgo = 0; // Just updated!

          const newRes = window.AvailabilityEngine.calculateScore(product, store);

          window.App.showToast(`Updated ${product.name}: Stock ${oldStock} → ${product.stock}. Confidence ${oldRes.score}% → ${newRes.score}%!`);
          window.App.renderCurrentView();
        }
      }

      // Quick restock button
      const quickBtn = e.target.closest('.quick-stock-btn');
      if (quickBtn) {
        const prodId = quickBtn.dataset.prodid;
        const targetStock = parseInt(quickBtn.dataset.newstock, 10);
        const product = window.NOVA_DATA.products.find(p => p.id === prodId);

        if (product) {
          const oldRes = window.AvailabilityEngine.calculateScore(product, store);
          product.stock = targetStock;
          product.lastVerifiedMinutesAgo = 0;
          const newRes = window.AvailabilityEngine.calculateScore(product, store);

          window.App.showToast(`Restocked ${product.name} to ${targetStock}! Confidence jumped to ${newRes.score}%!`);
          window.App.renderCurrentView();
        }
      }

      // Toggle out of stock button
      const toggleBtn = e.target.closest('.toggle-out-of-stock-btn');
      if (toggleBtn) {
        const prodId = toggleBtn.dataset.prodid;
        const product = window.NOVA_DATA.products.find(p => p.id === prodId);
        if (product) {
          product.stock = (product.stock === 0) ? 15 : 0;
          product.lastVerifiedMinutesAgo = 0;
          window.App.showToast(`Status updated for ${product.name}!`);
          window.App.renderCurrentView();
        }
      }

      // Bulk verify button
      if (e.target.closest('#bulk-verify-btn')) {
        const storeProds = window.NOVA_DATA.products.filter(p => p.storeId === store.id);
        storeProds.forEach(p => p.lastVerifiedMinutesAgo = 0);
        window.App.showToast(`Confirmed inventory freshness for all ${storeProds.length} store items!`);
        window.App.renderCurrentView();
      }
    });

    // Stock direct input fields
    container.querySelectorAll('.stock-input-field').forEach(input => {
      input.addEventListener('change', (e) => {
        const prodId = e.target.dataset.prodid;
        const val = parseInt(e.target.value, 10);
        const product = window.NOVA_DATA.products.find(p => p.id === prodId);

        if (product && !isNaN(val)) {
          product.stock = Math.max(0, val);
          product.lastVerifiedMinutesAgo = 0;
          window.App.showToast(`Updated ${product.name} stock to ${product.stock}!`);
          window.App.renderCurrentView();
        }
      });
    });
  }
};
