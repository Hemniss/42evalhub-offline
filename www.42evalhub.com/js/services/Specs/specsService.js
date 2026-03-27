class SpecsService {
	#specsManifest = [
		'avaj-launcher.html',
		'BADASS.html',
		'camagru.html',
		'cloud-1.html',
		'computorv1.html',
		'corewar.html',
		'curriculum-vitae.html',
		'darkly.html',
		'Django - 0 - Initiation.html',
		'Django - 1 - Base Django.html',
		'Django - 3 - Sessions.html',
		'Django - 3 - Final.html',
		'dr-quine.html',
		'dslr.html',
		'fix-me.html',
		'ft_hangouts.html',
		'ft_linear_regression.html',
		'ft_linux.html',
		'ft_ls.html',
		'ft_malcolm.html',
		'ft_newton.html',
		'ft_nmap.html',
		'ft_ssl_des.html',
		'ft_ssl_md5.html',
		'ft_vox.html',
		'gomoku.html',
		'guimp.html',
		'Inception-of-Things.html',
		'lem_in.html',
		'little-penguin-1.html',
		'malloc.html',
		'matcha.html',
		'matt-daemon.html',
		'n-puzzle.html',
		'OCAML - Basic syntax and semantics - 0.html',
		'OCAML - Imperative features - 1.html',
		'OCAML - Functor - 1.html',
		'OCAML - Object Oriented Programming - 2.html',
		'override.html',
		'rainfall.html',
		'rt.html',
		'rubik.html',
		'scop.html',
		'swifty-companion.html',
		'swingy.html',
		'taskmaster.html',
		'Tokenizer.html',
		'woody-woodpacker.html',
		'Work Experience - Company Mid Evaluation.html',
		'Work Experience - Peer Video.html'
	];

	getAll() {
		return this.#specsManifest.map(filename => ({
			filename,
			name: this.formatName(filename),
			slug: this.getSlug(filename)
		}));
	}

	formatName(filename) {
		return filename.replace(/\.html$/, '');
	}

	getSlug(filename) {
		return filename.replace(/\.html$/, '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
	}

	getPath(filename) {
		return `/data/specs/${encodeURIComponent(filename)}`;
	}
}

export const specsService = new SpecsService();
