import { medialCompatLetters, medialLetters, medialSplitCompatLetters, medialSplitLetters } from "../utils/chars.js"
import isSyllable from "./isSyllable.js"

/**
 * Extracts the medial vowel letter from the given Hangul syllable block.
 *
 * @example
 * getMedial("한") // "ㅏ"
 * getMedial("한", { compatibility: false }) // "ᅡ"
 * getMedial("하") // "ㅏ"
 * getMedial("환", { decouple: true }) // ["ㅗ", "ㅏ"]
 *
 * @param {string} syllable The syllable block to extract the medial letter from
 * @param {object} [options]
 * @param {boolean} [options.compatibility] Converts the medial letter into its compatibility form (default: `true`)
 * @param {boolean} [options.decouple] Decomposes composite letters into their constituent letters (default: `false`)
 * @returns {string}
 */
export default function getMedial(syllable, options = {}) {
	if (typeof syllable !== "string") throw new TypeError("Expected syllable to be a string")

	if (!options || options.constructor !== Object) options = {}
	if (typeof options.compatibility !== "boolean") options.compatibility = true
	if (typeof options.decouple !== "boolean") options.decouple = false

	if (!isSyllable(syllable)) return ""

	const charCode = syllable.codePointAt(0)
	const medialIndex = ~~(((charCode - 0xac00) % 588) / 28)

	if (options.compatibility) {
		if (options.decouple) {
			return medialSplitCompatLetters[medialIndex]
		}

		return medialCompatLetters[medialIndex]
	} else {
		if (options.decouple) {
			return medialSplitLetters[medialIndex]
		}

		return medialLetters[medialIndex]
	}
}
