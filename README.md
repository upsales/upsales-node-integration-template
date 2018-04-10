# upsales-node-integration-template

This repository should be used as a template to start building an upsales integration.

## Get started
To get started:

```git clone -o upsales-node-integration-template https://github.com/upsales/upsales-node-integration-template.git```

```cd upsales-node-integration-template```

```rm -rf .git```

```npm install```

```npm start```

Now you can open a browser and go to http://localhost:3030/version. It should display ```1.0.0```.

## Testing
To submit an integration it must be tested. We want you to use jest for testing (https://facebook.github.io/jest/) and at least 90% test coverage is required.

This template comes prepared with some tets and has full test coverage from the beginning. To run the tests, just type ```npm t -- --coverage```. The test will run and a coverage table will be presented in the end.
If you want to test the code while developing you can add the *---watch* flag ```npm t -- --coverage --watch```. Now as soon as you save a file, the tests will run.

You can find the documentation for jest here: https://facebook.github.io/jest/docs/en/getting-started.html

## Port
If you want to change the port the integration server is running on it is specified in a .env file. Run ```npm run gen-env```to generate this file.

## Logging
We want you to log using the log-module provided in this template. The log-module is a winston instance and has the following methods:
- .info()
- .error()