import { finalCompatLetters, finalLetters, finalSplitCompatLetters, finalSplitLetters } from "../utils/chars.js"
import isSyllable from "./isSyllable.js"

/**
 * Extracts the final consonant letter from the given Hangul syllable block.
 *
 * @example
 * getFinal("한") // "ㄴ"
 * getFinal("한", { compatibility: false }) // "ᆫ"
 * getFinal("하") // ""
 * getFinal("밝", { decouple: true }) // ["ㄹ", "ㄱ"]
 *
 * @param {string} syllable The syllable block to extract the final letter from
 * @param {object} [options]
 * @param {boolean} [options.compatibility] Converts the final letter into its compatibility form (default: `true`)
 * @param {boolean} [options.decouple] Decomposes composite letters into their constituent letters (default: `false`)
 * @returns {string}
 */
export default function getFinal(syllable, options = {}) {
	if (typeof syllable !== "string") throw new TypeError("Expected syllable to be a string")

	if (!options || options.constructor !== Object) options = {}
	if (typeof options.compatibility !== "boolean") options.compatibility = true
	if (typeof options.decouple !== "boolean") options.decouple = false

	if (!isSyllable(syllable)) return ""

	const charCode = syllable.codePointAt(0)
	const finalIndex = (charCode - 0xac00) % 28

	if (options.compatibility) {
		if (options.decouple) {
			return finalSplitCompatLetters[finalIndex]
		}

		return finalCompatLetters[finalIndex]
	} else {
		if (options.decouple) {
			return finalSplitLetters[finalIndex]
		}

		return finalLetters[finalIndex]
	}
}
