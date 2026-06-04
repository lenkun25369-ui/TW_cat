/**
 * SMART on FHIR vendor profiles
 * 之後跟不同廠商銜接時，主要改這裡。
clientId
redirectUri
  offer:https://lenkun25369-ui.github.io/TW_cat/index.html
 scope:檢查讀哪些
defaultIss:油一開始寫在網址或是修改
 
 */
window.SMART_CONFIGS = {
  vendorA: {
    name: "Vendor A Sandbox",
    clientId: "REPLACE_WITH_VENDOR_A_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/*.read",
    defaultIss: "",
    defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  },

  vendorB: {
    name: "Vendor B Sandbox",
    clientId: "REPLACE_WITH_VENDOR_B_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/Patient.read patient/Observation.read",
    defaultIss: "",
    defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  },

  vendorC: {
    name: "Vendor C Sandbox",
    clientId: "REPLACE_WITH_VENDOR_C_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/*.read",
    defaultIss: "",
    defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  }
};

window.getSmartConfig = function () {
  const params = new URLSearchParams(window.location.search);
  const vendor = params.get("vendor") || "vendorC";
  const config = window.SMART_CONFIGS[vendor];

  if (!config) {
    throw new Error("Unknown vendor profile: " + vendor);
  }

  return { vendor, ...config };
};
