import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function AddToCartButton ({ product }){
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const addToCart = async () => {
    
    if (status === 'unauthenticated') {
      setShowSignInDialog(true);
      return;
    }

    try {
      
      setLoading(true);
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          price: product.price,
        }),
      });

      
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={addToCart}
        disabled={loading}
        className="absolute top-2 right-2 bg-accent hover:bg-primary text-primary hover:text-accent p-2 rounded-full transition-all duration-300 ease-in-out z-10 flex items-center gap-1"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </>
        )}
      </button>

      <AlertDialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign in required</AlertDialogTitle>
            <AlertDialogDescription>
              Please sign in to add items to your cart
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  signIn();
                  setShowSignInDialog(false);
                }}
              >
                Sign In
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

