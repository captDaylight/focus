# focus

When running the gulp file, you need to select which js file you are watching.

```
gulp --jsfile=FILE_TO_WATCH
```

Files to watch are **background**, **content**, or **popup**. Thus, eg:

```
gulp --jsfile=content
```

Will generate and watch the content.js file.