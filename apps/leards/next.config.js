//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {withNx} = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	webpack: config => {
		const rules = config.module.rules
			.find(rule => typeof rule.oneOf === 'object')
			.oneOf.filter(rule => Array.isArray(rule.use))
		rules.forEach(rule => {
			rule.use.forEach(moduleLoader => {
				if (
					moduleLoader.loader !== undefined
            && moduleLoader.loader.includes('css-loader')
            && typeof moduleLoader.options.modules === 'object'
				) {
					moduleLoader.options = {
						...moduleLoader.options,
						modules: {
							...moduleLoader.options.modules,
							// This is where we allow camelCase class names
							exportLocalsConvention: 'camelCase',
						},
					}
				}
			})
		})

		return config
	},
}

module.exports = withNx(nextConfig)
