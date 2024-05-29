const github = require('@actions/github');

async function createRelease() {
    if (github.context.payload.pull_request.merged) {
        const { owner, repo } = github.context.repo
        const lastTag = (await github.repos.listTags({
            owner,
            repo,
        })).data.map(tag => tag.name).sort().pop()
        const baseString = lastTag.match(/[\d.]+$/)[0]
        const prefix = lastTag.replace(baseString, '')
        const parts = baseString.split('.').map(Number);
        parts[2] += 1; // Incrementa a parte menor da versão
        const newTag = `${prefix}${parts.join('.')}`;
        const tagRef = await github.git.createRef({
            owner,
            repo,
            ref: `refs/tags/${newTag}`,
            sha: github.context.payload.pull_request.merge_commit_sha,
        })
        const release = await github.repos.createRelease({
            owner,
            repo,
            tag_name: newTag,
            name: newTag,
            draft: true, // Cria a release como rascunho
            prerelease: false,
        })
        return release.data.id; // Retorna o ID da release
    }
}

createRelease();
