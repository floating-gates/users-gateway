import platform_logic_pic from "../assets/images/platform_logic_pic.webp";

export const articles = [
  {
    id: 1,
    title: "Open Source Material Databases",
    excerpt: "Why accessible material data is critical for engineering, and how open-source initiatives can reduce barriers caused by fragmented standards.",
    content: `
      Engineers across disciplines—from mechanical to civil to aerospace—rely heavily on accurate material properties 
      such as density, Young’s modulus, thermal conductivity, and fatigue strength. While large corporations often 
      pay for access to proprietary databases, smaller companies, researchers, and students are left navigating a 
      jungle of different standards, proprietary normatives, and closed sources. 

      Open source material databases aim to solve this. By providing free and openly licensed collections of commonly 
      used materials and their key properties, these initiatives lower the entry barrier to reliable engineering 
      design. Instead of spending hours searching through PDF standards or outdated handbooks, engineers can access 
      consistent, structured, and machine-readable data. 

      Such databases do not aim to replace specialized or certified sources where strict compliance is required, 
      but they provide a practical foundation for prototyping, simulation, and early-stage design. For example, 
      datasets for common steels, aluminum alloys, polymers, and composites can be enough for feasibility studies 
      or teaching purposes.

      The main challenge remains ensuring quality and traceability: open data should include references to the 
      original normative documents and highlight whether a value is typical, guaranteed, or standardized. 
      Collaboration is key—engineers, researchers, and institutions can all contribute to growing a shared resource.

      In summary, open source material databases are not about competing with high-end proprietary systems, 
      but about democratizing access to basic, reliable engineering data for everyone.
    `,
    image: "https://github.com/floating-gates/open-material-db/raw/main/src/header.svg",
    author: "Mattia Samiolo"
  },
  {
    id: 2,
    title: "The Rise of Technology Proxying",
    excerpt: "How proxying technology to small and medium enterprises unlocks digital growth.",
    content: "One of the most promising discoveries in our business model journey has been the strength of B2B2C: enabling technology providers to reach SMEs by acting as a proxy. Many small and medium enterprises lack the resources to adopt advanced digital solutions directly, but through a B2B2C channel, technology can be packaged, simplified, and delivered efficiently. This is the right moment to push digitalization across industries: SMEs are under pressure to modernize, supply chains are being reshaped, and accessible digital tools are becoming a decisive competitive advantage. By bridging the gap between innovation and everyday business, the B2B2C model empowers SMEs to thrive in the digital era.",
      image: platform_logic_pic,
    author: "Mattia Samiolo"
  }
];
