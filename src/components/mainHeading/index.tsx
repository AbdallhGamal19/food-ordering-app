const MainHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <span className="uppercase text-accent font-semibold leading-4">
        {subtitle}
      </span>
      <h2 className="text-primary font-bold text-4xl italic">{title}</h2>
    </>
  );
};

export default MainHeading;
