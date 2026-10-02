/* ==========================================================================
   OPERATIONAL ACTION CENTER MODULE
   Staff Dispatch, Task Automation & Incident Resolution
   ========================================================================== */

window.ActionCenterView = {
  render: function(container) {
    const tasks = window.NOVA_DATA.actionCenterTasks;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Operational Action Center</h1>
          <p class="page-subtitle">Immediate operational task dispatches for NOVA CART ops team</p>
        </div>
        <button class="btn btn-secondary" id="clear-resolved-btn">Clear Resolved Tasks</button>
      </div>

      <div class="grid-3" style="margin-bottom: 24px;">
        <div class="card kpi-card">
          <div class="kpi-label">PENDING DISPATCHES</div>
          <div class="kpi-value" style="color: var(--status-warning);">
            ${tasks.filter(t => t.status === 'pending').length}
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-label">HIGH PRIORITY INCIDENTS</div>
          <div class="kpi-value" style="color: var(--status-danger);">
            ${tasks.filter(t => t.priority === 'HIGH' && t.status === 'pending').length}
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-label">RESOLVED TODAY</div>
          <div class="kpi-value" style="color: var(--status-success);">
            ${tasks.filter(t => t.status === 'resolved').length}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">⚡ Active Operational Dispatches</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${tasks.map(t => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; ${t.status === 'resolved' ? 'opacity: 0.5;' : ''}">
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                  <span class="confidence-pill ${t.priority === 'HIGH' ? 'confidence-low' : 'confidence-medium'}">${t.priority}</span>
                  <h4 style="font-weight: 700; color: #fff;">${t.title}</h4>
                  ${t.status === 'resolved' ? '<span style="color: var(--status-success); font-size: 11px; font-weight: 700;">✓ RESOLVED</span>' : ''}
                </div>
                <p style="font-size: 12px; color: var(--text-muted);">${t.description}</p>
              </div>

              <div>
                ${t.status === 'pending' ? `
                  <button class="btn btn-primary dispatch-task-btn" data-taskid="${t.id}">
                    ${t.actionLabel}
                  </button>
                ` : `
                  <button class="btn btn-secondary" disabled>Action Completed</button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  bindEvents: function(container) {
    container.querySelectorAll('.dispatch-task-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = e.target.dataset.taskid;
        const task = window.NOVA_DATA.actionCenterTasks.find(t => t.id === taskId);
        if (task) {
          task.status = 'resolved';
          window.App.showToast(`Task Dispatched: ${task.title}`);
          window.App.renderCurrentView();
        }
      });
    });

    const clearBtn = container.querySelector('#clear-resolved-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.NOVA_DATA.actionCenterTasks = window.NOVA_DATA.actionCenterTasks.filter(t => t.status === 'pending');
        window.App.renderCurrentView();
      });
    }
  }
};
