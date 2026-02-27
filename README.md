# GitHub MCP Server - TypeScript

GitHub ile entegre çalışan Model Context Protocol sunucusu.

## 🚀 Başlangıç

### 1. Token Alma

1. GitHub'da Settings → Developer settings → Personal access tokens
2. "Generate new token (classic)" öğesine tıkla
3. Gerekli scopes'ı seç:
   - `repo` (repository erişimi)
   - `workflow` (GitHub Actions)
   - `admin:repo_hook` (webhook'lar)
4. Token'ı kopyala

### 2. Environment Kurma

`.env.example` dosyasını `.env` olarak kopyala:

```bash
cp .env.example .env
```

`.env` dosyasını aç ve tokeni ekle:

```env
GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
GITHUB_USERNAME=senin_github_kullanıcıadın
```

⚠️ **Önemli:** `.env` dosyasını hiçbir yere push etme!

### 3. Kurulum

```bash
npm install
```

### 4. TypeScript Derle

```bash
npm run build
```

### 5. Çalıştır

**Option 1: Node ile (compiled)**
```bash
npm start
```

**Option 2: TypeScript ile direkt (geliştirme)**
```bash
npm run dev
```

**Option 3: HTTP Server**
```bash
node dist/http-server.js
```

## 📋 Mevcut Komutlar

### getUser
GitHub kullanıcı bilgisini al

```json
{
  "type": "getUser",
  "params": {}
}
```

### getRepositories
Tüm repolarını listele

```json
{
  "type": "getRepositories",
  "params": {}
}
```

### getIssues
Repo'daki issues'ı listele

```json
{
  "type": "getIssues",
  "params": {
    "repo": "repo_adı",
    "state": "open"
  }
}
```

### getPullRequests
PR'ları listele

```json
{
  "type": "getPullRequests",
  "params": {
    "repo": "repo_adı",
    "state": "open"
  }
}
```

### createIssue
Yeni issue oluştur

```json
{
  "type": "createIssue",
  "params": {
    "repo": "repo_adı",
    "title": "Issue başlığı",
    "body": "Issue açıklaması"
  }
}
```

### updateIssue
Issue durumunu güncelle

```json
{
  "type": "updateIssue",
  "params": {
    "repo": "repo_adı",
    "issue_number": 1,
    "state": "closed"
  }
}
```

### mergePullRequest
PR merge et

```json
{
  "type": "mergePullRequest",
  "params": {
    "repo": "repo_adı",
    "pr_number": 1,
    "commit_message": "İsteğe bağlı commit mesajı"
  }
}
```

### getStarredRepositories
Yıldızlanan repolarını listele

```json
{
  "type": "getStarredRepositories",
  "params": {}
}
```

## 🌐 HTTP Server Kullanımı

HTTP server çalıştıkça:

```bash
# Health check
curl http://localhost:3000/health

# Komutları listele
curl http://localhost:3000/commands

# İstek gönder
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"type":"getUser","params":{}}'
```

## 📁 Struktur

```
.
├── src/
│   ├── index.ts           # CLI entry point
│   ├── http-server.ts     # HTTP server
│   ├── mcp-server.ts      # MCP sunucusu mantığı
│   ├── github-client.ts   # GitHub API client
│   └── types.ts           # TypeScript types
├── dist/                  # Compiled JavaScript
├── package.json
├── tsconfig.json
├── .env.example
├── .env                   # GIT'E PUSH ETME!
└── README.md
```

## 🔐 Güvenlik

- ✅ `.env` dosyası `.gitignore`'da
- ✅ Token asla kodda hardcode edilmiş değil
- ✅ Environment variable'dan okunuyor
- ⚠️ Dönem olarak token'ı değiştir
- ⚠️ Token'ı kimseyle paylaşma

## 🛠️ Geliştirme

```bash
# Yeni feature ekle
npm run build

# Hata ayıkla
npm run dev

# TypeScript kontrol
npx tsc --noEmit
```

## 📚 Kaynaklar

- [GitHub REST API](https://docs.github.com/rest)
- [Octokit.js](https://github.com/octokit/rest.js)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 📝 Lisans

MIT
