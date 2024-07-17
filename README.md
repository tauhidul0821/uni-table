

### for creating library and application for testing
```bash
ng new uni-table --no-standalone --create-application=false

ng g library uni-table --no-standalone --prefix=uni

ng g application uni-table-example --no-standalone
```

## for build library and test on project and publish on npm package manager 
```JSON
    "start": "ng serve uni-table-example",
    "lib:build": "ng build uni-table",
    "uni-table": "ng serve uni-table-example",
    "lib:package": "cd dist/uni-table && npm pack",
    "lib:publish": "cd dist/uni-table && npm publish --access public"
```

# For access user to npm
```bash
npm adduser
```
- login through browser


# For Build package:
- go to my-library folder
- update version no.
- run  this command for build package :
- ng build my-library --configuration=production

# For Publish library
- go to dist folder
- npm publish --access public
-



# git tag
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
or
git tag v1.0.0
git push origin v1.0.0

```

# git Release
```bash
Create a Release on GitHub:
Go to the "Releases" section of your repository.
Click "Draft a new release."
Fill in the tag, title, and description.
Publish the release.
```

