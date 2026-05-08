#!/bin/bash

set -e

cd "$HOME/alt-vulnmap/frontend"

echo "Checking important files..."
test -f src/App.jsx
test -f src/components/ScoreGauges.jsx
test -f src/components/VulnerabilityCards.jsx
test -f src/components/BiomarkerWaterfall.jsx
test -f src/components/BatchSummaryCards.jsx
test -f src/components/BatchRankingChart.jsx
test -f src/components/PathwayFlow.jsx
test -f src/components/AssayTimeline.jsx
test -f src/components/CancerContext.jsx
test -f src/components/PhenotypeBadges.jsx

echo "Running production build..."
npm run build

echo "Frontend check completed successfully."
