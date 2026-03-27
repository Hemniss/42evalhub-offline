class SpecDetailRenderService {
	render(container, spec, content) {
		container.innerHTML = '';
		
		const wrapper = document.createElement('div');
		wrapper.className = 'spec-detail-wrapper';
		
		const header = document.createElement('div');
		header.className = 'spec-detail-header';
		
		const backBtn = document.createElement('button');
		backBtn.className = 'spec-back-btn';
		backBtn.textContent = '← Back';
		backBtn.addEventListener('click', () => {
			window.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/specs' } }));
		});
		
		const title = document.createElement('h1');
		title.className = 'spec-detail-title';
		title.textContent = spec.name;
		
		header.appendChild(backBtn);
		header.appendChild(title);
		wrapper.appendChild(header);
		
		const contentWrapper = document.createElement('div');
		contentWrapper.className = 'spec-detail-content';
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

export const specDetailRenderService = new SpecDetailRenderService();
