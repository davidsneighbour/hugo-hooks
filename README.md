<!--- CARD BEGIN --->

![DNB-Hugo/HEAD](.github/github-card-dark.png#gh-dark-mode-only)
![DNB-Hugo/HEAD](.github/github-card-light.png#gh-light-mode-only)

<!--- CARD END --->

# DNB GoHugo Component / Hooks

Hooks for GoHugo layouts. An easy way for theme developers to let users add to their themes.

We often want to add locations and places in our templates and layouts where it's users can add something on their own. Be it some code for an analytics script,, that arbitrary ad or popup or just some space for call to actions or additional footer sections, a banner at the top of the page or some very specific Javascript code. `hugo-hooks` is what you need.

This module adds these hooks to your theme and provides a simple way **any theme developer** can add these "layout locations" to "hook" additional features in.

**The end-user** can add simple layout files to "hook" into these locations and add whatever pizzazz their website needs.

<!--- THINGSTOKNOW BEGIN --->

## Some things you need to know

These are notes about conventions in this README.md. You might want to make yourself acquainted with them if this is your first visit.

<details>

<summary>:heavy_exclamation_mark: A note about proper configuration formatting. Click to expand!</summary>

The following documentation will refer to all configuration parameters in TOML format and with the assumption of a configuration file for your project at `/config.toml`. There are various formats of configurations (TOML/YAML/JSON) and multiple locations your configuration can reside (config file or config directory). Note that in the case of a config directory the section headers of all samples need to have the respective section title removed. So `[params.dnb.something]` will become `[dnb.something]` if the configuration is done in the file `/config/$CONFIGNAME/params.toml`.

</details>
<!--- THINGSTOKNOW END --->

<!--- INSTALLUPDATE BEGIN --->

## Installing

First enable modules in your own repository if you did not already have done so:

```bash
hugo mod init github.com/username/reponame
```

Then add this module to your required modules in `config.toml`.

```toml
[module]

[[module.imports]]
path = "github.com/davidsneighbour/hugo-hooks"
disable = false
ignoreConfig = false
ignoreImports = false

```

The next time you run `hugo` it will download the latest version of the module.

## Updating

```bash
# update this module
hugo mod get -u github.com/davidsneighbour/hugo-hooks
# update to a specific version
hugo mod get -u github.com/davidsneighbour/hugo-hooks@v1.0.0
# update all modules recursively over the whole project
hugo mod get -u ./...
```
<!--- INSTALLUPDATE END --->

## Hook use

Theme users save hooks to the `layouts/partials/hooks` directory. There are no errors if a hook is not found. If a hook has an added `-cached` to it's name then it will be cached and on re-calls be re-used.

For example:

```golang
{{ partial "func/hook" "head-start" }}
```

will load `layouts/partials/hooks/head-start.html` and `layouts/partials/hooks/head-start-cached.html`. The non-cached variant will be loaded **BEFORE** the cached one.

You can force caching by loading the hook via `partialCached` instead.

```golang
{{ partialCached "func/hook" "head-start" "cachename"}}
```

These hooks currently **do not return any values**, they execute the layouts. To read more about ideas to extend the hooks to return values read [#2 RFC: Hooks that return values](https://github.com/davidsneighbour/hugo-hooks/issues/2).

## Simple Use

Add the hook name as parameter to simple calls. The context inside of the hook layout will have a hook parameter with that name.

```golang
{{- partial "func/hook" "hookname" -}}
{{- partialCached "func/hook" "hookname" $CACHENAME -}}
```

## Extended Use

If you want to submit more information than just the hookname then add a `dict`ionary as parameter. The `hook` item is required, everything else will be passed through as-is to the hook layout.

```golang
{{- partial "func/hook" ( dict "hook" "hookname" "context" . ) -}}
{{- partialCached "func/hook" ( dict "hook" "hookname" "context" . ) -}}
```

## Some more configuration


You can also configure the module by setting the following options in the `params` section of your configuration:

```toml
[dnb.hooks]
disable_messages = [
  "unused_hooks",
  "running_hooks",
  "running_cached_hooks",
  "running_uncached_hooks",
]
```

-   `unused_hooks` - silences "unused hooks" messages
-   `running_hooks` - silences ALL "running hook x" messages
-   `running_cached_hooks` - silences all "running cached hook x" messages
-   `running_uncached_hooks` - silences all "running uncached hook x" messages

## Best Practice

To be very portable between themes the following hooks should be used at the appropriate locations. All DNB Org GoHugo themes will do so.

| :Hookname | Runs | Location |
| --- | --- | --- |
| **setup** | 1 | Runs before anything is put out. Use this hook to set up and configure your scripts. |
| **head-init** | 1 | Runs right after the `<head>` tag. Layouts using this hook should not print anything out so that the three initial head-tags are printed first. Use `head-start` for things you want in the beginning of the page head. |
| **head-start** | 1 | Runs after the three initial head-tags. |
| **head-pre-css** | 1 | Runs inside the head before the stylesheets are added. |
| **head-post-css** | 1 | Runs inside the head after the stylesheets are added. |
| **head-end** | 1 | Runs at the end of the head, before the `</head>` tag. |
| **body-start** | 1 | |
| **container-start** | 1 | |
| **content-start** | 1 | |
| **content-end** | 1 | |
| **container-end** | 1 | |
| **footer-start** | 1 | |
| **footer-inside-start** | 1+ | |
| **footer-widget-start** | 1+ | |
| **footer-widget-end** | 1+ | |
| **footer-inside-end** | 1+ | |
| **footer-end** | 1 | |
| **body-end-pre-script** | 1 | Runs at the end of the body BEFORE the theme javascripts are added. |
| **body-end** | 1 | Runs at the end of the body AFTER the theme javascripts are added. |
| **teardown** | 1 | Runs after everything is printed to output. Use this hook to cleanup for your scripts. |

<!--- COMPONENTS BEGIN --->

## Other [GoHugo](https://gohugo.io/) components by [@dnb-org](https://github.com/dnb-org/)

<!-- prettier-ignore -->
| Component | Description |
| :--- | :--- |
| [dnb-hugo-auditor](https://github.com/davidsneighbour/hugo-auditor) | |
| [dnb-hugo-debug](https://github.com/davidsneighbour/hugo-debug) :mage_man: | Debug EVERYTHING in GoHugo. |
| [dnb-hugo-errors](https://github.com/davidsneighbour/hugo-errors) | A Hugo module that adds more versatile error pages to a site. |
| [dnb-hugo-feeds](https://github.com/davidsneighbour/hugo-feeds) | Implements various configurable feed formats. |
| [dnb-hugo-functions](https://github.com/davidsneighbour/hugo-functions) | A Hugo theme component with helper functions for other projects. |
| [dnb-hugo-giscus](https://github.com/davidsneighbour/hugo-giscus) | The Giscus comment system layout for GoHugo. |
| [dnb-hugo-head](https://github.com/davidsneighbour/hugo-head) | A GoHugo theme component that solves the old question of "What tags belong into the `<head>` tag of my website?" |
| [dnb-hugo-hooks](https://github.com/davidsneighbour/hugo-hooks) | Hooks for GoHugo layouts. An easy way for theme developers to let users add to their themes.  |
| [dnb-hugo-humans](https://github.com/davidsneighbour/hugo-humans) | Your site is made by humans. Humans.txt is naming them. |
| [dnb-hugo-icons](https://github.com/davidsneighbour/hugo-icons) | Icons for your Hugo website. |
| [dnb-hugo-internals](https://github.com/davidsneighbour/hugo-internals) | Better internal templates for GoHugo |
| [dnb-hugo-netlification](https://github.com/davidsneighbour/hugo-netlification) | a collection of tools that optimize your site on Netlify |
| [dnb-hugo-opensearch](https://github.com/davidsneighbour/hugo-opensearch) | configuration for Open Search |
| [dnb-hugo-pictures](https://github.com/davidsneighbour/hugo-pictures) | |
| [dnb-hugo-pwa](https://github.com/davidsneighbour/hugo-pwa) | Automatically turns your site into a PWA |
| [dnb-hugo-renderhooks](https://github.com/davidsneighbour/hugo-renderhooks) | render hooks for Markdown markup |
| [dnb-hugo-robots](https://github.com/davidsneighbour/hugo-robots) | Add a customizable robots.txt to your website. |
| [dnb-hugo-schema](https://github.com/davidsneighbour/hugo-schema) | |
| [dnb-hugo-search-algolia](https://github.com/davidsneighbour/hugo-search-algolia) | |
| [dnb-hugo-security](https://github.com/davidsneighbour/hugo-security) | Add a security.txt to your site with information about your preferred procedures to notify the developer team about security issues. |
| [dnb-hugo-sitemap](https://github.com/davidsneighbour/hugo-sitemap) | |
| [dnb-hugo-social](https://github.com/davidsneighbour/hugo-social) | |
| [dnb-hugo-workflows](https://github.com/davidsneighbour/hugo-workflows) | A collection of Github Actions/Workflows to optimise your work with GoHugo. |
| [dnb-hugo-youtube](https://github.com/davidsneighbour/hugo-youtube) | A shortcode and partial for lite and speedy youtube embeds. |

<!--lint disable no-missing-blank-lines -->
<!--- COMPONENTS END --->
