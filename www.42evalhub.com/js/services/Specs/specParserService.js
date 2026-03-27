class SpecParserService {
	async fetchSpec(path) {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`Failed to fetch spec: ${path}`);
		return await response.text();
	}

	cleanHtml(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		
		const removed = doc.querySelectorAll('script, style, [style]');
		removed.forEach(el => {
			if (el.tagName !== 'STYLE') {
				el.removeAttribute('style');
			} else {
				el.remove();
			}
		});

		const elements = doc.querySelectorAll('[id]');
		elements.forEach(el => el.removeAttribute('id'));

		const content = doc.body.innerHTML;
		return this.sanitizeHtml(content);
	}

	sanitizeHtml(html) {
		const div = document.createElement('div');
		div.innerHTML = html;
		
		const problematicClasses = ['font-weight-bold', 'mb-1', 'p-0', 'scale-guidelines', 'dancer', 'from-down', 'project-attachments-list', 'project-attachment-item', 'icon-note-paper-2', 'icon-file'];
		
		const allElements = div.querySelectorAll('*');
		allElements.forEach(el => {
			problematicClasses.forEach(cls => {
				el.classList.remove(cls);
			});
		});

		return div.innerHTML;
	}
}

export const specParserService = new SpecParserService();
