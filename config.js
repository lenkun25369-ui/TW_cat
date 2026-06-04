/**
 * SMART on FHIR vendor profiles
 * 之後跟不同廠商銜接時，主要修改這裡。
 *
 * 需要跟廠商確認：
 * 1. clientId:
 *    由廠商 Authorization Server 提供，必須與廠商註冊資料一致。
 *
 * 2. redirectUri:
 *    提供給廠商註冊的 callback URL。
 *    目前固定使用：
 *    https://lenkun25369-ui.github.io/TW_cat/index.html
 *
 * 3. scope:
 *    依據 APP 需要讀取的 FHIR resource 調整，
 *    例如 Patient、Observation、Encounter 等。
 *
 * 4. defaultIss:
 *    若廠商 EHR Launch 會自動帶入 iss，這裡可留空。
 *    若要手動測試，可填入廠商 FHIR Server base URL。
 */
window.SMART_CONFIGS = {
  vendorA: {
    name: "Vendor A Sandbox",
    clientId: "REPLACE_WITH_VENDOR_A_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/*.read",
    defaultIss: "",
    defaultMode: "fixed-resource",//defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  },

  vendorB: {
    name: "Vendor B Sandbox",
    clientId: "REPLACE_WITH_VENDOR_B_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/Patient.read patient/Observation.read",
    defaultIss: "",
    defaultMode: "fixed-resource",//defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  },

  vendorC: {
    name: "Vendor C Sandbox",
    clientId: "REPLACE_WITH_VENDOR_C_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/*.read",
    defaultIss: "",
    defaultMode: "fixed-resource",//defaultMode: "patient-observations",
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
