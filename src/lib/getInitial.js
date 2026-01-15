import { initialCompatLetters, initialLetters, initialSplitCompatLetters, initialSplitLetters } from "../utils/chars.js"
import isSyllable from "./isSyllable.js"

/**
 * Extracts the initial consonant letter from the given Hangul syllable block.
 *
 * @example
 * getInitial("한") // "ㅎ"
 * getInitial("한", { compatibility: false }) // "ᄒ"
 *
 * @param {string} syllable The syllable block to extract the initial letter from
 * @param {object} [options]
 * @param {boolean} [options.compatibility] Converts the initial letter into its compatibility form (default: `true`)
 * @param {boolean} [options.decouple] Decomposes composite letters into their constituent letters (default: `false`)
 * @returns {string}
 */
export default function getInitial(syllable, options = {}) {
	if (typeof syllable !== "string") throw new TypeError("Expected syllable to be a string")

	if (!options || options.constructor !== Object) options = {}
	if (typeof options.compatibility !== "boolean") options.compatibility = true
	if (typeof options.decouple !== "boolean") options.decouple = false

	if (!isSyllable(syllable)) return ""

	const charCode = syllable.codePointAt(0)
	const initialIndex = ~~((charCode - 0xac00) / 588)

	if (options.compatibility) {
		if (options.decouple) {
			return initialSplitCompatLetters[initialIndex]
		}

		return initialCompatLetters[initialIndex]
	} else {
		if (options.decouple) {
			return initialSplitLetters[initialIndex]
		}

		return initialLetters[initialIndex]
	}
}
