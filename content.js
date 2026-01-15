window.addEventListener('load', function() {
    // --- Configuration for Static Sidebar Colors (in rgb format) ---
    const sidebarStaticColors = {
        background: 'rgb(255, 255, 255)',                  // Main sidebar background (white)
        text: 'rgb(100, 100, 100)',                        // Main text color (dark gray/black)
        //headerBackground: 'rgb(209, 209, 209)',          // Sidebar header background (very light gray)
        binnenknopje: 'rgb(0, 0, 0)',                      // Sidebar header text (and close button icon)
        moduleHeaderBackground: 'rgb(233, 233, 233)',      // Module section header background (off-white)
        moduleHeaderText: 'rgb(59, 59, 59)',               // Module section header text
        moduleHeaderHoverBackground: 'rgb(233, 236, 239)', // Module section header hover background (light gray)
        moduleLinkText: 'rgb(33, 37, 41)',                 // Standard module link text
        moduleLinkActiveBackground: '#273540',             // Background for active module links (light blue)
        moduleLinkActiveText: 'white',                     // Text for active module links (black)
        iconColor: 'rgb(85, 85, 85)',                      // Color for icons within module links (medium gray)
				activeIconColor: 'white',                          // Color for icons when module is active
        borderColor: 'rgb(222, 226, 230)',                 // Border color for elements
        openButtonBackground: 'transparent',               // Background for the 'open sidebar' button
        openButtonText: '#273540',                         // Text for the 'open sidebar' button
        scrollBarThumb: 'rgb(193, 193, 193)',              // Scrollbar thumb color
        scrollBarTrack: 'rgb(241, 241, 241)'               // Scrollbar track color
    };

    // Function to remove the specified support buttons
    function removeSupportButtons() {
        const selectors = [
            '.eesy-tab-custom-container',
            '.eesy.eesy-tab-custom-container.eesy-tab-display-type-floating',
            '#eesy-tab-custom-inner'
        ];
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.remove();
            }
        });
    }

    // Initial call to remove support buttons
    removeSupportButtons();

    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                let needsRemoval = false;
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && (node.matches('.eesy-tab-custom-container') || node.matches('#eesy-tab-custom-inner'))) {
                            needsRemoval = true;
                            break;
                        }
                        if (node.querySelector && (node.querySelector('.eesy-tab-custom-container') || node.querySelector('#eesy-tab-custom-inner'))) {
                            needsRemoval = true;
                            break;
                        }
                    }
                }
                if (needsRemoval) {
                    removeSupportButtons();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
		
		const newSidebarContainer = document.createElement('div');
		const newSidebarWidth = '364px';
		newSidebarContainer.id = 'custom-sidebar-container';
		newSidebarContainer.style.position = 'fixed';
    newSidebarContainer.style.top = '0';
    newSidebarContainer.style.left = '0';
		newSidebarContainer.style.width = '448px';
		newSidebarContainer.style.height = '100vh';
    newSidebarContainer.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
		newSidebarContainer.style.zIndex = '99';
    newSidebarContainer.style.display = 'none';
		newSidebarContainer.style.transition = 'transform 0.25s ease-out';
    newSidebarContainer.style.transform = `translateX(-${newSidebarWidth})`;
		newSidebarContainer.style.overflowY = 'scroll';
    //newSidebarContainer.style.scrollbarWidth = 'none'; // Firefox
    //newSidebarContainer.style.msOverflowStyle = 'none'; // IE10+
		newSidebarContainer.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 0px 1.75rem';
		newSidebarContainer.style.clipPath = 'inset(0 -1.75rem 0 0)';
		newSidebarContainer.style.backgroundColor = sidebarStaticColors.background;

    const newSidebar = document.createElement('div');
    newSidebar.id = 'custom-sidebar';
		newSidebar.style.marginLeft = '84px';
		newSidebar.style.padding = '1.5rem';
    newSidebar.style.color = sidebarStaticColors.text;
    //newSidebar.style.transition = 'transform 0.25s ease-out';
    //newSidebar.style.transform = `translateX(-${newSidebarWidth})`;
    newSidebar.style.boxSizing = 'border-box';
		
		newSidebarContainer.appendChild(newSidebar);

    // Apply custom scrollbar styles for a more consistent look
    /*const scrollbarStyle = document.createElement('style');
    scrollbarStyle.innerHTML = `
        #custom-sidebar::-webkit-scrollbar {
            display: none; // Chrome/Safari/Edge
        }
        #custom-sidebar::-webkit-scrollbar-track {
            background: ${sidebarStaticColors.scrollBarTrack};
            border-radius: 0 10px 0 0;
        }
        #custom-sidebar::-webkit-scrollbar-thumb {
            background: ${sidebarStaticColors.scrollBarThumb};
            border-radius: 4px;
        }
        #custom-sidebar::-webkit-scrollbar-thumb:hover {
            background: ${shadeColor(sidebarStaticColors.scrollBarThumb, -0.2)}; // Darken thumb on hover
        }
    `;*/
    //document.head.appendChild(scrollbarStyle);

    /*const secondToggleButton = document.createElement('button'); // This is the close sidebar button
    secondToggleButton.innerHTML = '&#8592;'; // Left arrow
    secondToggleButton.style.backgroundColor = 'transparent';
    secondToggleButton.style.color = sidebarStaticColors.binnenknopje;
    secondToggleButton.style.padding = '16px 20px';
    secondToggleButton.style.border = 'none';
    secondToggleButton.style.borderRadius = '5px';
    secondToggleButton.style.cursor = 'pointer';
    secondToggleButton.style.fontSize = '24px';
    secondToggleButton.style.lineHeight = '1';
    secondToggleButton.style.zIndex = '1100'; // Ensure it's above sidebarHeader bg
    secondToggleButton.style.transition = 'opacity 0.2s ease';

    secondToggleButton.addEventListener('mouseover', () => secondToggleButton.style.opacity = '0.7');
    secondToggleButton.addEventListener('mouseout', () => secondToggleButton.style.opacity = '1');

    const sidebarHeader = document.createElement('div');
    sidebarHeader.style.position = 'sticky';
    sidebarHeader.style.top = '0';
    sidebarHeader.style.left = '0';
    sidebarHeader.style.width = '100%';
    sidebarHeader.style.backgroundColor = sidebarStaticColors.headerBackground;
    sidebarHeader.style.padding = '5px 0'; // Adjusted padding
    sidebarHeader.style.zIndex = '1010';
    sidebarHeader.style.display = 'flex';
    sidebarHeader.style.justifyContent = 'flex-start';
    sidebarHeader.style.alignItems = 'center';
    sidebarHeader.style.borderBottom = `1px solid ${sidebarStaticColors.borderColor}`;
    sidebarHeader.style.boxSizing = 'border-box';

    sidebarHeader.appendChild(secondToggleButton);
    newSidebar.appendChild(sidebarHeader);*/
		
		const sidebarHeader = document.createElement('h2');
		sidebarHeader.textContent = 'Modules';
    sidebarHeader.style.fontFamily = 'LatoWeb, "Lato Extended", Lato, "Helvetica Neue", Helvetica, Arial, sans-serif';
		sidebarHeader.style.fontSize = '1.375rem';
		sidebarHeader.style.fontWeight = '700';
		sidebarHeader.style.color = '#002855';
		sidebarHeader.style.lineHeight = '1.25';
		sidebarHeader.style.margin = '0';
		
		const sidebarBreak = document.createElement('hr');
		sidebarBreak.style.margin = '20px 0';
		sidebarBreak.style.border = '0';
		sidebarBreak.style.borderTop = '1px solid #e8eaec';
		sidebarBreak.style.borderBottom = 'none';

    newSidebar.appendChild(sidebarHeader);
		newSidebar.appendChild(sidebarBreak);

    const elementsToMove = []; // Elements that should move with the sidebar

    const thirdToggleButton = document.createElement('div'); // This is the open sidebar button
    thirdToggleButton.style.position = 'fixed';
    thirdToggleButton.style.bottom = '0px';
    thirdToggleButton.style.left = '0px';
		thirdToggleButton.style.width = 'calc(68px - 0.5rem)';
		thirdToggleButton.style.margin = '0.75rem 0.5rem';
		thirdToggleButton.style.padding = '0.25rem';
		thirdToggleButton.style.borderRadius = '0.375rem';
		thirdToggleButton.style.cursor = 'pointer';
		thirdToggleButton.style.display = 'flex';
    thirdToggleButton.style.flexDirection = 'column'; // Stack vertically
    thirdToggleButton.style.alignItems = 'center';    // Center horizontally
    thirdToggleButton.style.zIndex = '900'; // Below sidebar but above content
    thirdToggleButton.style.transition = 'background-color 0.2s ease';

    const thirdToggleButtonIcon = document.createElement('div'); // This is the open sidebar button icon
    thirdToggleButtonIcon.innerHTML = '&#8594;'; // Right arrow
    thirdToggleButtonIcon.style.backgroundColor = sidebarStaticColors.openButtonBackground;
    thirdToggleButtonIcon.style.color = sidebarStaticColors.openButtonText;
    thirdToggleButtonIcon.style.border = 'none';
    thirdToggleButtonIcon.style.fontSize = '24px';
    thirdToggleButtonIcon.style.lineHeight = '1';
    thirdToggleButtonIcon.style.zIndex = '900';
    thirdToggleButtonIcon.style.transition = 'background-color 0.2s ease, transform 0.25s ease-out';
		
		const thirdToggleButtonText = document.createElement('div'); // This is the open sidebar button txt
		thirdToggleButtonText.innerHTML = 'Modules';
		thirdToggleButtonText.style.position = 'static';
		thirdToggleButtonText.style.color = sidebarStaticColors.openButtonText;
		thirdToggleButtonText.style.textAlign = 'center';
		thirdToggleButtonText.style.display = 'block';
		thirdToggleButtonText.style.lineHeight = '1.4';
		thirdToggleButtonText.style.margin = '3px 0 0';
		thirdToggleButtonText.style.fontSize = '12.5px';

    thirdToggleButton.appendChild(thirdToggleButtonIcon);
		thirdToggleButton.appendChild(thirdToggleButtonText);
    document.body.appendChild(thirdToggleButton);

    let sidebarVisible = false;
    let allowCloseOnDocumentReEnter = false;

    function openSidebar() {
        if (sidebarVisible) return;
        sidebarVisible = true;
        allowCloseOnDocumentReEnter = false;

        //thirdToggleButton.style.display = 'none'; // Hide immediately
				
				// Style the button to look like an active module item
				thirdToggleButton.style.backgroundColor = sidebarStaticColors.moduleLinkActiveBackground;
        thirdToggleButtonIcon.style.color = sidebarStaticColors.moduleLinkActiveText;
        thirdToggleButtonText.style.color = sidebarStaticColors.moduleLinkActiveText;
				
        newSidebarContainer.style.display = 'block';
        newSidebarContainer.style.transform = `translateX(-${newSidebarWidth})`; // Ensure starting position for animation
        
        requestAnimationFrame(() => { // Next frame to trigger transition
            newSidebarContainer.style.transform = 'translateX(0)';
            elementsToMove.forEach(element => {
                if (element) element.style.transform = `translateX(${newSidebarWidth})`;
            });
            //thirdToggleButton.style.transform = `translateX(${newSidebarWidth})`; // Move container with sidebar
        });
        restoreScrollPosition();
    }

    function closeSidebar() {
        if (!sidebarVisible) return;
        sidebarVisible = false;
        allowCloseOnDocumentReEnter = false;

        saveScrollPosition();
        newSidebarContainer.style.transform = `translateX(-${newSidebarWidth})`;
        elementsToMove.forEach(element => {
            if (element) element.style.transform = 'translateX(0)';
        });
        //thirdToggleButton.style.transform = 'translateX(0)'; // Move container back

        function afterCloseTransition() {
            if (!sidebarVisible) { // Check state again in case of rapid toggles
                newSidebarContainer.style.display = 'none';
                //thirdToggleButton.style.display = 'block'; // Show after transition
								
								// Reset to original transparent/default style
                thirdToggleButton.style.backgroundColor = 'transparent';
                thirdToggleButtonIcon.style.color = sidebarStaticColors.openButtonText;
                thirdToggleButtonText.style.color = sidebarStaticColors.openButtonText;
            }
            newSidebarContainer.removeEventListener('transitionend', afterCloseTransition);
        }
        newSidebarContainer.addEventListener('transitionend', afterCloseTransition);

        // Fallback timeout in case transitionend doesn't fire (e.g., element removed or display:none too early)
        setTimeout(() => {
            if (!sidebarVisible && newSidebarContainer.style.display !== 'none') {
                newSidebarContainer.style.display = 'none';
                //thirdToggleButton.style.display = 'block';
								
								// Reset to original transparent/default style
                thirdToggleButton.style.backgroundColor = 'transparent';
                thirdToggleButtonIcon.style.color = sidebarStaticColors.openButtonText;
                thirdToggleButtonText.style.color = sidebarStaticColors.openButtonText;
								
                newSidebarContainer.removeEventListener('transitionend', afterCloseTransition);
            }
        }, 300); // Should be slightly longer than transition duration
    }

    //secondToggleButton.addEventListener('click', closeSidebar);
    thirdToggleButton.addEventListener('mouseover', openSidebar);

    newSidebarContainer.addEventListener('mouseenter', function() {
        allowCloseOnDocumentReEnter = false;
    });

    newSidebarContainer.addEventListener('mouseleave', function(event) {
        if (!sidebarVisible) return;

        const isLeavingViewport = event.clientX <= 0 || event.clientY <= 0 ||
                                  event.clientX >= window.innerWidth || event.clientY >= window.innerHeight;

        if (isLeavingViewport) {
            allowCloseOnDocumentReEnter = true;
            document.documentElement.addEventListener('mouseover', handleDocumentReEnterForClose, { once: true });
        } else {
            if (!event.relatedTarget) {
                allowCloseOnDocumentReEnter = true;
                document.documentElement.addEventListener('mouseover', handleDocumentReEnterForClose, { once: true });
            } else if (!newSidebarContainer.contains(event.relatedTarget) &&
                       event.relatedTarget !== thirdToggleButton &&
                       !thirdToggleButton.contains(event.relatedTarget) ) {
                closeSidebar();
            }
        }
    });

    function handleDocumentReEnterForClose(event) {
        if (sidebarVisible && allowCloseOnDocumentReEnter) {
            if (!newSidebarContainer.contains(event.target) &&
                event.target !== thirdToggleButton &&
                !thirdToggleButton.contains(event.target)) {
                closeSidebar();
            }
        }
        allowCloseOnDocumentReEnter = false;
    }

    function saveScrollPosition() {
        const scrollPosition = newSidebarContainer.scrollTop;
        if (chrome && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ 'sidebarScrollPosition': scrollPosition });
        }
    }

    function restoreScrollPosition() {
        if (chrome && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['sidebarScrollPosition'], function(result) {
                if (result && result.sidebarScrollPosition !== undefined) {
                    newSidebarContainer.scrollTop = result.sidebarScrollPosition;
                }
            });
        }
    }
    
    // Helper function to shade colors (used for scrollbar hover, can be removed if not needed elsewhere)
    function shadeColor(color, percent) {
        var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = Math.abs(percent);
        var R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        var newR = Math.min(255, Math.max(0, Math.round((t - R) * p) + R));
        var newG = Math.min(255, Math.max(0, Math.round((t - G) * p) + G));
        var newB = Math.min(255, Math.max(0, Math.round((t - B) * p) + B));
        return "#" + (0x1000000 + newR * 0x10000 + newG * 0x100 + newB).toString(16).slice(1);
    }


    // No dynamic color changing functions (setSidebarColour, getContrastYIQ) are needed for static theme.
    // Chrome storage for 'sidebarColour' and message listener for 'setSidebarColour' are removed.

    function getModuleItemId(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            let moduleItemId = urlObj.searchParams.get('module_item_id');
            if (moduleItemId) return moduleItemId;

            const pathParts = urlObj.pathname.split('/');
            const itemsIndex = pathParts.indexOf('items');
            if (itemsIndex !== -1 && itemsIndex + 1 < pathParts.length) {
                return pathParts[itemsIndex + 1];
            }
        } catch (e) {
            console.warn("Could not parse URL for module item ID:", url, e);
        }
        return null;
    }

    console.log("Custom Script: Initializing...");

    const existingBreadcrumbs = document.querySelector('.ic-app-crumbs');
    if (existingBreadcrumbs) {
        existingBreadcrumbs.remove();
        console.log("Custom Script: Removed existing breadcrumbs div");
    }

    /*let barContainer; // This is the top course navigation bar, not the sidebar itself

    fetch('/courses/') // Relative URL assuming same origin
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Network response was not ok for /courses/.');
        })
        .then(htmlText => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlText;
            const courseRows = tempDiv.querySelectorAll('.course-list-table-row');

            if (courseRows.length === 0) {
                console.log("Custom Script: No course rows found.");
                return;
            }

            barContainer = document.createElement('div');
            barContainer.id = 'custom-course-bar-container';
            barContainer.style.position = 'fixed';
            barContainer.style.top = '0';
            barContainer.style.left = '0'; // Will be adjusted by sidebar
            barContainer.style.width = '100%';
            barContainer.style.height = '37px';
            barContainer.style.backgroundColor = '#F8F9FA'; // Light theme for course bar
            barContainer.style.zIndex = '500'; // Below sidebar, above page content
            barContainer.style.transform = 'translateX(0)';
            barContainer.style.transition = 'top 0.3s ease-in-out, transform 0.25s ease-out';
            barContainer.style.borderBottom = '1px solid #DEE2E6'; // Light border
            barContainer.style.boxSizing = 'border-box';
            elementsToMove.push(barContainer); // Add to elements that shift with sidebar

            const newCrumbsDiv = document.createElement('div');
            newCrumbsDiv.classList.add('custom-course-list-bar');
            newCrumbsDiv.style.position = 'absolute';
            newCrumbsDiv.style.top = '0px';
            newCrumbsDiv.style.left = '80px'; // Space for potential global nav or margin
            newCrumbsDiv.style.width = 'calc(100% - 100px)'; // Adjust width considering left offset
            newCrumbsDiv.style.height = '100%';
            newCrumbsDiv.style.padding = '0 15px';
            newCrumbsDiv.style.backgroundColor = 'transparent';
            newCrumbsDiv.style.opacity = '0';
            newCrumbsDiv.style.transition = 'opacity 0.5s ease 0.2s';
            newCrumbsDiv.style.display = 'flex';
            newCrumbsDiv.style.alignItems = 'center';
            newCrumbsDiv.style.overflow = 'hidden';
            newCrumbsDiv.style.boxSizing = 'border-box';

            const courseList = document.createElement('ul');
            courseList.style.display = 'flex';
            courseList.style.listStyle = 'none';
            courseList.style.padding = '0';
            courseList.style.margin = '0';
            courseList.style.overflowX = 'auto';
            courseList.style.whiteSpace = 'nowrap';
            courseList.style.height = '100%';
            courseList.style.alignItems = 'center';

            courseRows.forEach(row => {
                const favoriteCourse = row.querySelector('span.course-list-favorite-course.course-list-favoritable');
                const courseLinkElement = row.querySelector('.course-list-course-title-column a');

                if (favoriteCourse && courseLinkElement) {
                    const courseIdMatch = courseLinkElement.href.match(/courses\/(\d+)/);
                    if (!courseIdMatch) return;
                    const courseId = courseIdMatch[1];
                    const courseTitle = favoriteCourse.getAttribute('data-course-name') || courseLinkElement.textContent.trim();
                    const courseModulesLink = `/courses/${courseId}/modules`;

                    const listItem = document.createElement('li');
                    listItem.style.marginRight = '20px';
                    listItem.style.display = 'flex';
                    listItem.style.alignItems = 'center';

                    const listLink = document.createElement('a');
                    listLink.href = courseModulesLink;
                    listLink.textContent = courseTitle;
                    listLink.title = courseTitle;
                    listLink.style.textDecoration = 'none';
                    listLink.style.color = '#007BFF'; // Standard blue for links in course bar
                    listLink.style.display = 'block';
                    listLink.style.maxWidth = '180px';
                    listLink.style.overflow = 'hidden';
                    listLink.style.textOverflow = 'ellipsis';
                    listLink.style.whiteSpace = 'nowrap';

                    listLink.addEventListener('mouseover', () => listLink.style.textDecoration = 'underline');
                    listLink.addEventListener('mouseout', () => listLink.style.textDecoration = 'none');

                    listItem.appendChild(listLink);
                    courseList.appendChild(listItem);
                }
            });

            newCrumbsDiv.appendChild(courseList);
            barContainer.appendChild(newCrumbsDiv);
            document.body.appendChild(barContainer);

            requestAnimationFrame(() => { // Ensure element is in DOM for transition
                requestAnimationFrame(() => { // Next frame to trigger opacity transition
                    newCrumbsDiv.style.opacity = '1';
                });
            });
        })
        .catch(error => {
            console.error('Custom Script: Problem fetching or processing /courses/ page:', error);
        });

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (!barContainer) return;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 50) { // Scrolled down and past a threshold
            barContainer.style.top = `-${barContainer.offsetHeight}px`;
        } else if (scrollTop < lastScrollTop || scrollTop <= 5) { // Scrolled up or at the top
            barContainer.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);*/

    const currentPathCourseIdMatch = window.location.pathname.match(/\/courses\/(\d+)/);
    if (currentPathCourseIdMatch && currentPathCourseIdMatch[1]) {
        const currentCourseId = currentPathCourseIdMatch[1];
        fetch(`/courses/${currentCourseId}/modules`)
            .then(response => {
                if (response.ok) return response.text();
                throw new Error(`Network response was not ok for /courses/${currentCourseId}/modules.`);
            })
            .then(htmlText => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlText;
                
                let moduleStates = {};
                if (chrome && chrome.storage && chrome.storage.local) {
                     chrome.storage.local.get(['moduleStates'], function(storageResult) {
                        moduleStates = (storageResult && storageResult.moduleStates) ? storageResult.moduleStates : {};
                        populateSidebarModules(tempDiv, currentCourseId, moduleStates);
                    });
                } else {
                    // Fallback if chrome.storage.local is not available
                    populateSidebarModules(tempDiv, currentCourseId, moduleStates);
                }


            })
            .catch(error => {
                console.error('Custom Script: Error fetching or processing modules:', error);
            });
    } else {
        console.log("Custom Script: Not on a specific course page, or course ID not found in URL. Sidebar will not populate modules.");
        // Even if not on a course page, the sidebar itself is added to the body.
    }

    function populateSidebarModules(tempDiv, currentCourseId, moduleStates) {
        const headers = tempDiv.querySelectorAll('div.ig-header');
        headers.forEach(header => {
            const titleElementInHeader = header.querySelector('span.name');
            if (!titleElementInHeader) return;
            const title = titleElementInHeader.innerText.trim();
            if (!title) return;

            const headerContainer = document.createElement('div');
            headerContainer.style.marginBottom = '10px';

            const titleElement = document.createElement('h3');
            titleElement.innerText = title;
            titleElement.classList.add('module-header-title');
            titleElement.style.cursor = 'pointer';
            titleElement.style.marginTop = '15px';
            titleElement.style.marginBottom = '2px';
            titleElement.style.fontWeight = '600';
						titleElement.style.fontSize = '1.2rem';
            titleElement.style.color = sidebarStaticColors.moduleHeaderText;
            headerContainer.appendChild(titleElement);

            const moduleItemsContainer = document.createElement('div');
            const moduleKey = `module_${currentCourseId}_${title.replace(/\s+/g, '_')}`;
            
            // Default to open, or use stored state
            const isOpen = moduleStates[moduleKey] === undefined ? true : moduleStates[moduleKey];
            moduleItemsContainer.style.display = isOpen ? 'block' : 'none';
            if (isOpen) moduleStates[moduleKey] = true; // Ensure it's set if defaulting to open

            //moduleItemsContainer.style.marginLeft = '10px';
            //moduleItemsContainer.style.paddingLeft = '5px';

            let currentSubheaderDiv = null;
            const moduleItemsOriginal = header.nextElementSibling?.querySelectorAll('.context_module_item') || [];

            moduleItemsOriginal.forEach(item => {
                const moduleItemTitleElementOriginal = item.querySelector('.module-item-title .item_name');
                if (!moduleItemTitleElementOriginal) return;

                const isSubheader = item.classList.contains('context_module_sub_header');

                if (isSubheader) {
                    currentSubheaderDiv = document.createElement('div');
                    currentSubheaderDiv.classList.add('subheader-text');
                    const subheaderTitleOriginal = moduleItemTitleElementOriginal.textContent.trim();
                    const cleanedTitle = subheaderTitleOriginal.replace(/\s*\d+\s*$/, '');
                    currentSubheaderDiv.innerHTML = `<strong><span style="padding: 1px 6px 10px 3px; display: inline-block;">${cleanedTitle}</span></strong>`;
                    currentSubheaderDiv.style.marginTop = '12px';
                    currentSubheaderDiv.style.marginBottom = '6px';
                    currentSubheaderDiv.style.paddingLeft = '5px';
                    currentSubheaderDiv.style.fontWeight = '500';
                    currentSubheaderDiv.style.color = sidebarStaticColors.text; // Subheader text color
                    moduleItemsContainer.appendChild(currentSubheaderDiv);
                } else {
                    const moduleLinkOriginal = moduleItemTitleElementOriginal.querySelector('a');
                    if (!moduleLinkOriginal) return;

                    const moduleTitle = moduleLinkOriginal.textContent.trim();
                    const moduleUrl = moduleLinkOriginal.href;
                    const moduleItemId = getModuleItemId(moduleUrl);

                    const moduleItemDiv = document.createElement('div');
                    moduleItemDiv.classList.add('module-item-entry');
                    
                    // Add top border only if this is the first module item in the section
                    /*if (
                        (!currentSubheaderDiv && moduleItemsContainer.querySelectorAll('.module-item-entry').length === 0) ||
                        (currentSubheaderDiv && currentSubheaderDiv.querySelectorAll('.module-item-entry').length === 0)
                    ) {
                        moduleItemDiv.style.borderTop = `0.5px solid ${sidebarStaticColors.borderColor}`;
                    }*/
                    

                    const clonedLink = document.createElement('a');
                    clonedLink.href = moduleUrl;
                    clonedLink.classList.add('module-link');
                    if (moduleItemId && window.location.href.includes(moduleItemId)) {
                        clonedLink.classList.add('module-link-active');
                        clonedLink.style.backgroundColor = sidebarStaticColors.moduleLinkActiveBackground;
                        clonedLink.style.color = sidebarStaticColors.moduleLinkActiveText;
                    } else {
                        clonedLink.style.color = sidebarStaticColors.moduleLinkText;
                        clonedLink.style.fontWeight = 'bold';
                        clonedLink.style.backgroundColor = 'transparent';
                    }
                    clonedLink.style.padding = '8px 12px';
                    clonedLink.style.display = 'flex';
                    clonedLink.style.alignItems = 'center';
                    clonedLink.style.textDecoration = 'none';
                    clonedLink.style.borderRadius = '4px';
                    // Transition for hover is handled by CSS, but background could transition if set.
                    clonedLink.style.transition = 'background-color 0.15s ease';
                    clonedLink.style.position = 'relative';
                    clonedLink.style.boxSizing = 'border-box';

                    const textSpan = document.createElement('span');
                    textSpan.innerText = moduleTitle;
                    textSpan.style.flex = '1';
                    textSpan.style.overflowWrap = 'break-word';
                    textSpan.style.wordBreak = 'break-word'; // Ensure long words wrap

                    const iconContainerOriginal = item.querySelector('.ig-type-icon');
                    let selectedIconClone = null;
										
                    /*if (iconContainerOriginal) {
                        const iconOriginal = iconContainerOriginal.querySelector('i, svg, .fontello-icon, .material-icons, [class*="icon-"]');
                        if (iconOriginal) {
                            selectedIconClone = iconOriginal.cloneNode(true);
                            selectedIconClone.style.marginRight = '10px';
                            selectedIconClone.style.width = '16px';
                            selectedIconClone.style.height = '16px';
                            selectedIconClone.style.flexShrink = '0';
                            selectedIconClone.style.color = sidebarStaticColors.iconColor;
                            if (selectedIconClone.classList) {
                                selectedIconClone.classList.remove('tooltip'); // Remove default tooltips if any
                            }
                        }
                    }*/
										
										if (iconContainerOriginal) {
												// Select all possible icon types
												const allIcons = iconContainerOriginal.querySelectorAll('i, svg, img, .fontello-icon, .material-icons, [class*="icon-"]');
												let iconOriginal = null;

												// Iterate to find the single visible icon
												const row = iconContainerOriginal.closest('li.context_module_item');
												if (row) {
														if (row.classList.contains('assignment')) {
																iconOriginal = iconContainerOriginal.querySelector('.icon-assignment');
																
														} else if (row.classList.contains('quiz')) {
																iconOriginal = iconContainerOriginal.querySelector('.icon-quiz');
														} else if (row.classList.contains('discussion_topic')) {
																iconOriginal = iconContainerOriginal.querySelector('.icon-discussion');
														} else if (row.classList.contains('attachment')) {
																iconOriginal = iconContainerOriginal.querySelector('.icon-paperclip');
														} else if (row.classList.contains('external_url') || row.classList.contains('context_external_tool')) {
																iconOriginal = iconContainerOriginal.querySelector('.icon-link');
														} else if (row.classList.contains('wiki_page')) {
																iconOriginal = iconContainerOriginal.querySelector('.icon-document');
														}
												}

												if (iconOriginal) {
														selectedIconClone = iconOriginal.cloneNode(true);

														// Standard styling
														selectedIconClone.style.marginRight = '10px';
														selectedIconClone.style.width = '16px';
														selectedIconClone.style.height = '16px';
														selectedIconClone.style.flexShrink = '0';

														// Only apply text color if it's a font-icon (<i>), not an image (<img>)
														if (iconOriginal.tagName.toLowerCase() !== 'img') {
																selectedIconClone.style.color = sidebarStaticColors.iconColor;
														}

														if (selectedIconClone.classList) {
																selectedIconClone.classList.remove('tooltip'); 
														}
												}
										}
										
                    if (!selectedIconClone) { // Fallback icon
                        selectedIconClone = document.createElement('span');
                        selectedIconClone.innerHTML = '&#8226;'; // Bullet point
                        selectedIconClone.style.marginRight = '10px';
                        selectedIconClone.style.display = 'inline-block';
                        selectedIconClone.style.width = '16px';
                        selectedIconClone.style.height = '16px';
                        selectedIconClone.style.textAlign = 'center';
                        //selectedIconClone.style.color = sidebarStaticColors.iconColor;
                    }
										
                    // Check if the parent link is active and update icon color accordingly
                    if (clonedLink.classList.contains('module-link-active')) {
                        selectedIconClone.style.color = sidebarStaticColors.activeIconColor;
                    } else {
                        selectedIconClone.style.color = sidebarStaticColors.iconColor;
                    }

                    if (selectedIconClone) {
                        clonedLink.appendChild(selectedIconClone);
                    }
                    clonedLink.appendChild(textSpan);
                    moduleItemDiv.appendChild(clonedLink);

                    if (currentSubheaderDiv) {
                        currentSubheaderDiv.appendChild(moduleItemDiv);
                    } else {
                        moduleItemsContainer.appendChild(moduleItemDiv);
                    }
										
                }
            });

            titleElement.addEventListener('click', () => {
                const isCurrentlyOpen = moduleItemsContainer.style.display === 'block';
                moduleItemsContainer.style.display = isCurrentlyOpen ? 'none' : 'block';
                moduleStates[moduleKey] = !isCurrentlyOpen;
                if (chrome && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.set({ 'moduleStates': moduleStates });
                }
            });

            headerContainer.appendChild(moduleItemsContainer);
            newSidebar.appendChild(headerContainer);
        });
        // Initial save of module states if chrome.storage.local is available and some modules defaulted to open
        if (chrome && chrome.storage && chrome.storage.local) {
             chrome.storage.local.set({ 'moduleStates': moduleStates });
        }
    }


    document.body.appendChild(newSidebarContainer);

    // Inject CSS for blue hover effect on module links
    const hoverStyle = document.createElement('style');
    hoverStyle.innerHTML = `
    #custom-sidebar a.module-link::before {
        content: "";
        position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 0.375rem;
        z-index: -1;
        opacity: 0;
        transition: opacity 0s ease;
    }
    #custom-sidebar a.module-link:hover::before {
        opacity: 1;
    }
    `;
    
    document.head.appendChild(hoverStyle);

    console.log("Custom Script: Fully initialized and new sidebar appended.");
});
