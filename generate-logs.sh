#!/bin/bash

# Generate 10 random logs
for i in {1..10}
do
  # Random method
  methods=("GET" "POST" "PUT" "DELETE")
  method=${methods[$RANDOM % ${#methods[@]}]}
  
  # Random path
  paths=("/api/center" "/api/user" "/api/product" "/api/order")
  path=${paths[$RANDOM % ${#paths[@]}]}
  
  # Random status (mostly success, some errors)
  statuses=(200 200 200 200 201 201 400 404 500)
  status=${statuses[$RANDOM % ${#statuses[@]}]}
  
  # Random duration
  duration=$((50 + $RANDOM % 450))
  
  # Create the log
  curl -X POST http://localhost:3001/api/logs/create \
    -H "Content-Type: application/json" \
    -d "{
      \"service\": \"test-batch\",
      \"method\": \"$method\",
      \"path\": \"$path\",
      \"status\": $status,
      \"duration\": $duration,
      \"requestBody\": {\"test\": \"data-$i\"},
      \"responseBody\": {\"message\": \"Response for $i\"},
      \"error\": $([ $status -ge 400 ] && echo \"\\\"Error for request $i\\\"\" || echo null)
    }"
  
  echo "Created log $i"
  sleep 1
done