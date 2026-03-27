class ProjectParserService {
	async fetchProject(path) {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`Failed to load project: ${path}`);
		return await response.text();
	}

	cleanHtml(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		
		const removed = doc.querySelectorAll('script, style, [style]');
		removed.forEach(el => el.remove());

		const elements = doc.querySelectorAll('[id]');
		elements.forEach(el => el.removeAttribute('id'));

		const content = doc.body.innerHTML;
		return this.sanitizeHtml(content);
	}

	sanitizeHtml(html) {
		const div = document.createElement('div');
		div.innerHTML = html;
		return div.innerHTML;
	}
}

export const projectParserService = new ProjectParserService();
