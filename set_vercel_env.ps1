$envs = @{
  "NEXT_PUBLIC_FIREBASE_API_KEY" = "AIzaSyB6oi0cIXXAIcaBANUttTdUmb71__7lVM0"
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" = "datadriven-4816c.firebaseapp.com"
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID" = "datadriven-4816c"
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" = "datadriven-4816c.firebasestorage.app"
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" = "387321907004"
  "NEXT_PUBLIC_FIREBASE_APP_ID" = "1:387321907004:web:7485aed3495121dfa80039"
}

$targets = @("production", "preview", "development")

foreach ($key in $envs.Keys) {
  $val = $envs[$key]
  foreach ($target in $targets) {
    Write-Host "Adding $key to $target..."
    cmd /c npx vercel env add $key $target --value "$val" --yes --force
  }
}

Write-Host "Finished setting Vercel environment variables."
