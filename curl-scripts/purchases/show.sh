curl --include "http://localhost:4741/purchases/${ID}" \
--include \
--request GET \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}"
echo
