#!/bin/bash
set -e

echo "🔄 Syncing frontend and backend correctly..."

### 0. Commit changes on main ###
git checkout main
git add .
git commit -m "Sync updates"


#############################################
#  FRONT-END: copy ONLY the CONTENT OF client/
#############################################

git checkout frontend
git restore --source=main client/

# Move everything *inside* client/ into root
mv client/* .

# Remove empty client folder
rm -rf client

git add .
git commit -m "Sync frontend (client content from main)"


#############################################
#  BACK-END: copy ONLY the CONTENT OF server/
#############################################

git checkout backend
git restore --source=main server/

# Move everything *inside* server/ into root
mv server/* .

# Remove empty server folder
rm -rf server

git add .
git commit -m "Sync backend (server content from main)"


### Return to main ###
git checkout main

echo "✅ Sync complete! Front-end and Back-end are now CLEAN."
