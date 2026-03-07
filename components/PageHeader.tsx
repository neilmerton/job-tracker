export type PageHeaderProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
};

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__subtitle">{subtitle}</p>
      {children}
    </header>
  );
}
