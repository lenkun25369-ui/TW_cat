
/**
 * SMART on FHIR vendor profiles
 * 之後跟不同廠商銜接時，主要改這裡。
 */
window.SMART_CONFIGS = {
  vendorA: {
    name: "Vendor A Sandbox",
    clientId: "REPLACE_WITH_VENDOR_A_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/*.read",
    defaultIss: "https://vendor-a.example.com/fhir",
    defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  },

  vendorB: {
    name: "Vendor B Sandbox",
    clientId: "REPLACE_WITH_VENDOR_B_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/Patient.read patient/Observation.read",
    defaultIss: "https://vendor-b.example.com/fhir/r4",
    defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  },
  vendorC: {
    name: "Vendor C Sandbox",
    clientId: "REPLACE_WITH_VENDOR_B_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",

    // EHR Launch 常用 scope
    scope: "launch launch/patient openid fhirUser patient/*.read",

    // 若 launch URL 沒有帶 iss，可用 defaultIss 補上；正式 EHR launch 通常由對方帶入 iss
    defaultIss: "",

    // 預設讀取模式
    defaultMode: "patient-observations",

    // 可選：固定讀某個 resource，demo 或測試用
    fixedResourceUrl: "",

    // 下游模型或 Shiny app
    downstreamUrl: "https://flu-prediction-v2-2-ui-enhance.onrender.com/"
  }
  
};

window.getSmartConfig = function () {
  const params = new URLSearchParams(window.location.search);
  const vendor = params.get("vendor") || "mohw";
  const config = window.SMART_CONFIGS[vendor];

  if (!config) {
    throw new Error("Unknown vendor profile: " + vendor);
  }

  return { vendor, ...config };
};

