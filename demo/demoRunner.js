/* ==========================================================================
   GUIDED 3-MINUTE DEMO RUNNER MODULE
   Interactive step-by-step hackathon demo flow controller
   ========================================================================== */

window.DemoRunner = {
  currentStep: 0,
  isDemoActive: false,

  steps: [
    {
      stepNum: 1,
      role: 'customer',
      title: 'Step 1: Customer Search & Availability Confidence Check',
      description: 'Customer searches for "Nandini Milk 1L" at Sri Lakshmi Stores. Notice the low availability confidence score (54%) caused by low stock (2 units) and outdated verification (6.3h ago).',
      action: function() {
        window.AppState.currentRole = 'customer';
        window.AppState.searchQuery = 'Nandini';
        window.App.switchView('products');
      }
    },
    {
      stepNum: 2,
      role: 'customer',
      title: 'Step 2: AI Smart Substitution Orchestration',
      description: 'When the customer attempts to order Nandini Milk 1L, NOVA Intellistock automatically recommends "Amul Taaza Milk 1L" with 96% availability confidence and ₹2 price delta.',
      action: function() {
        window.CustomerView.openSubstitutionModal('prod-004');
      }
    },
    {
      stepNum: 3,
      role: 'store',
      title: 'Step 3: Store Manager Priority Attention Alert',
      description: 'Switching to Store Manager view for Sri Lakshmi Stores. The Inventory Attention Center flags Nandini Milk 1L as HIGH PRIORITY due to elevated fulfillment risk.',
      action: function() {
        document.getElementById('explainability-modal').classList.remove('active');
        window.AppState.currentRole = 'store';
        window.AppState.selectedStoreId = 'store-101';
        window.App.switchView('store');
      }
    },
    {
      stepNum: 4,
      role: 'store',
      title: 'Step 4: Live Stock Update & Real-Time Score Recalculation',
      description: 'Store Manager updates stock for Nandini Milk 1L from 2 to 25 units. The Availability Confidence score instantly recalculates from 54% to 94%!',
      action: function() {
        const prod = window.NOVA_DATA.products.find(p => p.id === 'prod-004');
        if (prod) {
          prod.stock = 25;
          prod.lastVerifiedMinutesAgo = 0;
          window.App.showToast('Restocked Nandini Milk to 25 units! Score recalculated to 94%!');
          window.App.renderCurrentView();
        }
      }
    },
    {
      stepNum: 5,
      role: 'operations',
      title: 'Step 5: Operations Command Center & Business Impact',
      description: 'Operations Command Center reflects lower network risk, resolved Action Center tasks, and improved projected ROI in the Business Impact Simulator!',
      action: function() {
        window.AppState.currentRole = 'operations';
        window.App.switchView('command');
      }
    }
  ],

  startDemo: function() {
    this.currentStep = 0;
    this.isDemoActive = true;
    this.executeStep(0);
  },

  nextStep: function() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.executeStep(this.currentStep);
    } else {
      this.endDemo();
    }
  },

  endDemo: function() {
    this.isDemoActive = false;
    const banner = document.getElementById('demo-runner-banner');
    if (banner) banner.style.display = 'none';
    window.App.showToast('Guided demo completed! Feel free to explore all modules.');
  },

  executeStep: function(index) {
    const step = this.steps[index];
    step.action();

    let banner = document.getElementById('demo-runner-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'demo-runner-banner';
      banner.className = 'demo-banner';
      document.querySelector('.content-viewport').prepend(banner);
    } else {
      banner.style.display = 'flex';
    }

    banner.innerHTML = `
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <span class="demo-step-badge">${step.stepNum} OF ${this.steps.length}</span>
          <h4 style="font-weight: 700; color: #fff;">${step.title}</h4>
        </div>
        <p style="font-size: 12px; color: #E9D5FF;">${step.description}</p>
      </div>
      <div style="display: flex; gap: 8px; flex-shrink: 0;">
        <button class="btn btn-sm btn-primary" onclick="window.DemoRunner.nextStep()">
          ${index === this.steps.length - 1 ? 'Finish Demo' : 'Next Step →'}
        </button>
        <button class="btn btn-sm btn-secondary" onclick="window.DemoRunner.endDemo()">
          Exit Demo
        </button>
      </div>
    `;
  }
};
