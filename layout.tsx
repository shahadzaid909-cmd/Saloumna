import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سلومنا - استكشف التراث السعودي',
  description: 'منصة ويب تعليمية تفاعلية لتشجيع الأطفال على استكشاف التراث السعودي بطريقة ممتعة.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `body { font-family: 'Tajawal', sans-serif !important; }`}} />
      </head>
      <body>
        <main className="min-h-screen max-w-lg mx-auto bg-white shadow-xl overflow-hidden relative">
          {children}
        </main>
      </body>
    </html>
  );
}
