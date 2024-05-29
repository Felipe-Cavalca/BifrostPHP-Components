const { owner, repo } = context.repo
const releaseId = process.env.RELEASE_ID
await github.repos.updateRelease({
  owner,
  repo,
  release_id: releaseId,
  draft: false, // Remove o status de rascunho
})
