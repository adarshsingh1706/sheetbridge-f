'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthProvider' // ✅ Import AuthProvider
import { toast } from 'sonner'

export default function AuthForm({ isLogin = true }) {
  const { login } = useAuth() // ✅ Use login function from AuthProvider
  const form = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`/api/auth/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      
      if (!res.ok) throw new Error(await res.text())

      if (isLogin) {
        toast.success('Login successful')
        await login() // ✅ Call login function to update auth state
      } else {
        toast.success('Account created')
        window.location.href = "/login" // ✅ Redirect after signup
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  )
}
