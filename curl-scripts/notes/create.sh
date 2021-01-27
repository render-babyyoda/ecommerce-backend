API="http://localhost:4741"
URL_PATH="/notes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "notes": {
      "purchaseId": "'"${ID}"'",
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'"
    }
  }'
