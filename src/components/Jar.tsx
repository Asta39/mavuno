import Image from "next/image";

type Props = { color: string; label: string; size?: string; image?: string; alt?: string };

/** Shows the product render when one exists, otherwise a CSS-drawn jar. */
export default function Jar({ color, label, size, image, alt }: Props) {
  if (image) return <Image className="jar-img" src={image} alt={alt ?? label} width={590} height={900} sizes="(max-width: 860px) 40vw, 200px" />;
  return (
    <div className="jar" style={{ ["--c" as string]: color }}>
      <b>
        {label}
        {size && <small>{size}</small>}
      </b>
    </div>
  );
}
