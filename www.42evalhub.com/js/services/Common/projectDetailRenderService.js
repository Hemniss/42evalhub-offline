class ProjectDetailRenderService {
	render(container, project, content, backPath) {
		container.innerHTML = '';
		
		const wrapper = document.createElement('div');
		wrapper.className = 'project-detail-wrapper';
		
		const header = document.createElement('div');
		header.className = 'project-detail-header';
		
		const backBtn = document.createElement('button');
		backBtn.className = 'project-back-btn';
		backBtn.textContent = '← Back';
		backBtn.addEventListener('click', () => {
			window.dispatchEvent(new CustomEvent('navigate', { detail: { path: backPath } }));
		});
		
		const title = document.createElement('h1');
		title.className = 'project-detail-title';
		title.textContent = project.name;
		
		header.appendChild(backBtn);
		header.appendChild(title);
		wrapper.appendChild(header);
		
		const contentWrapper = document.createElement('div');
		contentWrapper.className = 'project-detail-content';
		contentWrapper.innerHTML = content;
		wrapper.appendChild(contentWrapper);

		const footer = document.createElement('div');
		const contributeButton = document.createElement('a');
		contributeButton.className = 'spec-contribute-button';
		contributeButton.textContent = 'Outdated ? Contribute to update';
		contributeButton.target = '_blank';
		contributeButton.href = 'mailto:contact@42evalhub.com';
		footer.appendChild(contributeButton);
		wrapper.appendChild(footer);
		
		container.appendChild(wrapper);
	}
}

export const projectDetailRenderService = new ProjectDetailRenderService();
