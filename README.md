# CiviCRM: AJAX API Identifier

Simple utility extension to flag all CivCRM AJAX API calls with an easily identifiable data payload object member.

## Functionality

When this extension is active, any CiviCRM AJAX API call (v3 or v4) will have this item added to its data payload:
```
isCivicrmApi: 1,
```

### AJAX API examples:
Consid3er a CiviCRM AJAX API call made by the Stripe extension to
`https://example.org/civicrm/ajax/api4/StripePaymentintent/ProcessPublic`.
Without this extension. It will have a payload like so:
```
{
  params {
    "paymentMethodID": "pm_1SIZ5iG3FKAr4t7fdwjkvnek",
    "amount":"0.50",
    "currency":"USD",
    "paymentProcessorID":"4",
    "description":"Help Support CiviCRM!",
    "extraData":"me@example.com;",
    "csrfToken":"1748372284.a50641f549904dea2473c383.0203fda6a9d5727a25246fe880b151702a064f08fbdfc37983d81b3183462be6",
    "captcha":""
  }
  isCivicrmApi: 1
}
```

With this extension installed, that payload will be exactly the same, with the
addition of one element adjacent to `params`:
```
{
  params {
    "paymentMethodID": "pm_1SIZ5iG3FKAr4t7fdwjkvnek",
    "amount":"0.50",
    "currency":"USD",
    "paymentProcessorID":"4",
    "description":"Help Support CiviCRM!",
    "extraData":"me@example.com;",
    "csrfToken":"1748372284.a50641f549904dea2473c383.0203fda6a9d5727a25246fe880b151702a064f08fbdfc37983d81b3183462be6",
    "captcha":""
  }
  isCivicrmApi: 1
}
```

## Known use cases / rationale:

This extension was created specfiically to provided a way to instruct the WordPress
plugin "Anti-Spam by CleanTalk" to avoid anti-spam processing on CiviCRM form submissions
(e.g. contributions and event registrations). It's something like this:

- I have a client who wants CleanTalk protection on its non-CiviCRM forms; but
  does NOT want it on CiviCRM forms.
  - They've determined that the CleanTalk service tends to be overly restrictive
    in its anti-spam protections on CiviCRM forms.
  - As a result, they've experienced complaints from some constituents whom they
    value highly.
  - Because of this, the client has decided they are content with the anti-spam
    protection provided by CiviCRM's "Form Protection" extension.
  - However, they still want CleanTalk protection on certain other (non-CiviCRM)
    forms on their WordPress site.
- Thus, they need CleanTalk, but want it to ignore all CiviCRM forms.
- Without this extension, it's hard to make CleanTalk skip all CiviCRM form submissions.
  - CleanTalk provides various mechanisms for identifying which form submissions
    it should ignore.
  - However, those features don't play so nicely with CiviCRM AJAX API calls because:
    - There's no setting for ignoring submissions based on POST url.
    - There are settings for ignoring submissions based on POST data field names,
      but CiviCRM AJAX API calls only have one data field, `params`; that's a
      rather generic name, and skipping CleanTalk checking on an POST containing
      a key of `params` seems naive.
    - If CiviCRM AJAX API calls could have at least one explicitly identifiable
      data field name, we could use this to instruct CleanTalk to skip its checks
      on those calls.
- This extension aims to solve that, by adding one explicitly identifiable data
  field name, `isCivicrmApi`, to CiviCRM AJAX API call POST data.

## Configuration
No configuration is required; no configuration options are available.

## Installation
* Copy this package to your CiviCRM extensions directory (in WordPress, that's typically `[document-root]/wp-content/uploads/civicrm/ext`
* In CiviCRM, enable the extension "AJAX API Identifier".

## Support

Support for this plugin is handled under Joinery's ["As-Is Support" policy](https://joineryhq.com/software-support-levels#as-is-support).

Public issue queue for this plugin: https://github.com/JoineryHQ/com.joineryhq.ajaxid/issues