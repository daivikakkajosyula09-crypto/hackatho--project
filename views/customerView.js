/* ==========================================================================
   CUSTOMER VIEW MODULE
   Customer Home, Smart Search, 92% Confidence Card, Cart & Substitutions
   ========================================================================== */

window.CustomerView = {
  render: function(container) {
    const products = window.NOVA_DATA.products;
    const stores = window.NOVA_DATA.stores;
    const cart = window.AppState ? window.AppState.cart : [];

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Local Commerce Marketplace</h1>
          <p class="page-subtitle">Real-time verified stock from 6 trusted neighborhood stores near Koramangala</p>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div class="search-wrapper" style="width: 320px;">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" id="cust-search-input" class="input-search" placeholder="Search Atta, Milk, Oils, Snacks..." value="${window.AppState ? window.AppState.searchQuery : ''}">
          </div>
          <button class="btn btn-secondary" id="open-cart-btn">
            🛒 Cart (${cart.reduce((sum, item) => sum + item.qty, 0)})
          </button>
        </div>
      </div>

      <!-- Verified Availability Highlight Banner -->
      <div class="card" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1)); border: 1px solid var(--brand-cyan-glow); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 16px; align-items: center;">
            <div style="background: var(--brand-cyan); color: #000; padding: 12px; border-radius: var(--radius-md); font-size: 20px;">⚡</div>
            <div>
              <h3 style="font-size: 15px; font-weight: 700; color: #fff;">Availability Intelligence Active</h3>
              <p style="font-size: 12px; color: var(--text-muted);">Every product displays deterministic availability confidence score & last verification time.</p>
            </div>
          </div>
          <span class="confidence-pill confidence-high">
            <span class="live-pulse"></span> 98.4% System Accuracy
          </span>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 4px;">
        <button class="btn btn-sm btn-primary cat-filter-btn" data-cat="ALL">All Items</button>
        <button class="btn btn-sm btn-secondary cat-filter-btn" data-cat="Staples & Flour">🌾 Staples & Atta</button>
        <button class="btn btn-sm btn-secondary cat-filter-btn" data-cat="Dairy & Eggs">🥛 Dairy & Eggs</button>
        <button class="btn btn-sm btn-secondary cat-filter-btn" data-cat="Edible Oils">🛢️ Oils & Ghee</button>
        <button class="btn btn-sm btn-secondary cat-filter-btn" data-cat="Snacks & Beverages">🍿 Snacks & Drinks</button>
      </div>

      <!-- Product Cards Grid -->
      <div class="grid-3" id="customer-products-grid">
        ${this.renderProductCards(products, stores)}
      </div>

      <!-- Shopping Cart & Substitution Drawer Overlay -->
      <div id="cart-drawer-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 680px;">
          <div class="modal-header">
            <h3 class="modal-title">Your Order Cart</h3>
            <button class="modal-close" onclick="document.getElementById('cart-drawer-modal').classList.remove('active')">✕</button>
          </div>
          <div id="cart-drawer-content">
            ${this.renderCartContent(cart, products, stores)}
          </div>
        </div>
      </div>

      <!-- Explainability Modal -->
      <div id="explainability-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title" id="exp-title">Availability Score Breakdown</h3>
            <button class="modal-close" onclick="document.getElementById('explainability-modal').classList.remove('active')">✕</button>
          </div>
          <div id="exp-modal-body"></div>
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  renderProductCards: function(products, stores) {
    const query = (window.AppState ? window.AppState.searchQuery : '').toLowerCase();
    const filterCat = window.AppState ? window.AppState.selectedCategory : 'ALL';

    const filtered = products.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchCat = (filterCat === 'ALL' || p.category === filterCat);
      return matchQuery && matchCat;
    });

    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <p style="font-size: 16px; color: var(--text-muted); margin-bottom: 8px;">No matching products found</p>
          <p style="font-size: 12px; color: var(--text-dim);">Try searching for "Atta", "Milk", or "Oil"</p>
        </div>
      `;
    }

    return filtered.map(p => {
      const store = stores.find(s => s.id === p.storeId) || stores[0];
      const availRes = window.AvailabilityEngine.calculateScore(p, store);

      let confClass = 'confidence-high';
      if (availRes.status === 'MEDIUM') confClass = 'confidence-medium';
      if (availRes.status === 'HIGH') confClass = 'confidence-low'; // High risk = Low confidence

      const minutesAgoStr = p.lastVerifiedMinutesAgo < 60 ? `${p.lastVerifiedMinutesAgo} minutes ago` : `${(p.lastVerifiedMinutesAgo/60).toFixed(1)} hours ago`;

      return `
        <div class="card" style="display: flex; flex-direction: column; justify-space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <span style="font-size: 28px;">${p.imageIcon || '📦'}</span>
              <button class="confidence-pill ${confClass} explain-btn" data-prodid="${p.id}" style="border: none; cursor: pointer;" title="Click for Explainability Score Breakdown">
                ${availRes.score}% Confidence ℹ️
              </button>
            </div>

            <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px;">${p.name}</h4>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
              ₹${p.price} • ${p.unit}
            </div>

            <div style="background: var(--bg-surface); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 11px; color: var(--text-muted); margin-bottom: 14px; display: flex; justify-content: space-between;">
              <span>🏬 ${store.name} (${store.distanceKm} km)</span>
              <span>ETA: ${store.etaMin} min</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-dim); margin-bottom: 14px;">
              <span>Verified ${minutesAgoStr}</span>
              <span>Stock: ${p.stock > 0 ? `${p.stock} units` : '<strong style="color: var(--status-danger);">Out of Stock</strong>'}</span>
            </div>
          </div>

          <div style="margin-top: auto; display: flex; gap: 8px;">
            ${p.stock > 0 ? `
              <button class="btn btn-primary add-to-cart-btn" data-prodid="${p.id}" style="flex: 1;">
                Add to Cart • ₹${p.price}
              </button>
            ` : `
              <button class="btn btn-danger trigger-sub-btn" data-prodid="${p.id}" style="flex: 1;">
                Out of Stock (View AI Substitutes)
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  },

  renderCartContent: function(cart, products, stores) {
    if (cart.length === 0) {
      return `
        <div style="text-align: center; padding: 40px;">
          <p style="font-size: 14px; color: var(--text-muted);">Your cart is empty.</p>
        </div>
      `;
    }

    let grandTotal = 0;
    const itemsHtml = cart.map(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (!p) return '';
      const store = stores.find(s => s.id === p.storeId) || stores[0];
      const availRes = window.AvailabilityEngine.calculateScore(p, store);
      const lineTotal = p.price * item.qty;
      grandTotal += lineTotal;

      const needsSub = availRes.score < 60 || p.stock === 0;

      return `
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <h4 style="font-weight: 700; color: #fff;">${p.name}</h4>
              <p style="font-size: 12px; color: var(--text-muted);">₹${p.price} × ${item.qty} = ₹${lineTotal}</p>
            </div>
            <span class="confidence-pill ${availRes.score >= 80 ? 'confidence-high' : 'confidence-low'}">
              ${availRes.score}% Confidence
            </span>
          </div>

          ${needsSub ? `
            <div style="background: var(--status-danger-bg); border: 1px solid rgba(239,68,68,0.3); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12px; color: #FCA5A5; display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <span>⚠️ Low availability confidence (${availRes.score}%) may cause cancellation.</span>
              <button class="btn btn-sm btn-primary trigger-sub-btn" data-prodid="${p.id}">
                Swap with AI Substitute
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    return `
      <div style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
        ${itemsHtml}
      </div>
      <div style="border-top: 1px solid var(--border-color); padding-top: 16px; margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 12px; color: var(--text-muted);">Total Payable</div>
          <div style="font-family: var(--font-mono); font-size: 22px; font-weight: 700; color: #fff;">₹${grandTotal}</div>
        </div>
        <button class="btn btn-primary" onclick="alert('Order placed successfully! Delivery ETA: 28 mins.'); window.AppState.cart = []; window.App.renderCurrentView();">
          Complete Checkout & Track
        </button>
      </div>
    `;
  },

  bindEvents: function(container) {
    // Search input
    const searchInput = container.querySelector('#cust-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.AppState.searchQuery = e.target.value;
        const grid = container.querySelector('#customer-products-grid');
        if (grid) grid.innerHTML = this.renderProductCards(window.NOVA_DATA.products, window.NOVA_DATA.stores);
      });
    }

    // Category filter pills
    container.querySelectorAll('.cat-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.cat-filter-btn').forEach(b => {
          b.className = 'btn btn-sm btn-secondary cat-filter-btn';
        });
        e.target.className = 'btn btn-sm btn-primary cat-filter-btn';
        window.AppState.selectedCategory = e.target.dataset.cat;
        const grid = container.querySelector('#customer-products-grid');
        if (grid) grid.innerHTML = this.renderProductCards(window.NOVA_DATA.products, window.NOVA_DATA.stores);
      });
    });

    // Add to cart buttons
    container.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        const prodId = addBtn.dataset.prodid;
        const existing = window.AppState.cart.find(i => i.productId === prodId);
        if (existing) existing.qty += 1;
        else window.AppState.cart.push({ productId: prodId, qty: 1 });

        window.App.showToast('Item added to cart!');
        window.App.renderCurrentView();
      }

      // Open cart drawer
      if (e.target.closest('#open-cart-btn')) {
        document.getElementById('cart-drawer-modal').classList.add('active');
      }

      // Explainability button
      const expBtn = e.target.closest('.explain-btn');
      if (expBtn) {
        const prodId = expBtn.dataset.prodid;
        this.openExplainabilityModal(prodId);
      }

      // Trigger substitution
      const subBtn = e.target.closest('.trigger-sub-btn');
      if (subBtn) {
        const prodId = subBtn.dataset.prodid;
        this.openSubstitutionModal(prodId);
      }
    });
  },

  openExplainabilityModal: function(productId) {
    const p = window.NOVA_DATA.products.find(prod => prod.id === productId);
    const store = window.NOVA_DATA.stores.find(s => s.id === p.storeId) || window.NOVA_DATA.stores[0];
    const availRes = window.AvailabilityEngine.calculateScore(p, store);

    document.getElementById('exp-title').innerText = `Why ${availRes.score}% Confidence? (${p.name})`;
    const modalBody = document.getElementById('exp-modal-body');

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 13px; color: var(--text-muted);">Overall Availability Confidence</span>
          <span class="confidence-pill ${availRes.score >= 80 ? 'confidence-high' : 'confidence-low'}">
            ${availRes.score}% (${availRes.status} RISK)
          </span>
        </div>
        <div class="confidence-bar-wrapper" style="height: 10px;">
          <div class="confidence-bar-fill" style="width: ${availRes.score}%; background: ${availRes.score >= 80 ? 'var(--status-success)' : 'var(--status-danger)'};"></div>
        </div>
      </div>

      <h4 style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Deterministic Driver Breakdown</h4>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
        ${availRes.drivers.map(d => `
          <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span>${d.pass ? '✅' : '⚠️'}</span>
              <span style="font-size: 13px; color: var(--text-main);">${d.text}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: ${d.pass ? 'var(--status-success)' : 'var(--status-warning)'};">
              +${d.points} pts
            </span>
          </div>
        `).join('')}
      </div>

      <div style="background: var(--bg-dark); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 11px; color: var(--text-dim);">
        💡 Formula: Stock Weight (40%) + Freshness (25%) + Demand Velocity (20%) + Store Acceptance (15%).
      </div>
    `;

    document.getElementById('explainability-modal').classList.add('active');
  },

  openSubstitutionModal: function(productId) {
    const targetProduct = window.NOVA_DATA.products.find(p => p.id === productId);
    const rankedSubs = window.SubstitutionEngine.getRankedSubstitutions(targetProduct, window.NOVA_DATA.products, window.NOVA_DATA.stores);

    document.getElementById('exp-title').innerText = `Smart Substitutions for ${targetProduct.name}`;
    const modalBody = document.getElementById('exp-modal-body');

    if (rankedSubs.length === 0) {
      modalBody.innerHTML = `<p style="padding: 20px; color: var(--text-muted);">No suitable alternative products found in nearby stores.</p>`;
    } else {
      modalBody.innerHTML = `
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          Original product has low confidence or is out of stock. AI recommended alternatives ranked by category similarity, price delta, and store availability:
        </p>
        <div style="display: flex; flex-direction: column; gap: 12px; max-height: 380px; overflow-y: auto;">
          ${rankedSubs.map(sub => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <h4 style="font-weight: 700; color: #fff;">${sub.product.name}</h4>
                  <span class="confidence-pill confidence-high" style="font-size: 10px;">${sub.matchScore}% Match</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
                  ₹${sub.product.price} (${sub.priceDelta <= 0 ? `Save ₹${Math.abs(sub.priceDelta)}` : `+₹${sub.priceDelta}`}) • ${sub.store.name}
                </div>
                <div style="font-size: 11px; color: var(--brand-cyan);">
                  ✓ ${sub.availabilityScore}% Availability Confidence
                </div>
              </div>
              <button class="btn btn-sm btn-primary replace-cart-item-btn" data-targetid="${targetProduct.id}" data-subid="${sub.product.id}">
                Replace in Cart
              </button>
            </div>
          `).join('')}
        </div>
      `;

      modalBody.querySelectorAll('.replace-cart-item-btn').forEach(b => {
        b.addEventListener('click', (e) => {
          const tId = e.target.dataset.targetid;
          const sId = e.target.dataset.subid;

          // Replace item in cart
          window.AppState.cart = window.AppState.cart.filter(i => i.productId !== tId);
          window.AppState.cart.push({ productId: sId, qty: 1 });

          document.getElementById('explainability-modal').classList.remove('active');
          document.getElementById('cart-drawer-modal').classList.remove('active');
          window.App.showToast('Product successfully replaced with AI recommendation!');
          window.App.renderCurrentView();
        });
      });
    }

    document.getElementById('explainability-modal').classList.add('active');
  }
};
