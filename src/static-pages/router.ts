// Raw imports for all 26 static pages
import indexHtml from "./index.html?raw";
import servicesHtml from "./services.html?raw";
import productsHtml from "./products.html?raw";
import caseStudiesHtml from "./case-studies.html?raw";
import industriesHtml from "./industries.html?raw";
import technologyHtml from "./technology.html?raw";
import researchHtml from "./research.html?raw";
import reviewsHtml from "./reviews.html?raw";
import founderHtml from "./founder.html?raw";
import aboutHtml from "./about.html?raw";
import contactHtml from "./contact.html?raw";
import investorsHtml from "./investors.html?raw";
import notFoundHtml from "./404.html?raw";

// Products
import productsSapHtml from "./products/sap.html?raw";
import productsDevHtml from "./products/dev.html?raw";
import productsAeroHtml from "./products/aero.html?raw";
import productsCopilotHtml from "./products/copilot.html?raw";

// Research
import researchMambaHtml from "./research/mamba.html?raw";
import researchSynapseFabricHtml from "./research/synapsefabric.html?raw";
import researchNuclearXHtml from "./research/nuclear-x.html?raw";
import researchQuantumVerifierHtml from "./research/quantumverifier.html?raw";
import researchAdreHtml from "./research/adre.html?raw";
import researchEmotionEngineHtml from "./research/emotionengine.html?raw";
import researchMultiCriticHtml from "./research/multicritic.html?raw";
import researchQuantixHtml from "./research/quantix.html?raw";
import researchThirdEyeHtml from "./research/thirdeye.html?raw";

const pageMap: Record<string, string> = {
  "/": indexHtml,
  "/services": servicesHtml,
  "/products": productsHtml,
  "/case-studies": caseStudiesHtml,
  "/industries": industriesHtml,
  "/technology": technologyHtml,
  "/research": researchHtml,
  "/reviews": reviewsHtml,
  "/founder": founderHtml,
  "/about": aboutHtml,
  "/contact": contactHtml,
  "/investors": investorsHtml,

  // Products
  "/products/sap": productsSapHtml,
  "/products/dev": productsDevHtml,
  "/products/aero": productsAeroHtml,
  "/products/copilot": productsCopilotHtml,

  // Research
  "/research/mamba": researchMambaHtml,
  "/research/synapsefabric": researchSynapseFabricHtml,
  "/research/nuclear-x": researchNuclearXHtml,
  "/research/quantumverifier": researchQuantumVerifierHtml,
  "/research/adre": researchAdreHtml,
  "/research/emotionengine": researchEmotionEngineHtml,
  "/research/multicritic": researchMultiCriticHtml,
  "/research/quantix": researchQuantixHtml,
  "/research/thirdeye": researchThirdEyeHtml,
};

export function getStaticPage(pathname: string): string | undefined {
  const normalized = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
  return pageMap[normalized] || pageMap[normalized.toLowerCase()];
}

export { notFoundHtml };
