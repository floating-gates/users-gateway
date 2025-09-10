import platform_logic_pic from "../assets/images/platform_logic_pic.webp";
import { breaking_silence } from "./article_stories/03_breaking_silence.js"
import { open_database }  from "./article_solutions/01_open_database.js"

export const articles = [
    open_database,
    {
        id: 2,
        title: "The Rise of Technology Proxying",
        excerpt: "How proxying technology to small and medium enterprises unlocks   growth.",
        content: "",
        content:[ {
            sub_title: "",
            sub_content:" One of the most promising discoveries in our journey has been realizing how much companies cares about how they are perceived. Hence we sat down and though how we can enable technologically the manufacturing plants in the most outraching way possible, give birth the idea of simply proxying the technology: almost like a remote API, but we decided it was not enougth. Many small and medium enterprises lack the resources to adopt advanced digital solutions directly like API even tough they look simple from a technolgical standoint however, technology can be packaged, simplified, and delivered efficiently using a different distribution mehthods, for us was to deliver a manufacturing hub done and well refined for our manufacturing custiomer. Digitalization like retentred Hubs modernize supply chains and are proofed to have reshaped the relations between cusomter base and providers becoming a decisive competitive advantage. By bridging the gap between innovation and everyday business, a 'B2B2C' model empowers SMEs to thrive in the digital era."}],
        image: platform_logic_pic,
        author: "Mattia Samiolo"
    },
    breaking_silence
    
];
