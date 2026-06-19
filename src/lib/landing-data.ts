export const LANDING_SETTINGS = {
  company_name: "FlowLedger",
  contact_email: "hello@flowledger.app",
  contact_phone: "+880 1XXX-XXXXXX",
  enable_registration: true,
  config_sections: {
    section_order: [
      "header",
      "hero",
      "stats",
      "features",
      "modules",
      "benefits",
      "cta",
      "footer",
    ],
    sections: {
      header: {
        navigation_items: [
          { text: "Features", href: "#features" },
          { text: "Modules", href: "#modules" },
          { text: "Benefits", href: "#benefits" },
        ],
        enable_pricing_link: true,
      },
      hero: {
        title: "One platform for finance, sales, and daily operations",
        subtitle:
          "Invoices, purchases, inventory, CRM, HR, and projects — connected in a single workspace your team can actually use every day.",
        primary_button_text: "Start free trial",
        secondary_button_text: "Sign in",
      },
      stats: {
        stats: [
          { label: "Active workspaces", value: "20,000+" },
          { label: "Platform uptime", value: "99.9%" },
          { label: "Support coverage", value: "24/7" },
          { label: "Countries served", value: "70+" },
        ],
      },
      features: {
        title: "Built for operators, not just accountants",
        subtitle:
          "Six core modules that cover how modern teams sell, buy, pay, and grow.",
        features: [
          {
            title: "ERP Management",
            description: "Centralize operations with unified records and workflows.",
            icon: "Building2",
          },
          {
            title: "Accounting",
            description: "Track revenue, expenses, and balances with clarity.",
            icon: "Calculator",
          },
          {
            title: "CRM System",
            description: "Follow leads and customers through every stage.",
            icon: "Users",
          },
          {
            title: "POS System",
            description: "Handle counter sales and receipts without friction.",
            icon: "CreditCard",
          },
          {
            title: "HRM",
            description: "Manage staff, attendance, and payroll in one place.",
            icon: "UserCheck",
          },
          {
            title: "Projects",
            description: "Plan tasks, deadlines, and delivery with visibility.",
            icon: "FolderOpen",
          },
        ],
      },
      modules: {
        title: "Modules that work together",
        subtitle:
          "Switch between business areas without losing context or duplicate data entry.",
        modules: [
          {
            key: "sales",
            label: "Sales & Accounting",
            title: "Billing and books in sync",
            description:
              "Create invoices, record payments, and keep financial reports aligned with daily sales activity.",
          },
          {
            key: "crm",
            label: "CRM System",
            title: "Pipeline you can trust",
            description:
              "Capture leads, assign owners, and move deals forward with a shared customer timeline.",
          },
          {
            key: "hrm",
            label: "Human Resources",
            title: "People ops without spreadsheets",
            description:
              "Onboard employees, track attendance, and run payroll with structured HR workflows.",
          },
        ],
      },
      benefits: {
        title: "Why teams pick FlowLedger",
        benefits: [
          {
            title: "Unified business ecosystem",
            description:
              "Finance, sales, HR, and projects share the same data model — fewer exports and fewer mistakes.",
          },
          {
            title: "Financial precision",
            description:
              "Automate recurring billing, reconcile transactions, and audit changes with confidence.",
          },
          {
            title: "Sales & CRM momentum",
            description:
              "Connect quotes, orders, and customer history so your team closes faster.",
          },
          {
            title: "Reporting that drives action",
            description:
              "Dashboards and exports help managers spot trends before they become problems.",
          },
        ],
      },
      cta: {
        title: "Ready to simplify your back office?",
        subtitle:
          "Create a workspace in minutes. Invite your team when you are ready to scale.",
        primary_button: "Start free trial",
        secondary_button: "Sign in",
      },
      footer: {
        description:
          "A practical ERP workspace for finance-led teams who need speed and control.",
        newsletter_title: "Product updates",
        newsletter_description:
          "Occasional release notes and tips — no spam.",
        newsletter_button_text: "Subscribe",
        navigation_sections: [
          {
            title: "Product",
            links: [
              { text: "Features", href: "#features" },
              { text: "Modules", href: "#modules" },
              { text: "Pricing", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { text: "About", href: "#" },
              { text: "Contact", href: "#" },
              { text: "Support", href: "#" },
            ],
          },
        ],
      },
    },
  },
};
