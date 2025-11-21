// Sidebar collapse functionality for Cyclus documentation
(function() {
    'use strict';
    
    const COLLAPSE_THRESHOLD = 0.55; // Auto-collapse when window width <= 55% of screen width
    const STORAGE_KEY = 'cyclus-sidebar-collapsed';
    
    let sidebar = null;
    let toggleButton = null;
    
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupSidebarToggle);
        } else {
            setupSidebarToggle();
        }
    }
    
    function setupSidebarToggle() {
        // Find the sidebar element
        sidebar = document.querySelector('.sphinxsidebar');
        if (!sidebar) {
            console.warn('Sidebar element not found');
            return;
        }
        
        // Create toggle button
        toggleButton = document.createElement('button');
        toggleButton.id = 'sidebar-toggle-btn';
        toggleButton.className = 'sidebar-toggle-button';
        toggleButton.setAttribute('aria-label', 'Toggle sidebar');
        toggleButton.setAttribute('title', 'Collapse sidebar');
        toggleButton.innerHTML = '◀';
        
        // Initially place button in sidebar (top-right)
        sidebar.style.position = 'relative';
        sidebar.appendChild(toggleButton);
        
        // Check initial state
        const wasCollapsed = localStorage.getItem(STORAGE_KEY) === 'true';
        const shouldAutoCollapse = checkAutoCollapse();
        
        if (wasCollapsed || shouldAutoCollapse) {
            collapseSidebar(true);
        }
        
        // Button click handler
        toggleButton.addEventListener('click', function() {
            const isCollapsed = sidebar.style.display === 'none';
            if (isCollapsed) {
                expandSidebar();
            } else {
                collapseSidebar(false);
            }
        });
        
        // Window resize handler for auto-collapse and button repositioning
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const shouldCollapse = checkAutoCollapse();
                const isCollapsed = sidebar.style.display === 'none';
                
                // If sidebar is collapsed, update button position and bodywrapper width
                if (isCollapsed && toggleButton.classList.contains('sidebar-toggle-collapsed')) {
                    // Recalculate bodywrapper width to match navbar
                    const bodyWrapper = document.querySelector('.bodywrapper');
                    if (bodyWrapper) {
                        const relatedNav = document.querySelector('.related');
                        if (relatedNav) {
                            const navRect = relatedNav.getBoundingClientRect();
                            const docWrapper = document.querySelector('.documentwrapper');
                            const docLeft = docWrapper ? docWrapper.getBoundingClientRect().left : 0;
                            
                            const relativeNavLeft = navRect.left - docLeft;
                            const navWidth = navRect.right - navRect.left;
                            
                            bodyWrapper.style.marginLeft = relativeNavLeft + 'px';
                            bodyWrapper.style.width = navWidth + 'px';
                            bodyWrapper.offsetHeight; // Force reflow
                        }
                    }
                    updateCollapsedButtonPosition();
                }
                
                if (shouldCollapse && !isCollapsed) {
                    collapseSidebar(true);
                } else if (!shouldCollapse && isCollapsed && localStorage.getItem(STORAGE_KEY) !== 'true') {
                    expandSidebar();
                }
            }, 150);
        });
    }
    
    function checkAutoCollapse() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const screenWidth = screen.width;
        return windowWidth <= (screenWidth * COLLAPSE_THRESHOLD);
    }
    
    function updateCollapsedButtonPosition(targetTop) {
        // If targetTop not provided, maintain current vertical position
        if (targetTop === undefined) {
            const rect = toggleButton.getBoundingClientRect();
            targetTop = rect.top;
            
            // Ensure button is below navbar
            const relatedNav = document.querySelector('.related');
            if (relatedNav) {
                const navBottom = relatedNav.getBoundingClientRect().bottom;
                if (targetTop < navBottom + 10) {
                    targetTop = navBottom + 10;
                }
            }
        }
        
        // Get bodywrapper's current position
        const bodyWrapper = document.querySelector('.bodywrapper');
        let targetLeft = '10px';
        if (bodyWrapper) {
            // Force layout recalculation to get updated position
            bodyWrapper.offsetHeight;
            const bodyRect = bodyWrapper.getBoundingClientRect();
            targetLeft = (bodyRect.left + 10) + 'px'; // 10px padding from left edge
        }
        
        // Disable transition for instant positioning
        toggleButton.style.transition = 'none';
        toggleButton.style.top = targetTop + 'px';
        toggleButton.style.left = targetLeft;
        
        // Re-enable transition after a brief moment (for hover effects)
        setTimeout(function() {
            toggleButton.style.transition = '';
        }, 10);
    }
    
    function collapseSidebar(isAutoCollapse) {
        if (!sidebar || !toggleButton) return;
        
        // Hide sidebar
        sidebar.style.display = 'none';
        
        // Move button to body first
        if (sidebar.contains(toggleButton)) {
            document.body.appendChild(toggleButton);
        }
        
        toggleButton.classList.add('sidebar-toggle-collapsed');
        toggleButton.style.position = 'fixed';
        
        // Adjust bodywrapper to match navbar width FIRST
        const bodyWrapper = document.querySelector('.bodywrapper');
        if (bodyWrapper) {
            const relatedNav = document.querySelector('.related');
            if (relatedNav) {
                const navRect = relatedNav.getBoundingClientRect();
                const navStyles = window.getComputedStyle(relatedNav);
                const docWrapper = document.querySelector('.documentwrapper');
                const docLeft = docWrapper ? docWrapper.getBoundingClientRect().left : 0;
                
                // Calculate relative position
                const relativeNavLeft = navRect.left - docLeft;
                const navWidth = navRect.right - navRect.left;
                
                bodyWrapper.style.marginLeft = relativeNavLeft + 'px';
                bodyWrapper.style.width = navWidth + 'px';
                bodyWrapper.style.backgroundColor = 'white';
                // No padding needed - button is fixed and won't scroll with content
                bodyWrapper.classList.add('sidebar-collapsed-body');
                
                // Force layout recalculation
                bodyWrapper.offsetHeight;
            }
        }
        
        // NOW position button AFTER bodywrapper has been repositioned
        // Get button's current vertical position
        const rect = toggleButton.getBoundingClientRect();
        let targetTop = rect.top;
        
        // Ensure button is below navbar
        const relatedNav = document.querySelector('.related');
        if (relatedNav) {
            const navBottom = relatedNav.getBoundingClientRect().bottom;
            if (targetTop < navBottom + 10) {
                targetTop = navBottom + 10;
            }
        }
        
        // Position button at bodywrapper's left edge with a bit of breathing room
        // (Called after bodywrapper is repositioned)
        updateCollapsedButtonPosition(targetTop);
        
        toggleButton.innerHTML = '▶';
        toggleButton.setAttribute('title', 'Expand sidebar');
        
        // Store state
        if (!isAutoCollapse) {
            localStorage.setItem(STORAGE_KEY, 'true');
        }
        
        document.body.classList.add('sidebar-collapsed-body');
    }
    
    function expandSidebar() {
        if (!sidebar || !toggleButton) return;
        
        // Show sidebar
        sidebar.style.display = '';
        
        // Move button back to sidebar
        if (document.body.contains(toggleButton)) {
            sidebar.appendChild(toggleButton);
        }
        
        toggleButton.classList.remove('sidebar-toggle-collapsed');
        toggleButton.style.position = 'absolute';
        
        // Disable transition for instant positioning
        toggleButton.style.transition = 'none';
        toggleButton.style.top = '10px';
        toggleButton.style.right = '10px';
        toggleButton.style.left = 'auto';
        toggleButton.innerHTML = '◀';
        toggleButton.setAttribute('title', 'Collapse sidebar');
        
        // Re-enable transition after a brief moment (for hover effects)
        setTimeout(function() {
            toggleButton.style.transition = '';
        }, 10);
        
        // Restore bodywrapper
        const bodyWrapper = document.querySelector('.bodywrapper');
        if (bodyWrapper) {
            bodyWrapper.style.marginLeft = '';
            bodyWrapper.style.width = '';
            bodyWrapper.style.backgroundColor = '';
            bodyWrapper.classList.remove('sidebar-collapsed-body');
        }
        
        // Clear state
        localStorage.removeItem(STORAGE_KEY);
        document.body.classList.remove('sidebar-collapsed-body');
    }
    
    init();
})();

