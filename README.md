## DNB-Hugo Hooks

This is a template hooks system for Hugo.

We often want to add places in our templates that users can add something on
their own. Be it some code for an analytics program or additional footer
sections, a banner at the top of the page or some arbitrary Javascript code.

This layout introduces hooks. A simple way a theme developer can add these
"layout locations" to hook additional features in.

### Hook use

Hooks are saved to the `layouts/partials/hooks` directory. There are no errors 
if a hook is not found. If a hook has an added `-cached` to it's name then it will
be cached and on multiple calls re-used. 

For example:

```gotemplate
{{ partial "func/hook" "head-start" }}
```

will load `layouts/partials/hooks/head-start.html` and `layouts/partials/hooks/head-start-cached.html`.

You can force caching by loading the hook via `partialCached` instead.

Hooks do not return any values, they execute layouts. 

### Simple Use

Add the hook name as parameter to simple calls. The context inside of the hook
layout will have a hook parameter with that name.

```
{{- partial "func/hook" "hookname" -}}
{{- partialCached "func/hook" "hookname" -}}
```

### Extended Use

If you want to submit more information than just the hookname (like the context)
then add a `dict` as parameter. The `hook` item is required, everything else
will be passed through to the hook layout.

```
{{- partial "func/hook" ( dict "hook" "hookname" "context" . ) -}}
{{- partialCached "func/hook" ( dict "hook" "hookname" "context" . ) -}}
```

### Some more configuration

The hook will add a warning (more like a notification, but Hugo does not have
anything like that yet) if a hook exists that is not used. You can disable this
by setting `Params.dnb.hooks.debug` to any value lower than 4.

### Installation

Enable modules in your own repository and add this module to your required modules in config.toml:

```shell script
hugo mod init github.com/username/reponame
```

Then add the module to your configuration:

```toml
[module]
[[module.imports]]
path = "github.com/dnb-hugo/hooks"
```

The next time you run hugo it will download the latest version of the module.

### Update

To update this module:

```shell
hugo mod get -u github.com/dnb-hugo/hooks
```

To update all modules:

```shell
hugo mod get -u
```
