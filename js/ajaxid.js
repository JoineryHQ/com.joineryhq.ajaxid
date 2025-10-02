(function($, ts) {
  var ajaxId = {
    markCivicrmApiRequest: function markCivicrmApiRequest(jqXHR, settings) {
      console.log('markCivicrmApiRequest ...')
      if (ajaxId.urlIsCivicrmApi(settings.url)) {
        console.log('is api');
        searchParams = new URLSearchParams(settings.data); 
        searchParams.set('isCivicrmApi', 1);
        settings.data = searchParams.toString();
      }
    },
    urlIsCivicrmApi: function urlIsCivicrmApi(url) {
      var baseApiUrl = CRM.url('civicrm/ajax/api');
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

