// components/services/data/services.ts

export type Service = {
  id: string;        // stable identifier; used as React key and for openId
  index: string;     // display label, e.g. "[01]"
  titleKey: string;  // i18n key for the title
  descKey: string;   // i18n key for the one-line description
  bulletKeys: string[]; // i18n keys for the bullet rows
};

export const services: Service[] = [
  {
    id: "accounting",
    index: "[01]",
    titleKey: "services.accounting.title",
    descKey: "services.accounting.description",
    bulletKeys: [
      "services.accounting.bullet_1",
      "services.accounting.bullet_2",
      "services.accounting.bullet_3",
      "services.accounting.bullet_4",
    ],
  },
  {
    id: "tax",
    index: "[02]",
    titleKey: "services.tax.title",
    descKey: "services.tax.description",
    bulletKeys: [
      "services.tax.bullet_1",
      "services.tax.bullet_2",
      "services.tax.bullet_3",
      "services.tax.bullet_4",
    ],
  },
  {
    id: "financial",
    index: "[03]",
    titleKey: "services.financial.title",
    descKey: "services.financial.description",
    bulletKeys: [
      "services.financial.bullet_1",
      "services.financial.bullet_2",
    ],
  },
  {
    id: "training",
    index: "[04]",
    titleKey: "services.training.title",
    descKey: "services.training.description",
    bulletKeys: [
      "services.training.bullet_1",
      "services.training.bullet_2",
    ],
  },
  {
    id: "business",
    index: "[05]",
    titleKey: "services.business.title",
    descKey: "services.business.description",
    bulletKeys: [
      "services.business.bullet_1",
      "services.business.bullet_2",
      "services.business.bullet_3",
    ],
  },
  {
    id: "ma",
    index: "[06]",
    titleKey: "services.ma.title",
    descKey: "services.ma.description",
    bulletKeys: [
      "services.ma.bullet_1",
      "services.ma.bullet_2",
      "services.ma.bullet_3",
    ],
  },
  {
    id: "transfer",
    index: "[07]",
    titleKey: "services.transfer.title",
    descKey: "services.transfer.description",
    bulletKeys: [
      "services.transfer.bullet_1",
      "services.transfer.bullet_2",
      "services.transfer.bullet_3",
    ],
  },
];

export const defaultOpenServiceId = "accounting";
