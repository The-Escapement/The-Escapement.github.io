#!/bin/sh

# Instagram profile picture downloader using instaloader with login
# Downloads profile pictures for all handles listed in index.html
# Using login often helps avoid rate limiting

# Create assets/team directory if it doesn't exist
mkdir -p assets/team

# Instagram handles from the HTML file
HANDLES="
andrew_morgan_watches
arabwatchguide
changingtimes001
equationdutemps
fumanku
horoloupe
jacopo_corvo
kingflum
langepedia
marc.gebauer
nicoleonardvanderhorst
nycwatchguy
Perezscope
rjbroer
s7ndro
samuelnaldi
Shani.watch
silas.walton
SwissWatchGang
TheJourneGuy
Tony_Traina
unekual
waitlisted
watchanish
watchgirloffduty
watchstorydxb
watchthetime
wei_koh_revolution
"

echo "🚀 Starting Instagram profile picture download with login..."

# Check if login credentials are provided
if [ -z "$INSTAGRAM_USERNAME" ] || [ -z "$INSTAGRAM_PASSWORD" ]; then
    echo "❌ Please set INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD environment variables"
    echo "Example: INSTAGRAM_USERNAME=your_username INSTAGRAM_PASSWORD=your_password ./scripts/download-instagram-with-login.sh"
    exit 1
fi

echo "📱 Logging in as @$INSTAGRAM_USERNAME..."

# Download profile pictures for each handle
for handle in $HANDLES; do
    echo "📸 Downloading profile picture for @$handle..."

    # Use instaloader with login to download just the profile picture
    # --login: Use Instagram login (helps avoid rate limiting)
    # --no-posts: Don't download regular posts (only profile picture)
    # --dirname-pattern: Set custom directory pattern
    # --title-pattern: Set custom filename pattern for profile pics
    # --request-timeout: Increase timeout to handle rate limiting
    # --max-connection-attempts: Increase retry attempts

    if [ -e "assets/team/$handle.jpg" ]; then
        echo "✅ @$handle already downloaded"
        continue
    fi

    instaloader \
        --login "$INSTAGRAM_USERNAME" \
        --password "$INSTAGRAM_PASSWORD" \
        --no-captions \
        --no-pictures \
        --no-posts \
        --no-videos \
        --no-video-thumbnails \
        --dirname-pattern "assets/team" \
        --title-pattern "$handle" \
        --request-timeout 600 \
        --max-connection-attempts 1 \
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
    echo "⏳ Waiting 10 seconds before next request..."
    sleep 60
done

echo "🎉 All downloads completed!"
echo "Profile pictures saved in assets/team/"
