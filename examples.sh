#!/bin/bash

# GitHub MCP Server - Example İstekleri

# 1. Health Check
echo "1️⃣ Health Check"
curl http://localhost:3000/health
echo -e "\n"

# 2. Komutları Listele
echo "2️⃣ Mevcut Komutları Listele"
curl http://localhost:3000/commands
echo -e "\n"

# 3. Kullanıcı Bilgisi
echo "3️⃣ Kullanıcı Bilgisi"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"getUser","params":{}}'
echo -e "\n"

# 4. Repoları Listele
echo "4️⃣ Repoları Listele"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"getRepositories","params":{}}'
echo -e "\n"

# 5. Issues Listele (repo_name yerine kendi repo adını yaz)
echo "5️⃣ Issues Listele"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"getIssues","params":{"repo":"repo_name","state":"open"}}'
echo -e "\n"

# 6. Pull Requests Listele
echo "6️⃣ Pull Requests Listele"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"getPullRequests","params":{"repo":"repo_name","state":"open"}}'
echo -e "\n"

# 7. Yeni Issue Oluştur
echo "7️⃣ Yeni Issue Oluştur"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"createIssue","params":{"repo":"repo_name","title":"Test Issue","body":"Bu bir test issue"}}'
echo -e "\n"

# 8. Issue Kapat
echo "8️⃣ Issue Kapat"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"updateIssue","params":{"repo":"repo_name","issue_number":1,"state":"closed"}}'
echo -e "\n"

# 9. PR Merge Et
echo "9️⃣ PR Merge Et"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"mergePullRequest","params":{"repo":"repo_name","pr_number":1,"commit_message":"Merge commit"}}'
echo -e "\n"

# 10. Yıldızlanan Repoları Listele
echo "🔟 Yıldızlanan Repoları Listele"
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"getStarredRepositories","params":{}}'
echo -e "\n"
