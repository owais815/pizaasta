import Image from "next/image";

const items = [
  {
    image: "/images/serve-pizza.jpg",
    alt: "Pizaasta pizza",
    title: "Pizza",
    text: "Wood-fired perfection topped with mozzarella, herbs and a burst of flavor in every slice.",
  },
  {
    image: "/images/serve-spin-roll.jpg",
    alt: "Pizaasta spin roll",
    title: "Spin Roll",
    text: "A delicate roll stuffed with juicy chicken, cheese and fresh veggies — ready to roll into deliciousness.",
  },
  {
    image: "/images/serve-pasta.jpg",
    alt: "Pizaasta pasta",
    title: "Pasta",
    text: "Creamy sauce with tender chicken and vegetables, served with your choice of sides.",
  },
  {
    image: "/images/serve-loaded-fries.jpg",
    alt: "Pizaasta loaded fries",
    title: "Loaded Fries",
    text: "Crispy fries piled high with melted cheese, grilled chicken and a drizzle of house sauce.",
  },
];

export default function Serve() {
  return (
    <section className="section" id="serve">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">What we serve</span>
          <h2>Crafted for true pizza lovers</h2>
          <p>
            Everything at Pizaasta is made fresh to order — from the dough to the dip.
            Here&apos;s what keeps regulars coming back.
          </p>
        </div>

        <div className="serve-grid">
          {items.map((item) => (
            <div className="serve-card" key={item.title}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 980px) 100vw, 25vw"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="serve-text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
