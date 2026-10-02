/* ==========================================================================
   NOVA INTELLISTOCK - MAIN APPLICATION CONTROLLER
   Global State Management, View Routing, Role Switching & Toast Notifications
   ========================================================================== */

window.AppState = {
  currentRole: 'operations', // customer, store, operations
  currentView: 'command',    // command, store, products, intelligence, action-center, business-impact, analytics, story
  selectedStoreId: 'store-101',
  searchQuery: '',
  selectedCategory: 'ALL',
  storePriorityFilter: 'ALL',
  cart: [
    { productId: 'prod-001', qty: 1 } // Default initial cart item
  ],
  // Business simulator state defaults
  simAccuracy: 90,
  simCancelRed: 70,
  simSubAccept: 65,
  simStoreAdopt: 80
};

window.App = {
  init: function() {
    this.bindGlobalEvents();
    this.renderCurrentView();
  },

  switchRole: function(role) {
    window.AppState.currentRole = role;

    // Default target view per role
    if (role === 'customer') window.AppState.currentView = 'products';
    else if (role === 'store') window.AppState.currentView = 'store';
    else if (role === 'operations') window.AppState.currentView = 'command';

    // Update active state on top header role buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });

    this.renderCurrentView();
    this.showToast(`Switched view role to: ${role.toUpperCase()}`);
  },

  switchView: function(viewId) {
    window.AppState.currentView = viewId;

    // Update sidebar navigation active item
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    this.renderCurrentView();
  },

  renderCurrentView: function() {
    const viewport = document.getElementById('view-viewport');
    if (!viewport) return;

    const viewId = window.AppState.currentView;

    // Render corresponding view module
    if (viewId === 'products' || viewId === 'customer') {
      window.CustomerView.render(viewport);
    } else if (viewId === 'store') {
      window.StoreView.render(viewport);
    } else if (viewId === 'command' || viewId === 'operations') {
      window.OperationsView.render(viewport);
    } else if (viewId === 'intelligence') {
      window.IntelligenceView.render(viewport);
    } else if (viewId === 'action-center') {
      window.ActionCenterView.render(viewport);
    } else if (viewId === 'business-impact') {
      window.BusinessImpactView.render(viewport);
    } else if (viewId === 'analytics') {
      window.AnalyticsView.render(viewport);
    } else if (viewId === 'story') {
      window.StoryView.render(viewport);
    } else {
      window.OperationsView.render(viewport);
    }

    // Scroll viewport to top
    viewport.scrollTop = 0;
  },

  showToast: function(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  bindGlobalEvents: function() {
    // Role switcher buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const role = e.currentTarget.dataset.role;
        this.switchRole(role);
      });
    });

    // Sidebar navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = e.currentTarget.dataset.view;
        this.switchView(view);
      });
    });

    // Top Demo Trigger Button
    const demoBtn = document.getElementById('global-demo-trigger');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        window.DemoRunner.startDemo();
      });
    }
  }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  window.App.init();
});
