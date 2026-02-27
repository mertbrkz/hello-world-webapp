const { GitHubMCPServer } = require('./dist/mcp-server');

async function createAndSolveIssue() {
  const server = new GitHubMCPServer();

  // Issue oluştur
  const issueRes = await server.handleRequest({
    type: 'createIssue',
    params: {
      repo: 'hello-world-webapp',
      title: 'Feature: Add version and build info endpoint',
      body: `## 📋 Açıklama
Hello World Maven uygulamasına version kontrolü ekleyiniz.

## 🎯 Gereksinimler
- Uygulamanın sürüm bilgisini gösteren bir endpoint ekle
- \`/api/version\` endpoint'i oluştur
- Sürüm, build tarihi ve git bilgisini içer

## 📝 Format
\`\`\`json
{
  "version": "1.0.0",
  "buildDate": "2026-02-27",
  "gitCommit": "abc123",
  "status": "running"
}
\`\`\`

## ✅ Acceptance Criteria
- [ ] \`/api/version\` endpoint çalışıyor
- [ ] Maven build.properties'den version alınıyor
- [ ] JSON formatında response dönüyor
- [ ] Unit test yazılmış
- [ ] Dokümantasyon güncellendi`
    }
  });

  if (issueRes.success) {
    const issueNumber = issueRes.data.number;
    console.log('\n✅ Issue oluşturuldu!\n');
    console.log('📌 Issue #' + issueNumber + ': ' + issueRes.data.title);
    console.log('🔗 URL: https://github.com/mertbrkz/hello-world-webapp/issues/' + issueNumber);
    
    return issueNumber;
  } else {
    console.error('❌ Issue oluşturulamadı:', issueRes.error);
    return null;
  }
}

createAndSolveIssue().catch(console.error);
