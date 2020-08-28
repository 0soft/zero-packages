# Zero Packages

Zero Packages was developed by [ZeroSoft](https://zerosoft.com.br/en/) to help
us build lots of projects with ease. :package:

## Installation

This project also require the following peer dependencies:

| Dependency                                                                       | Version           | Packages that uses                                                                          |
| -------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| [@material-ui/core](https://www.npmjs.com/package/@material-ui/core)             | `^4.11.0`         | `@edusig/zero-material-ui/`                                                                 |
| [@material-ui/lab](https://www.npmjs.com/package/@material-ui/lab)               | `^4.0.0-alpha.56` | `@edusig/remote-autocomplete`                                                               |
| [dayjs](https://www.npmjs.com/package/dayjs)                                     | `^1.8.34`         | `@edusig/zero-lib/{formatters, validators}/date`, `@edusig/zero-material-ui/table/date-col` |
| [event-emitter](https://www.npmjs.com/package/event-emitter)                     | `^0.3.5`          | `@edusig/zero-material-ui/feedback/global-snackbar`                                         |
| [final-form](https://www.npmjs.com/package/final-form)                           | `^4.20.1`         | `@edusig/zero-material-ui/form/`                                                            |
| [lodash](https://www.npmjs.com/package/lodash)                                   | `^4.17.20`        | `@edusig/zero-material-ui/remote-autocomplete`                                              |
| [material-table](https://www.npmjs.com/package/material-table)                   | `^1.69.0`         | `@edusig/zero-material-ui/table`, `@edusig/zero-material-ui/hooks/use-remote-table`         |
| [next](https://www.npmjs.com/package/next)                                       | `^9.5.2`          | `@edusig/use-nextjs-page-loader`, `@edusig/zero-material-ui/table/url-action`               |
| [nprogress](https://www.npmjs.com/package/nprogress)                             | `^0.2.0`          | `@edusig/use-nextjs-page-loader`                                                            |
| [react](https://www.npmjs.com/package/react)                                     | `^16.13.1`        | `Every`                                                                                     |
| [react-dom](https://www.npmjs.com/package/react-dom)                             | `>=16.13.1`       | `Every`                                                                                     |
| [react-dropzone](https://www.npmjs.com/package/react-dropzone)                   | `^11.0.3`         | `@edusig/zero-material-ui/form/file-upload-field`                                           |
| [react-final-form](https://www.npmjs.com/package/react-final-form)               | `^6.5.1`          | `@edusig/zero-material-ui/form/`                                                            |
| [react-final-form-arrays](https://www.npmjs.com/package/react-final-form-arrays) | `^3.1.2`          | `@edusig/zero-material-ui/form/checkbox-group-field`                                        |
| [react-lazyload](https://www.npmjs.com/package/react-lazyload)                   | `^3.0.0`          | `@edusig/optimized-image`                                                                   |
| [react-text-mask](https://www.npmjs.com/package/react-text-mask)                 | `^5.4.3`          | `@edusig/zero-material-ui/form/{cnpj-mask,phone-mask-field,zipcode-mask}`                   |
| [styled-components](https://www.npmjs.com/package/styled-components)             | `^5.1.1`          | `Every`                                                                                     |
| [validate.js](https://www.npmjs.com/package/validate.js)                         | `^0.13.`          | `@edusig/zero-lib/validation`                                                               |

Install the required ones via:

```bash
$ yarn add react react-dom
# or
$ npm i --save react react-dom
```

## Usage

### Nextjs

We currently have the following components:

- `<OptimizedImage>`
- `<Icon>`
- `<Pagination>`
- `<RemoteAutocomplete>`
- `<GlobalSnackbar>`
- `<ContainerLoader>`
- `<Loader>`
- `<Table>`
- `<DefaultForm>`
- `<CheckboxField>`
- `<CheckboxGroupField>`
- `<CNPJMask>`
- `<Counter>`
- `<FileUploadField>`
- `<IncrementalField>`
- `<PhoneMaskField>`
- `<PhoneNumberField>`
- `<SelectField>`
- `<TextField>`
- `<ZipcodeMask>`

## TODO

- [ ] Create Storybook files for every component
- [ ] Create Tests for every function and component
- [ ] Document every function and component
- [ ] Make Eslint configuration more strict

## License

The files included in this repository are licensed under the MIT license.
