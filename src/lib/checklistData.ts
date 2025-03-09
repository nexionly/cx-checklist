export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ChecklistItem {
  id: string;
  title: string;
  priority: Priority;
  action: string;
  reason: string;
  insight: string;
  completed: boolean;
}

export interface Category {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  title: string;
  categories: Category[];
}

export const initialChecklist: Checklist = {
  title: "Foundational Customer Experience Check-List",
  categories: [
    {
      id: "onboarding",
      title: "Onboarding",
      items: [
        {
          id: "onboarding-1",
          title: "Define Onboarding Vision & Objectives",
          priority: "HIGH",
          action: "Articulate the vision for the onboarding experience. What is the desired outcome of onboarding? (e.g., rapid time-to-value, high feature adoption, reduced early churn). Define specific, measurable objectives.",
          reason: "Sets the direction for the onboarding team and ensures alignment with overall CX and business goals.",
          insight: "Focus on speed and effectiveness. Early positive experiences are crucial for long-term retention. Aim for \"aha!\" moments early in the onboarding process.",
          completed: false
        },
        {
          id: "onboarding-2",
          title: "Map the Onboarding Journey",
          priority: "HIGH",
          action: "Detail every step a new customer takes during onboarding, from initial signup to achieving key milestones. Identify potential friction points.",
          reason: "Visualizing the journey allows for optimization and proactive problem-solving.",
          insight: "Differentiate onboarding journeys based on customer segments and product complexity. Consider self-service, guided, and high-touch onboarding models.",
          completed: false
        },
        {
          id: "onboarding-3",
          title: "Define Onboarding Roles & Responsibilities",
          priority: "HIGH",
          action: "Clearly define roles within the onboarding team (e.g., Onboarding Specialist, Onboarding Manager) and their responsibilities.",
          reason: "Ensures clear accountability and efficient onboarding processes.",
          insight: "Onboarding roles often require a blend of technical product knowledge, training skills, and customer empathy.",
          completed: false
        },
        {
          id: "onboarding-4",
          title: "Develop Onboarding Processes & Content",
          priority: "HIGH",
          action: "Create standardized onboarding processes, including welcome materials, tutorials, training sessions (live and recorded), knowledge base articles, and proactive check-ins.",
          reason: "Consistency and quality in onboarding materials lead to better customer understanding and faster adoption.",
          insight: "Content should be concise, engaging, and tailored to different learning styles. Use a variety of formats (video, text, interactive guides). Iterate based on customer feedback and performance data.",
          completed: false
        },
        {
          id: "onboarding-5",
          title: "Choose Onboarding Tools & Technology",
          priority: "MEDIUM",
          action: "Select tools to support onboarding, such as onboarding platforms, CRM integrations, communication tools (email automation, in-app messaging), and analytics dashboards.",
          reason: "Technology can automate and scale onboarding, track progress, and personalize experiences.",
          insight: "Choose tools that integrate seamlessly with your existing tech stack. Focus on tools that enable personalized and proactive onboarding.",
          completed: false
        },
        {
          id: "onboarding-6",
          title: "Onboarding Metrics & KPIs",
          priority: "HIGH",
          action: "Define specific metrics to measure onboarding success (e.g., Time-to-Value, Feature Adoption Rate, Customer Activation Rate, Early Churn Rate, Onboarding CSAT).",
          reason: "Metrics provide data-driven insights into onboarding effectiveness and areas for improvement.",
          insight: "Track leading indicators (e.g., completion rates of onboarding steps) and lagging indicators (e.g., churn rate post-onboarding).",
          completed: false
        }
      ]
    },
    {
      id: "csm",
      title: "Customer Success Management",
      items: [
        {
          id: "csm-1",
          title: "Define CSM Vision & Customer Success Strategy",
          priority: "HIGH",
          action: "Articulate the vision for CSM. What does customer success mean for your company? (e.g., maximizing customer value, driving renewals and upsells, building advocacy). Define a proactive CSM strategy.",
          reason: "Sets the strategic direction for CSM and ensures alignment with business objectives (retention, growth).",
          insight: "Customer Success is not just about reactive support; it's about proactively guiding customers to achieve their desired outcomes using your product/service. Focus on building long-term relationships.",
          completed: false
        },
        {
          id: "csm-2",
          title: "Define CSM Customer Segmentation & Engagement Model",
          priority: "HIGH",
          action: "Segment your customer base (e.g., by size, industry, product usage, lifecycle stage). Determine the appropriate engagement model for each segment (e.g., high-touch, low-touch, tech-touch).",
          reason: "Ensures CSM resources are allocated effectively and customers receive the right level of support based on their needs and value.",
          insight: "Develop a tiered CSM model. Focus high-touch CSM on your most valuable customers. Leverage tech-touch and community for broader customer engagement.",
          completed: false
        },
        {
          id: "csm-3",
          title: "Define CSM Roles & Responsibilities",
          priority: "HIGH",
          action: "Clearly define CSM roles (e.g., Customer Success Manager, CSM Team Lead, Onboarding CSM) and their responsibilities, including proactive outreach, health checks, value realization, and expansion opportunities.",
          reason: "Ensures clear accountability and effective customer engagement.",
          insight: "CSM roles require a blend of relationship-building skills, product knowledge, business acumen, and project management skills.",
          completed: false
        },
        {
          id: "csm-4",
          title: "Develop CSM Processes & Playbooks",
          priority: "HIGH",
          action: "Create standardized CSM processes and playbooks for key activities like onboarding handoffs, regular health checks, QBRs (Quarterly Business Reviews), renewal management, and escalation handling.",
          reason: "Ensures consistent and proactive customer engagement and maximizes customer lifetime value.",
          insight: "Playbooks should be living documents, continuously refined based on CSM experience and customer outcomes. Focus on proactive engagement and value demonstration.",
          completed: false
        },
        {
          id: "csm-5",
          title: "Choose CSM Tools & Technology",
          priority: "MEDIUM",
          action: "Select tools to support CSM activities, such as CRM, Customer Success platforms, health scoring tools, communication platforms, and analytics dashboards.",
          reason: "Technology helps CSMs manage customer relationships at scale, track customer health, and automate tasks.",
          insight: "Choose a CSM platform that integrates with your CRM and other systems. Focus on tools that provide a 360-degree view of the customer and enable proactive engagement.",
          completed: false
        },
        {
          id: "csm-6",
          title: "CSM Metrics & KPIs",
          priority: "HIGH",
          action: "Define key metrics to measure CSM success (e.g., Customer Retention Rate, Renewal Rate, Net Revenue Retention (NRR), Customer Lifetime Value (CLTV), Customer Health Score, Expansion Revenue, Customer Advocacy).",
          reason: "Metrics demonstrate the impact of CSM on business outcomes and guide CSM strategy.",
          insight: "Focus on outcome-based metrics (NRR, CLTV) that demonstrate the long-term value of CSM. Track leading indicators of churn and expansion (customer health score, product usage).",
          completed: false
        }
      ]
    },
    {
      id: "support",
      title: "Customer Support",
      items: [
        {
          id: "support-1",
          title: "Define Support Vision & Service Standards",
          priority: "HIGH",
          action: "Articulate the vision for customer support. What kind of support experience do you want to provide? (e.g., fast, efficient, empathetic, proactive). Define clear service standards and SLAs (Service Level Agreements).",
          reason: "Sets expectations for support interactions and ensures consistent service quality.",
          insight: "Go beyond reactive support. Aim for proactive support by anticipating customer needs and providing helpful resources before they ask.",
          completed: false
        },
        {
          id: "support-2",
          title: "Define Support Channels & Coverage",
          priority: "HIGH",
          action: "Determine which support channels you will offer (e.g., email, phone, chat, social media, self-service). Define operating hours and coverage.",
          reason: "Meeting customers where they are and providing convenient access to support is crucial.",
          insight: "Consider your target audience's channel preferences and the complexity of your product. Start with core channels and expand as needed. Offer omnichannel experiences where customers can seamlessly switch between channels.",
          completed: false
        },
        {
          id: "support-3",
          title: "Define Support Tiers & Escalation Processes",
          priority: "MEDIUM",
          action: "Establish support tiers (e.g., Tier 1, Tier 2, Tier 3) based on complexity and expertise. Define clear escalation paths for complex issues.",
          reason: "Efficiently routes issues to the appropriate support level and ensures timely resolution.",
          insight: "Document clear escalation procedures and ensure smooth handoffs between tiers. Empower Tier 1 to resolve as many issues as possible to improve efficiency.",
          completed: false
        },
        {
          id: "support-4",
          title: "Develop Support Processes & Knowledge Base",
          priority: "HIGH",
          action: "Create standardized support processes for common issues, develop troubleshooting guides, FAQs, and build a comprehensive knowledge base (internal and customer-facing).",
          reason: "Streamlines support operations, enables self-service, and reduces resolution times.",
          insight: "Continuously update the knowledge base based on support tickets and customer feedback. Make it easily searchable and accessible.",
          completed: false
        },
        {
          id: "support-5",
          title: "Choose Support Tools & Technology",
          priority: "HIGH",
          action: "Select support tools such as ticketing systems, live chat software, phone systems (VoIP), knowledge base platforms, remote support tools, and CRM integrations.",
          reason: "Technology is essential for managing support volume, tracking tickets, and providing efficient support.",
          insight: "Choose a ticketing system that allows for automation, reporting, and integration with other systems. Consider AI-powered tools for automation and self-service (chatbots).",
          completed: false
        },
        {
          id: "support-6",
          title: "Support Metrics & KPIs",
          priority: "HIGH",
          action: "Define key metrics to measure support performance (e.g., Customer Satisfaction (CSAT), Customer Effort Score (CES), First Response Time (FRT), Resolution Time, Ticket Volume, Agent Productivity, Cost per Ticket).",
          reason: "Metrics provide insights into support team performance and areas for optimization.",
          insight: "Balance efficiency metrics (FRT, Resolution Time) with quality metrics (CSAT, CES). Focus on reducing customer effort and improving first-contact resolution.",
          completed: false
        }
      ]
    },
    {
      id: "voc",
      title: "Voice of the Customer (VOC) Program",
      items: [
        {
          id: "voc-1",
          title: "Define VOC Strategy & Objectives",
          priority: "HIGH",
          action: "Articulate the purpose of your VOC program. What insights are you seeking? How will you use customer feedback? Define clear objectives.",
          reason: "Provides direction and ensures the VOC program is aligned with business needs.",
          insight: "VOC should be more than just collecting feedback; it's about understanding customer sentiment, identifying trends, and driving action.",
          completed: false
        },
        {
          id: "voc-2",
          title: "Choose VOC Data Collection Methods",
          priority: "HIGH",
          action: "Select a mix of VOC methods (e.g., surveys (NPS, CSAT, CES), customer interviews, focus groups, social listening, feedback forms, review monitoring, support ticket analysis).",
          reason: "A multi-method approach provides a comprehensive view of customer feedback from various sources.",
          insight: "Balance quantitative and qualitative data. Actively solicit feedback proactively, not just reactively.",
          completed: false
        },
        {
          id: "voc-3",
          title: "Implement VOC Data Analysis & Reporting",
          priority: "HIGH",
          action: "Establish processes for analyzing VOC data, identifying key themes and trends, and creating reports that are actionable for different teams.",
          reason: "Raw data is useless without analysis and actionable insights.",
          insight: "Use text analytics and sentiment analysis tools to process large volumes of feedback. Visualize data clearly and tailor reports to specific audiences (product, marketing, support, leadership).",
          completed: false
        },
        {
          id: "voc-4",
          title: "Action Planning & Feedback Loop",
          priority: "HIGH",
          action: "Define a process for translating VOC insights into action plans. Establish a feedback loop to communicate changes made based on customer feedback back to customers and internal teams.",
          reason: "Closing the loop demonstrates that customer feedback is valued and drives continuous improvement.",
          insight: "Prioritize action items based on impact and feasibility. Track the impact of changes made based on VOC feedback.",
          completed: false
        },
        {
          id: "voc-5",
          title: "VOC Tools & Technology",
          priority: "MEDIUM",
          action: "Select tools for VOC data collection, analysis, and reporting (e.g., survey platforms, social listening tools, text analytics software, VOC dashboards).",
          reason: "Technology streamlines VOC processes and provides efficient data management.",
          insight: "Integrate VOC tools with your CRM and other systems for a holistic view of the customer.",
          completed: false
        }
      ]
    },
    {
      id: "analytics",
      title: "CX Analytics & Strategy",
      items: [
        {
          id: "analytics-1",
          title: "Define CX Analytics Strategy & Metrics Framework",
          priority: "HIGH",
          action: "Develop a comprehensive CX analytics strategy that aligns with your overall CX vision and business goals. Define a clear framework for measuring and tracking CX metrics across all touchpoints.",
          reason: "Provides a data-driven foundation for CX improvement and ROI measurement.",
          insight: "Start with a manageable set of core CX metrics and expand as your analytics capabilities mature. Focus on metrics that are actionable and drive business outcomes.",
          completed: false
        },
        {
          id: "analytics-2",
          title: "Implement CX Data Collection & Integration",
          priority: "HIGH",
          action: "Set up systems to collect CX data from various sources (CRM, support tickets, surveys, website analytics, product usage data, etc.). Integrate data into a central repository or dashboard.",
          reason: "A unified data view provides a holistic understanding of the customer experience.",
          insight: "Ensure data quality and accuracy. Implement data governance processes.",
          completed: false
        },
        {
          id: "analytics-3",
8

