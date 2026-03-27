class CommonCoreService {
	#commonCoreManifest = [
		'born2beroot.html',
		'cpp00.html',
		'cpp01.html',
		'cpp02.html',
		'cpp03.html',
		'cpp04.html',
		'cpp05.html',
		'cpp06.html',
		'cpp07.html',
		'cpp08.html',
		'cpp09.html',
		'cub3d.html',
		'fdf.html',
		'fract-ol.html',
		'ft_irc.html',
		'ft_printf.html',
		'ft_transcendence_old.html',
		'ft_transcendence.html',
		'get_next_line.html',
		'inception.html',
		'libft.html',
		'minirt.html',
		'minishell.html',
		'minitalk.html',
		'netpractice.html',
		'philosophers.html',
		'pipex.html',
		'push_swap.html',
		'so_long.html',
		'webserv.html'
	];

	getAll() {
		return this.#commonCoreManifest.map(filename => ({
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
		return `/data/common/${encodeURIComponent(filename)}`;
	}
}

export const commonCoreService = new CommonCoreService();
