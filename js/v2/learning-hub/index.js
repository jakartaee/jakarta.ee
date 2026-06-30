/*!
 * Copyright (c) 2026 Eclipse Foundation AISBL
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Olivier Goulet <olivier.goulet@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import { LearningHub } from "./learning-hub";
import { SearchBar } from "./search-bar";
import { GuideFilters } from "./guide-filters";
import { Callout } from "./callout";

LearningHub.register();
SearchBar.register();
GuideFilters.register();
Callout.register();

export { LearningHub, SearchBar, GuideFilters, Callout };
