"use strict";

// deps

	// locals
	import Container from "./Container";
	import  { patternColor, patternEmail, patternUrl, patternIPV4, patternIPV6 } from "./utils/patterns";

// types & interfaces

	import {
		tValidSkeleton, tMinMaxValidSkeleton, tRegexValidSkeleton,
		tValidType,
		iDocumentationFunction, iDocumentationObjectOrArray, iDocumentationValue
	} from "./utils/_interfaces";

// module

export {
	tValidSkeleton, tMinMaxValidSkeleton, tRegexValidSkeleton,
	tValidType,
	iDocumentationFunction, iDocumentationObjectOrArray, iDocumentationValue
};

export { patternColor, patternEmail, patternUrl, patternIPV4, patternIPV6 };

export default Container;
