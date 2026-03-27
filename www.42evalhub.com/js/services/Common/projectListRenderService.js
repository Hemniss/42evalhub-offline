import { searchService } from '../searchService.js';

class ProjectListRenderService {
	#allProjects = [];

	render(container, projects, type) {
		container.innerHTML = '';
		this.#allProjects = projects;
		
		const wrapper = document.createElement('div');
		wrapper.className = 'projects-list-wrapper';
		
		const title = document.createElement('h2');
		title.className = 'projects-title';
		title.textContent = type === 'specs' ? 'Specializations' : 'Common Core';
		wrapper.appendChild(title);
		
		const searchContainer = document.createElement('div');
		searchContainer.className = 'search-container';
		
		const searchInput = document.createElement('input');
		searchInput.type = 'text';
		searchInput.className = 'search-input';
		searchInput.placeholder = 'Search projects...';
		searchContainer.appendChild(searchInput);
		
		wrapper.appendChild(searchContainer);
		
		const list = document.createElement('div');
		list.className = 'projects-grid';
		list.id = 'projects-grid-content';
		
		const renderProjects = (projectsToRender) => {
			list.innerHTML = '';
			projectsToRender.forEach(project => {
				const card = document.createElement('div');
				card.className = 'project-card';
				card.setAttribute('data-route', '');
				card.setAttribute('href', `/${type}/${project.slug}`);
				
				const nameEl = document.createElement('h3');
				nameEl.className = 'project-name';
				nameEl.textContent = project.name;
				
				card.appendChild(nameEl);
				card.addEventListener('click', (e) => {
					e.preventDefault();
					window.dispatchEvent(new CustomEvent('navigate', { detail: { path: `/${type}/${project.slug}` } }));
				});
				
				list.appendChild(card);
			});
		};
		
		renderProjects(projects);
		wrapper.appendChild(list);
		container.appendChild(wrapper);
		
		searchService.setupSearchInput(searchInput, this.#allProjects, '#projects-grid-content', renderProjects, 'name');
	}
}

export const projectListRenderService = new ProjectListRenderService();
