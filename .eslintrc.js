module.exports = {
	"extends": "eslint:recommended",
	"env": {
		"node": true,
		"jest": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 2017,
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true
		}
	},
	"rules": {
		"indent": [2, "tab", { "SwitchCase": 1 }],
		"linebreak-style": [2, "unix"],
		"quotes": [2, "single"],
		"semi": [2, "always"],
		"comma-dangle": [2, "never"],
		"no-cond-assign": [2, "always"],
		"no-console": 0,
		"eqeqeq": [2, "smart"],
		"camelcase": [2, {properties: "never"}],
		"no-unused-expressions": [2, { "allowShortCircuit": false, "allowTernary": false }],
		"require-await": "error"
	}
};