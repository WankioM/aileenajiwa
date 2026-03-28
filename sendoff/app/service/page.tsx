import Navbar from '@/components/Navbar';
import OrderOfService from '@/components/OrderOfService';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Schedule — Celebrating Aileen Owango',
  description: 'Fundraising, vigil, and thanksgiving service schedule for Aileen Owango\'s send-off.',
};

export default function ServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <OrderOfService />
      </main>
      <Footer />
    </>
  );
}