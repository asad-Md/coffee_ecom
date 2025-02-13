import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function IncreaseButton ({ product }){
  const { data: session, status , update } = useSession();
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
      update();
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
        className="p-2 bg-primary text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
         <>+</>
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

