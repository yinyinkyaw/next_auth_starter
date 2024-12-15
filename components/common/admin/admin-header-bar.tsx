interface AdminHeaderBarProps {
  title: string;
  AppMenu?: React.ComponentType;
}

export default function AdminHeaderBar({
  title,
  AppMenu,
}: AdminHeaderBarProps) {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-medium mb-4 font-kanit">{title}</h2>
      {AppMenu && <AppMenu />}
    </div>
  );
}
