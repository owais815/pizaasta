export type MidnightDeal = {
  id: number;
  name: string;
  price: string;
  msg: string;
  heroImage: string;
  heroAlt: string;
  cardImage: string;
  cardAlt: string;
};

function orderMsg(name: string, price: string): string {
  return `PIZZASTA - Website Order\n\nHi,\nI would like to order:\n\nMidnight Deal – ${name} (${price}).\n\nPlease confirm my order.`;
}

export const midnightDeals: MidnightDeal[] = [
  {
    id: 1,
    name: "Family Feast",
    price: "Rs 4199",
    msg: orderMsg("Family Feast", "Rs 4,199"),
    heroImage: "/images/midnight-hero-1.jpg",
    heroAlt: "Midnight Deal — Family Feast: XL Pizza, Special Pasta (Full), Spin Rolls, Honey Wings (Full), 1.5L Drink for Rs 4199",
    cardImage: "/images/midnight-card-1.jpg",
    cardAlt: "Midnight Deal — Family Feast: XL Pizza, Special Pasta (Full), Spin Rolls, Honey Wings (Full), 1.5L Drink for Rs 4199",
  },
  {
    id: 2,
    name: "Party Combo",
    price: "Rs 2099",
    msg: orderMsg("Party Combo", "Rs 2,099"),
    heroImage: "/images/midnight-hero-2.jpg",
    heroAlt: "Midnight Deal — Party Combo: Medium Pizza, Spin Roll, BBQ Wings (Half), 1L Drink for Rs 2099",
    cardImage: "/images/midnight-card-2.jpg",
    cardAlt: "Midnight Deal — Party Combo: Medium Pizza, Spin Roll, BBQ Wings (Half), 1L Drink for Rs 2099",
  },
  {
    id: 3,
    name: "Sharing Feast",
    price: "Rs 1599",
    msg: orderMsg("Sharing Feast", "Rs 1,599"),
    heroImage: "/images/midnight-hero-3.jpg",
    heroAlt: "Midnight Deal — Sharing Feast: Large Pizza (Any), 1.5L Drink for Rs 1599",
    cardImage: "/images/midnight-card-3.jpg",
    cardAlt: "Midnight Deal — Sharing Feast: Large Pizza (Any), 1.5L Drink for Rs 1599",
  },
  {
    id: 4,
    name: "Single Saver",
    price: "Rs 719",
    msg: orderMsg("Single Saver", "Rs 719"),
    heroImage: "/images/midnight-hero-4.jpg",
    heroAlt: "Midnight Deal — Single Saver: Small Classic Pizza, Plain Fries (Half), Regular Drink for Rs 719",
    cardImage: "/images/midnight-card-4.jpg",
    cardAlt: "Midnight Deal — Single Saver: Small Classic Pizza, Plain Fries (Half), Regular Drink for Rs 719",
  },
];
