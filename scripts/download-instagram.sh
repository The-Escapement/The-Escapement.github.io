#!/bin/sh

# Instagram profile picture downloader using instaloader
# Downloads profile pictures for all handles listed in index.html

# Create assets/team directory if it doesn't exist
mkdir -p assets/team

# Instagram handles from the HTML file
HANDLES="
watchanish
rjbroer
wei_koh_revolution
kingflum
changingtimes001
horoloupe
waitlisted
andrew_morgan_watches
arabwatchguide
equationdutemps
fumanku
jacopo_corvo
langepedia
marc.gebauer
nicoleonardvanderhorst
nycwatchguy
Perezscope
s7ndro
samuelnaldi
Shani.watch
silas.walton
SwissWatchGang
TheJourneGuy
Tony_Traina
unekual
watchgirloffduty
watchstorydxb
watchthetime
"

echo "🚀 Starting Instagram profile picture download..."

# Download profile pictures for each handle
for handle in $HANDLES; do
    echo "📸 Downloading profile picture for @$handle..."

    # Use instaloader to download just the profile picture
    # --no-posts: Don't download regular posts (only profile picture)
    # --dirname-pattern: Set custom directory pattern
    # --title-pattern: Set custom filename pattern for profile pics
    # --request-timeout: Increase timeout to handle rate limiting
    # --max-connection-attempts: Increase retry attempts
    instaloader \
        --no-posts \
        --dirname-pattern "assets/team" \
        --title-pattern "$handle" \
        --request-timeout 600 \
        --max-connection-attempts 5 \
        --quiet \
        "$handle"

        if [ $? -eq 0 ]; then
        echo "✅ Successfully downloaded @$handle"
    else
        echo "❌ Failed to download @$handle"
        # If we get rate limited, wait longer before the next attempt
        echo "⏳ Rate limited - waiting 600 seconds before next request..."
        sleep 600
    fi

    # Add a longer delay between requests to be more respectful
    echo "⏳ Waiting 5 seconds before next request..."
    sleep 10
done

echo "🎉 All downloads completed!"
echo "Profile pictures saved in assets/team/"