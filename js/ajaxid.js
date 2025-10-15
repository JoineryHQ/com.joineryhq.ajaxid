(function($, ts) {
  var ajaxId = {
    /**
     * For a give jqHR, if it's a call to civicrm ajax api, mark it as such by
     * appending an entry `isCivicrmApi: 1` to the data object.
     */
    markCivicrmApiRequest: function markCivicrmApiRequest(jqXHR, settings) {
      if (ajaxId.urlIsCivicrmApi(settings.url)) {
        searchParams = new URLSearchParams(settings.data); 
        searchParams.set('isCivicrmApi', 1);
        settings.data = searchParams.toString();
      }
    },
    /**
     * Detect whether a given URL is a call to CiviCRM ajax api on this site.
     */
    urlIsCivicrmApi: function urlIsCivicrmApi(url) {
      // Generate a base url which will match ajax api3 or api4:
      var baseApiUrl = CRM.url('civicrm/ajax/api').replace(/\/$/, '');
      if (url.startsWith(baseApiUrl)) {
        return true;
      }
      else {
        return false;
      }
    }
  };
  $.ajaxSetup({
    beforeSend: ajaxId.markCivicrmApiRequest
  });
}(CRM.$, CRM.ts('com.joineryhq.ajaxid')));  

