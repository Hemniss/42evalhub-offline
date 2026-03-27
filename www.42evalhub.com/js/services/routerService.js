import { partialService } from "./partialService.js";
import { homeService } from "./homeService.js";
import { specsService } from "./Specs/specsService.js";
import { commonCoreService } from "./Common/commonCoreService.js";
import { specParserService } from "./Specs/specParserService.js";
import { projectParserService } from "./Common/projectParserService.js";
import { specListRenderService } from "./Specs/specListRenderService.js";
import { projectListRenderService } from "./Common/projectListRenderService.js";
import { specDetailRenderService } from "./Specs/specDetailRenderService.js";
import { projectDetailRenderService } from "./Common/projectDetailRenderService.js";

class RouterService {
	#container;
	#routes = {};
	#currentRoute = null;
	#projectsMap = { specs: {}, common: {} };

	setup(container) {
		this.#container = container;
	}

	async start() {
		await this.#initializeDynamicRoutes();

		window.addEventListener("popstate", () => {
			this.#loadRoute(window.location.pathname);
		});

		window.addEventListener("navigate", (e) => {
			this.navigate(e.detail.path);
		});

		await this.#loadRoute(window.location.pathname);
	}

	addRoute(path, options) {
		this.#routes[path] = options;
	}

	async #initializeDynamicRoutes() {
		const specs = specsService.getAll();
		specs.forEach(spec => {
			this.#projectsMap.specs[spec.slug] = spec;
		});

		const commonCore = commonCoreService.getAll();
		commonCore.forEach(project => {
			this.#projectsMap.common[project.slug] = project;
		});
	}

	async navigate(path) {
		if (this.#currentRoute === path) return;
		window.history.pushState({}, "", path);
		await this.#loadRoute(path);
	}

	async #loadRoute(path) {
		if (this.#currentRoute === path) return;
		this.#currentRoute = path;

		this.#container.classList.add("fade-out");
		await new Promise(resolve => setTimeout(resolve, 150));

		if (path.startsWith("/spec/")) {
			const slug = path.replace("/spec/", "");
			await this.#loadProjectDetail(slug, "specs", "/specs", specsService);
		} else if (path.startsWith("/common/")) {
			const slug = path.replace("/common/", "");
			await this.#loadProjectDetail(slug, "common", "/common-core", commonCoreService);
		} else {
			const route = this.#routes[path] || this.#routes["/"];
			if (route) {
				const html = await partialService.load(route.partial);
				this.#container.innerHTML = html;
				await this.#handleRouteActions(path);
			}
		}

		window.scrollTo({ top: 0, behavior: "smooth" });
		this.#container.classList.remove("fade-out");
	}

	async #loadProjectDetail(slug, type, backPath, service) {
		const project = this.#projectsMap[type][slug];
		if (!project) {
			this.navigate(backPath);
			return;
		}

		try {
			const path = service.getPath(project.filename);
			const html = await projectParserService.fetchProject(path);
			const cleanedContent = projectParserService.cleanHtml(html);
			
			if (type === "specs") {
				specDetailRenderService.render(this.#container, project, cleanedContent);
			} else {
				projectDetailRenderService.render(this.#container, project, cleanedContent, backPath);
			}
		} catch (error) {
			console.error(error);
			this.navigate(backPath);
		}

		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	async #handleRouteActions(path) {
		if (path === "/specs") {
			const specs = specsService.getAll();
			specListRenderService.render(document.getElementById("specs-container"), specs, "specs");
		} else if (path === "/common-core") {
			const commonCore = commonCoreService.getAll();
			projectListRenderService.render(document.getElementById("common-core-container"), commonCore, "common");
		} else if (path === "/" || path === "/home") {
			homeService.init("home-container");
		}
	}
}

export const routerService = new RouterService();
