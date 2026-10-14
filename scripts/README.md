# Post-generation enhancements

After a MkDocs regeneration, run `python3 scripts/normalize_search_text.py search/search_index.json` to normalize generated search excerpts while retaining indexed words, titles and locations.

Preserve `stylesheets/site.css` focus styles. Load `scripts/navigation-enhancement.js` after the Material bundle, either through MkDocs `extra_javascript` or by appending it to the newly generated bundle. The current static build appends this exact source to `assets/javascripts/bundle.79ae519e.min.js`; do not append twice. It manages mobile drawer/search keyboard access and closed-panel inert state.

After regeneration, retest search result and fragment clicks, mobile Tab/Enter/Space/Escape, pointer drawer navigation, Back and viewport resize.
