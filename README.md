# China Field Guide

A personal, history-first travel guide to China: short histories, facts, sights, food and phrases — no hotels.

**Live site:** https://thewanderingpolpetta-alt.github.io/china-field-guide/

## Running it locally

- Double-click `Open Guide.cmd` for full street-level maps (starts a small local server on port 8080), or
- Double-click `index.html` (works too; maps are less detailed in China).

## Adding a destination

1. Copy `data/beijing.js` to `data/<city>.js` and fill it in.
2. Add `<script src="data/<city>.js"></script>` to `index.html`.
3. Remove the city from `comingSoon` in `data/china.js`.

Photos are hotlinked from Wikimedia Commons with credits; maps use Leaflet with OpenStreetMap.
