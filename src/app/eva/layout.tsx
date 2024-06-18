import { Toaster } from "@/components/ui/sonner";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}
