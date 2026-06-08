/**
 * SMART on FHIR vendor profiles
 * 之後跟不同廠商銜接時，主要修改這裡。
 *
 * 需要跟廠商確認：
 *
 * 1. clientId:
 *    由廠商 Authorization Server 提供，必須與廠商註冊資料一致。
 *
 * 2. redirectUri:
 *    提供給廠商註冊的 callback URL。
 *    目前固定使用：
 *    https://lenkun25369-ui.github.io/TW_cat/index.html
 *
 * 3. scope:
 *    向廠商要求的 SMART on FHIR 權限。
 *    依據 APP 需要讀取的 FHIR resource 調整。
 *    例如：
 *    - patient/Patient.read
 *    - patient/Observation.read
 *
 * 4. defaultIss:
 *    FHIR Server / issuer URL。
 *    若廠商 EHR Launch 會自動帶入 iss，這裡可留空。
 *    若要手動測試，可填入廠商 FHIR Server base URL。
 *
 * 5. defaultMode:
 *    APP 內部資料讀取模式，非 FHIR/SMART 標準欄位。
 *    - "patient-observations":
 *        授權後依目前病人查詢：
 *        Observation?patient={patientId}&_count=10
 *    - "fixed-resource":
 *        直接讀取 fixedResourceUrl 指定的單一 FHIR resource。
 *
 * 6. fixedResourceUrl:
 *    只有 defaultMode = "fixed-resource" 時才需要。
 *    可填入廠商提供的測試 Observation URL。
 *
 * 7. downstreamUrl:
 *    授權與 FHIR 資料讀取完成後，要導向的下游 APP。
 *    目前為 Flu prediction APP。
 */
window.SMART_CONFIGS = {
  vendorA: {
    name: "CGMH / TWCAT SMART on FHIR Server",
    clientId: "cgmh",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch/patient openid fhirUser patient/Patient.read patient/Observation.read",
    defaultIss: "https://twcat-services.dicom.org.tw:10012/fhir",
    defaultMode: "patient-observations",// TW_cat 內部模式：授權後查 Observation?patient={patientId}
    fixedResourceUrl: "",// 若 defaultMode = "fixed-resource"，才需要填單一 Observation URL
    downstreamUrl: "https://flu-for-tw-cat.onrender.com/"
  },

  vendorB: {
    name: "Muen SMART on FHIR Server",
    clientId: "muen",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch/patient openid fhirUser patient/Patient.read patient/Observation.read",
    defaultIss: "http://192.168.2.213:8080",
    defaultMode: "patient-observations",//defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-for-tw-cat.onrender.com/"
  },

  vendorC: {
    name: "Vendor C Sandbox",
    clientId: "REPLACE_WITH_VENDOR_C_CLIENT_ID",
    redirectUri: "https://lenkun25369-ui.github.io/TW_cat/index.html",
    scope: "launch launch/patient openid fhirUser patient/Patient.read patient/Observation.read",
    defaultIss: "",
    defaultMode: "patient-observations",//defaultMode: "patient-observations",
    fixedResourceUrl: "",
    downstreamUrl: "https://flu-for-tw-cat.onrender.com/"
  }
};

window.getSmartConfig = function () {
  const params = new URLSearchParams(window.location.search);

  const vendor =
    params.get("vendor") ||
    sessionStorage.getItem("smart_vendor") ||
    "vendorA";

  const config = window.SMART_CONFIGS[vendor];

  if (!config) {
    throw new Error("Unknown vendor profile: " + vendor);
  }

  return { vendor, ...config };
};
