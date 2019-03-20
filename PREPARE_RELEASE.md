This is a checklist for publishing new releases.

## Preparation

1. Raise your version number with `npm version [major|minor|patch] --no-git-tag-version` **ONLY**.
2. [`CHANGELOG.md`](./CHANGELOG.md) mirrors **all** changes for the upcoming release. This includes:
    - New changes, new fixes, new additions
    - New version links for headline **and** unreleased link (see bottom of this file)
3. An *annotated* Git tag has been created, like this: `git tag -a x.y.z`
    - Tag message **MUST** be `See CHANGELOG for details.`

These things are mandatory before publishing any new release.


## Publishing

1. Publish to NPM via `npm publish --access public`.
2. Create a [new release](https://github.com/gridonic/webpack/tags) from the Git tag via GitHub. Release message **SHOULD** be :
    ```markdown
    See [CHANGELOG](https://github.com/gridonic/webpack/blob/X.Y.Z/CHANGELOG.md) for details.
    ```
    Do not forget to adjust the version number within the CHANGELOG link.
