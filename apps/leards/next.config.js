/* eslint-disable */
// @ts-nocheck

const {withNx} = require('@nrwl/next/plugins/with-nx')

function allowCamelCaseClassNames(config) {
	const rules = config.module.rules
		.find(rule => typeof rule.oneOf === 'object')
		.oneOf.filter(rule => Array.isArray(rule.use))

	rules.forEach(rule => {
		rule.use.forEach(moduleLoader => {
			const isCssLoader = moduleLoader.loader !== undefined
				&& moduleLoader.loader.includes('css-loader')
				&& typeof moduleLoader.options.modules === 'object'
			if (isCssLoader) {
				moduleLoader.options = {
					...moduleLoader.options,
					modules: {
						...moduleLoader.options.modules,
						exportLocalsConvention: 'camelCase',
					},
				}
			}
		})
	})

	return config
}

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		svgr: false,
	},
	webpack: allowCamelCaseClassNames,
}

module.exports = withNx(nextConfig)
