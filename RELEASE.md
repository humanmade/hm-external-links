# Release Process

Releases are handled via two GitHub Actions workflows.

## Steps

1. Merge all changes into `main`. The [`build-release-branch.yml`](.github/workflows/build-release-branch.yml) workflow runs automatically and pushes compiled assets to the `release` branch.

2. Update [CHANGELOG.md](CHANGELOG.md) with the new version entry and merge into `main`.

3. On GitHub, go to **Actions → Tag and Release → Run workflow**.

4. Enter the version (e.g. `v1.1.0`) and target branch (`release`), then click **Run workflow**.

The [`tag-and-release.yml`](.github/workflows/tag-and-release.yml) workflow will then:
- Replace the `__VERSION__` placeholder in `hm-external-links.php` with the tag version
- Commit the versioned file to the `release` branch
- Create and push the git tag pointing to the `release` branch
- Create a GitHub Release

## Installing via Composer

Because tags point to the `release` branch (which includes compiled assets), Composer works without any custom repository configuration once the package is on Packagist:

```bash
composer require humanmade/hm-external-links
```

Or pin to a specific version:

```json
{
    "require": {
        "humanmade/hm-external-links": "^1.0.0"
    }
}
```
