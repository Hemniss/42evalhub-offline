class SearchService {
	filterItems(items, searchTerm, searchKey = 'name') {
		if (!searchTerm.trim()) return items;
		
		const term = searchTerm.toLowerCase();
		return items.filter(item => 
			item[searchKey].toLowerCase().includes(term)
		);
	}

	setupSearchInput(inputElement, allItems, containerSelector, renderCallback, searchKey = 'name') {
		inputElement.addEventListener('input', (e) => {
			const searchTerm = e.target.value;
			const filteredItems = this.filterItems(allItems, searchTerm, searchKey);
			const container = document.querySelector(containerSelector);
			
			if (container) {
				renderCallback(filteredItems);
			}
		});
	}
}

export const searchService = new SearchService();
