class HomeService {
    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container)
            throw new Error(`Container with ID "${containerId}" not found.`);
        this.render(container);
    }

    render(container) {
    }
}

export const homeService = new HomeService();
