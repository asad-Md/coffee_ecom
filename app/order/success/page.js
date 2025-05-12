"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Loading component for the Suspense boundary
const OrderSuccessLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"></div>
  </div>
);

// Inner component that uses useSearchParams
function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [countdown, setCountdown] = useState(5);
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // Handle authentication check
    if (status === "unauthenticated") {
      router.push('/auth/signin');
      return;
    }
    
    // Handle missing orderId
    if (!orderId && status !== "loading") {
      router.push('/cart');
      return;
    }

    // Only set up countdown if we have an orderId and we're authenticated
    if (orderId && status === "authenticated") {
      let isActive = true;
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1 && isActive) {
            clearInterval(timer);
            isActive = false;
            setTimeout(() => router.push('/catalogue'), 100);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        isActive = false;
        clearInterval(timer);
      };
    }
  }, [router, orderId, status]);

  if (status === "loading") {
    return <OrderSuccessLoading />;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto bg-foreground rounded-2xl p-8 text-center shadow-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-primary mb-4">Order Placed Successfully!</h1>
        <p className="text-primary opacity-80 mb-6">
          Thank you for your order. Your order ID is: <span className="font-medium">{orderId}</span>
        </p>
        <p className="text-primary opacity-80 mb-8">
          We'll send you an email with your order details shortly.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link href="/catalogue">
            <button className="w-full px-4 py-2 bg-accent text-primary rounded-full hover:opacity-90 transition-all">
              Continue Shopping
            </button>
          </Link>
          <p className="text-sm text-primary opacity-60">
            Redirecting to catalogue in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

// Main component that provides the Suspense boundary
export default function OrderSuccess() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
