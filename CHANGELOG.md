# react-intl-po

## [HEAD]
> Unreleased

* chore(env): add node 8 to travisCI & switch to yarn
* chore(dev): introduce prettier & switch from eslint-config-m to airbnb-base
* chore(test): upgrade Jest to 20

## [v2.1.0]
> Jul 17, 2017

* feat(contexts): Allow user to specify msgctxt with `-c` arguments. ([@Sand1929](https://github.com/Sand1929)in [#84])

## [v2.0.2]
> Mar 02, 2017

* fix(potFormater): Escape quotes in msgId ([@jonbretman](https://github.com/jonbretman) in [#70])
* chore(Jest): update jest to 19.

## [v2.0.1]
> Feb 12, 2017

* feat(potFormater): Add defaultMessage to metadata of pot files.  ([@Guibod](https://github.com/Guibod) in [#60])

## [v2.0.0]
> Feb 11, 2017

* feat(jest): replace ava with jest snapshot testing (#63)
* fix(messageKey): allowing duplicated key in the same file. (#59)
  
  [BREAKING CHANGES]
  
  - readAllMessageAsObjectSync: Passing `messageKey: String` as second parameter.
  

## [v1.2.0]
> Feb 11, 2017

* feat(pot): Added support for POT header. ([@Guibod](https://github.com/Guibod) in [#56])

## [v1.1.0]
> Oct 26, 2016

* feat(node): upgrade to node v6
* feat(npm): upgrade to npm v3
* feat(eslint): upgrade to eslint v3

## [v1.0.10]
> Oct 21, 2016

* feat(messageKey): Added feature where you can pass the message key and use something else than defaultMessage. ([@janzal](https://github.com/janzal) in [#41])

## [v1.0.9]
> Sep 21, 2016

* fix(DEFAULT_MAPPER): prefix is not required anymore. ([@eliseumds](https://github.com/eliseumds) in [#19], [@MorrisGallego](https://github.com/MorrisGallego) in [#34])

## [v1.0.7]
> Sep 13, 2016

* test(structure): move output .temp file into the temp folder for gitignore.
* feat(po2json): added generation of one output file per input if the specified output is a folder. ([@MorrisGallego](https://github.com/MorrisGallego) in [#29])

## [v1.0.6]
> Aug 19, 2016

* chore(modules): upgrade dependency
* feat(filterPOAndWriteTranslateSync): ensure the output folder exists. ([@wuct](https://github.com/wuct) in [#27])

## [v1.0.4]
> Apr 12, 2016

* chore(ava): update lint and test
* chore(codecov): switch to use codecov
* chore(alias): use full name of package

## [v1.0.1]
> Mar 30, 2016

* feat(cli): add cli bin config

## [v1.0.0]
> Mar 27, 2016

* first release
