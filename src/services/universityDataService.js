/**
 * University Data Service - API Abstraction Layer
 * 
 * Architecture Principle:
 * This service encapsulates university & course discovery logic.
 * It strictly distinguishes between:
 * 1. Counsellor Recommended Data (Level 1: Curated 1-on-1 recommendations)
 * 2. Official External Discovery Resources (Level 2: Links to authoritative university portals)
 * 3. Future External API Provider Hooks (e.g. Government Datasets, UCAS API, CollegeBoard API)
 */

export const EXTERNAL_DISCOVERY_RESOURCES = [
  {
    id: "ext_1",
    name: "Common App College Search",
    region: "United States",
    description: "Search 1,000+ member colleges & universities in the US and international institutions.",
    category: "Official Application Portal",
    url: "https://www.commonapp.org/explore/",
    badgeText: "US Official",
    trustedBy: "Over 1,000 Universities"
  },
  {
    id: "ext_2",
    name: "UCAS Course Search",
    region: "United Kingdom",
    description: "The official UK central admissions service database for all UK undergraduate and postgraduate courses.",
    category: "Official Government & Central Portal",
    url: "https://www.ucas.com/explore",
    badgeText: "UK Official",
    trustedBy: "All UK Universities & Colleges"
  },
  {
    id: "ext_3",
    name: "Study in Australia Official Portal",
    region: "Australia",
    description: "Australian Government official site for international students searching courses, CRICOS registration & tuition.",
    category: "Government Database",
    url: "https://www.studyinaustralia.gov.au/",
    badgeText: "Govt. Verified",
    trustedBy: "Australian Department of Education"
  },
  {
    id: "ext_4",
    name: "EduCanada Official Database",
    region: "Canada",
    description: "Government of Canada portal for searching Canadian universities, colleges, tuition fees, and scholarship options.",
    category: "Government Database",
    url: "https://www.educanada.ca/",
    badgeText: "Govt. Verified",
    trustedBy: "Government of Canada"
  },
  {
    id: "ext_5",
    name: "DAAD Germany Course Finder",
    region: "Germany & Europe",
    description: "Official database of international Degree Programs in Germany taught in English.",
    category: "Official German Academic Exchange",
    url: "https://www.daad.de/en/study-and-research-in-germany/courses-of-study-in-germany/",
    badgeText: "DAAD Official",
    trustedBy: "German Academic Exchange Service"
  },
  {
    id: "ext_6",
    name: "CUET Samarth Portal (India)",
    region: "India",
    description: "Official NTA portal for Common University Entrance Test participating central & private universities.",
    category: "Official Indian Portal",
    url: "https://cuet.samarth.ac.in/",
    badgeText: "India NTA",
    trustedBy: "Ministry of Education India"
  },
  {
    id: "ext_7",
    name: "College Board BigFuture",
    region: "Global / US",
    description: "Comprehensive search tool matching SAT scores, majors, financial aid, and campus settings.",
    category: "Standardized Testing Body",
    url: "https://bigfuture.collegeboard.org/college-search",
    badgeText: "CollegeBoard",
    trustedBy: "Global Standardized Testing Body"
  }
];

export const universityDataService = {
  /**
   * Fetch counsellor recommendations stored in local state/database
   */
  async getCounsellorRecommendations(recommendationsList = []) {
    // Simulates an API call delay
    return recommendationsList.filter(item => item.type === "UNIVERSITY" || item.type === "COURSE");
  },

  /**
   * Fetch verified external discovery resources
   */
  async getExternalDiscoveryResources() {
    return EXTERNAL_DISCOVERY_RESOURCES;
  },

  /**
   * Abstract method ready for future third-party API integration
   * (e.g. `https://api.data.gov/ed/collegescorecard`)
   */
  async searchExternalUniversities(query = "", countryFilter = "ALL") {
    console.log(`[UniversityDataService] Searching external provider: query="${query}", country="${countryFilter}"`);
    // Returns curated external directory links matching search parameters
    let results = EXTERNAL_DISCOVERY_RESOURCES;
    if (countryFilter !== "ALL") {
      results = results.filter(r => r.region.toLowerCase().includes(countryFilter.toLowerCase()));
    }
    if (query) {
      results = results.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase()) || 
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.region.toLowerCase().includes(query.toLowerCase())
      );
    }
    return results;
  }
};
