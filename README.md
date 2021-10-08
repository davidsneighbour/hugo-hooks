[![GitHub issues](https://img.shields.io/github/issues-raw/dnb-org/hooks?logo=github&style=for-the-badge)](https://github.com/dnb-org/hooks/issues) ![LasCHanges](https://img.shields.io/github/last-commit/dnb-org/hooks?color=%23ff7700&logo=github&style=for-the-badge) [![Codacy Badge](https://img.shields.io/codacy/grade/1aa52a19ae5b42efa80f04157a29ae8d?logo=codacy&style=for-the-badge)](https://www.codacy.com/gh/dnb-org/hooks/dashboard) ![License](https://img.shields.io/github/license/dnb-org/hooks?logo=github&style=for-the-badge) ![Follow us on Twitter](https://img.shields.io/twitter/follow/hugonewsletter?color=%231DA1F2&logo=twitter&style=for-the-badge) [![Gitter Chatroom](https://img.shields.io/gitter/room/dnb-org/community?color=%23ed1965&logo=gitter&style=for-the-badge)](https://gitter.im/dnb-org/community) ![Latest Version](https://img.shields.io/github/v/tag/dnb-org/hooks?color=%23ed1965&label=Release&logo=hugo&logoColor=%23ffffff&sort=semver&style=for-the-badge) [![Hugo Version](https://img.shields.io/badge/Hugo-0.88.1-%23ed1965&?style=for-the-badge&logo=hugo&color=ed1965&?cacheSeconds=maxAge)](https://gohugo.io/)

# DNB Org Hooks for GoHugo

This is a hooks system for GoHugo templates.

We often want to add locations in our templates that users can add something on their own. Be it some code for an analytics program, some space for ads or call to actions or additional footer sections, a banner at the top of the page or some arbitrary Javascript code.

This module adds these hooks to your theme and provides a simple way any theme developer can add these "layout locations" to "hook" additional features in.

## Hook use

Theme users save hooks to the `layouts/partials/hooks` directory. There are no errors if a hook is not found. If a hook has an added `-cached` to it's name then it will be cached and on re-calls be re-used. 

For example:

```gotemplate
{{ partial "func/hook" "head-start" }}
```

will load `layouts/partials/hooks/head-start.html` and `layouts/partials/hooks/head-start-cached.html`.

You can force caching by loading the hook via `partialCached` instead.

```gotemplate
{{ partialCached "func/hook" "head-start" "cachename"}}
```

These hooks currently **do not return any values**, they execute the layouts. To read more about ideas to extend the hooks read [ISSUE2](https://github.com/dnb-org/hooks/issues/2).

## Simple Use

Add the hook name as parameter to simple calls. The context inside of the hook layout will have a hook parameter with that name.

```gotemplate
{{- partial "func/hook" "hookname" -}}
{{- partialCached "func/hook" "hookname" -}}
```

## Extended Use

If you want to submit more information than just the hookname (like the context) then add a `dict` as parameter. The `hook` item is required, everything else will be passed through to the hook layout.

```gotemplate
{{- partial "func/hook" ( dict "hook" "hookname" "context" . ) -}}
{{- partialCached "func/hook" ( dict "hook" "hookname" "context" . ) -}}
```

## Some more configuration

The hook will add a warning (more like a notification, but Hugo does not have anything like that yet) if a hook exists that is not used. You can disable this by setting `Params.dnb.hooks.debug` to any value lower than 4.

## Best Practice

To be very portable between themes the following hooks should be used at the appropriate locations. All DNB Org GoHugo themes will do so. 

| Hookname | Location |
| --- | --- |
| **head-start** | |
| **head-pre-css** | |
| **head-post-css** | |
| **head-end** | |
| **body-start** | |
| **content-start** | |
| **content-end** | |
| **footer-star** | |
| **footer-end** | |
| **body-end** | |

## Installation

If you haven't done so already initialise your repository as a GoHugo module:

```bash
hugo mod init github.com/username/reponame
```

Then add the module to your configuration in `config.toml` or `config/_default/config.toml`:

```toml
[module]
[[module.imports]]
path = "github.com/dnb-org/hooks"
```

or in `config/_default/module.toml`:

```toml
[[imports]]
path = "github.com/dnb-org/hooks"
```

The next time you run hugo it will download the latest version of this module.

## Update

To update this module:

```bash
hugo mod get -u github.com/dnb-org/hooks
```

To update all modules:

```bash
hugo mod get -u
```

To update all modules recursively:

```bash
hugo mod get -u ./...
```
