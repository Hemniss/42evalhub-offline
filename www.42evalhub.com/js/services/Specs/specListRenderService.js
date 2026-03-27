import { searchService } from '../searchService.js';

class SpecListRenderService {
	#allSpecs = [];

	render(container, specs, type = 'specs') {
		container.innerHTML = '';
		this.#allSpecs = specs;
		
		const wrapper = document.createElement('div');
		wrapper.className = 'specs-list-wrapper';
		
		const title = document.createElement('h2');
		title.className = 'specs-title';
		title.textContent = 'Specializations';
		wrapper.appendChild(title);
		
		const searchContainer = document.createElement('div');
		searchContainer.className = 'search-container';
		
		const searchInput = document.createElement('input');
		searchInput.type = 'text';
		searchInput.className = 'search-input';
		searchInput.placeholder = 'Search specializations...';
		searchContainer.appendChild(searchInput);
		
		wrapper.appendChild(searchContainer);
		
		const list = document.createElement('div');
		list.className = 'specs-grid';
		list.id = 'specs-grid-content';
		
		const renderSpecs = (specsToRender) => {
			list.innerHTML = '';
			specsToRender.forEach(spec => {
				const card = document.createElement('div');
				card.className = 'spec-card';
				card.setAttribute('data-route', '');
				card.setAttribute('href', `/spec/${spec.slug}`);
				
				const nameEl = document.createElement('h3');
				nameEl.className = 'spec-name';
				nameEl.textContent = spec.name;
				
				card.appendChild(nameEl);
				card.addEventListener('click', (e) => {
					e.preventDefault();
					window.dispatchEvent(new CustomEvent('navigate', { detail: { path: `/spec/${spec.slug}` } }));
				});
				
				list.appendChild(card);
			});
		};
		
		renderSpecs(specs);
		wrapper.appendChild(list);
		container.appendChild(wrapper);
		
		searchService.setupSearchInput(searchInput, this.#allSpecs, '#specs-grid-content', renderSpecs, 'name');
	}
}

export const specListRenderService = new SpecListRenderService();
